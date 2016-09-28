package org.com.chimerdbv31.chimerseq.services;

import com.google.gson.Gson;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import javax.annotation.Resource;
import org.com.chimerdbv31.chimerseq.mapper.ChimerSeqMapper;
import org.com.chimerdbv31.chimerseq.obj.ChimerSeqQueryForm;
import org.com.chimerdbv31.chimerseq.obj.FusionGeneObj;
import org.com.chimerdbv31.chimerseq.obj.GeneObj;
import org.com.chimerdbv31.chimerseq.obj.TranscriptObj;
import org.com.chimerdbv31.chimerseq.vo.ChimerSeqVo;
import org.com.chimerdbv31.chimerseq.vo.GeneInfoVo;
import org.com.chimerdbv31.chimerseq.vo.ChimerSeqDetailVo;
import org.com.chimerdbv31.chimerseq.vo.FusionScanReadVo;
import org.com.chimerdbv31.chimerseq.vo.PfamVo;
import org.com.chimerdbv31.chimerseq.vo.ReadVo;
import org.com.chimerdbv31.chimerseq.vo.SynonymVo;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service(value = "chimerSeqService")
public class ChimerSeqService {	
    @SuppressWarnings("unused")
    private static final Logger logger = LoggerFactory.getLogger(ChimerSeqService.class);

    @Resource(name = "chimerSeqMapper")
    private ChimerSeqMapper chimerSeqMapper;

	/**
	 * ChimerSeq 조회 옵션 기능을 이용하여 
	 * 데이터베이스를 검색하고 이를 반환해주는 메소드 (실제 화면상에는 jQuery datatables로 보여줌)
	 * 결과를 줄때는 화면 테이블의 옵션에 따라 Paging 처리해서 보냄
	 * 
	 * @param param 화면에서 넘어온 조회 옵션을 담고 있는 오브젝트
	 * @return List 검색된 데이터를 담고 있는 리스트
	 * @throws java.lang.Exception
	 */
	public List<ChimerSeqVo> getChimerSeqResult( ChimerSeqQueryForm param ) throws Exception{
		return this.chimerSeqMapper.getChimerSeqResult(param);
	}

	/**
	 * 조회된 데이터를 Paging 처리하기 위해 전체 조회된 데이터의 size를 반환해주는 메소드
	 * 
	 * @param param 조회 옵션 기능을 담고 있는 오브젝트
	 * @return int 전체 조회된 데이터의 Size
	 * @throws java.lang.Exception
	 */
	public int getChimerSeqTotalNumber(ChimerSeqQueryForm param) throws Exception{
		return this.chimerSeqMapper.getChimerSeqTotalNumber(param);
	}

	public FusionGeneObj getGeneInfo( ChimerSeqVo chimerSeqRecord ) throws Exception{
		Gson gson = new Gson();

		String[] genes = new String[]{chimerSeqRecord.getH_gene(), chimerSeqRecord.getT_gene()};
		String[] chromosomes = new String[]{chimerSeqRecord.getH_chr(), chimerSeqRecord.getT_chr()};
		String[] loc = new String[]{ FusionGeneObj._5P_GENE, FusionGeneObj._3P_GENE };

		FusionScanReadVo fusionScanReads = this.chimerSeqMapper.getReads( chimerSeqRecord.getId() );

		List<ReadVo> reads = null;
		if( fusionScanReads != null ) {
			reads = ReadVo.makeReadList(fusionScanReads);
		}

		FusionGeneObj fusionGene = new FusionGeneObj( chimerSeqRecord );
		for( int i=0; i<genes.length; i++ ) {
			// Find gene info by gene symbol
			Map<String, String> paramMap = new HashMap<String, String>();
			paramMap.put("symbol", genes[i]);
			paramMap.put("chr", chromosomes[i].replace("chr", ""));
			GeneInfoVo geneInfoVo = (GeneInfoVo)this.chimerSeqMapper.getGeneInfo( paramMap );

			if( geneInfoVo != null ) {
				GeneObj obj = new GeneObj( geneInfoVo );
				obj.setFusionLocation( loc[i] );

				TranscriptObj to = obj.getCanonicalTranscript();

				// Find Pfam domains by gene information
				obj.setpFamDomainList( this.getPfamDomainInfo( obj ) );

				if( reads != null )	obj.setReads( reads );

				fusionGene.addGene( loc[i], obj );
			}
		}

		return fusionGene;
	}
	
	public List<String> getAutocompleteInfo(String service, String type, String text) {
		Map<String, String> paramMap = new LinkedHashMap<String, String>();
		paramMap.put("service", service);
		paramMap.put("type", type);
		paramMap.put("text", text);
		
		return this.chimerSeqMapper.getAutocompleteInfo(paramMap);
	}
	
	public List<String> getTcgaCancerTypes() {
		return this.chimerSeqMapper.getTcgaCancerTypes();
	}
	
	public ChimerSeqDetailVo getFusionGeneDetailInfo(String id) {
		return this.chimerSeqMapper.getFusionGeneDetailInfo(id);
	}
	
	private List<PfamVo> getPfamDomainInfo(String chromosome, int start, int end) {
		Map<String, Object> param = new HashMap<String, Object>();
		param.put("geneStart", start);
		param.put("geneEnd", end);
		param.put("chromosome", chromosome);
		
		return this.chimerSeqMapper.getPfamDomainInfo(param);
	}

	public List<PfamVo> getPfamDomainInfo( GeneObj geneObj ) {
		String chr = geneObj.getChromosome().startsWith("chr") == true?geneObj.getChromosome():"chr"+geneObj.getChromosome();
		int start = geneObj.getStart();
		int end = geneObj.getEnd();

		return this.getPfamDomainInfo(chr, start, end);
	}
	
	public List<SynonymVo> getSynonym() {

		List<SynonymVo> lst = this.chimerSeqMapper.getSynonym();

		File file = new File("c:\\Users\\insoo078\\Desktop");
		try {
			BufferedWriter out = new BufferedWriter(new FileWriter("c:\\Users\\insoo078\\Desktop\\synonym.txt"));

			for(SynonymVo vo:lst) {
				int gene_id = vo.getGene_id();
				String[] txt = vo.getTxt().split("\\|");
				for(String symbol:txt) {
					if( symbol.equals("-") ) continue;

					out.write(gene_id + "\t" + symbol.trim());
					out.newLine();
				}
			}
			out.close();
		}catch(Exception e) {
			e.printStackTrace();
		}

		return lst;
	}
	
	public String getBED4AlignedReads(String id, String type, String chr, String start, String end) {
		FusionScanReadVo fusionScanReads = this.chimerSeqMapper.getReads( Integer.valueOf( id ) );

		String geneSymbol = fusionScanReads.getGene_pair().split("_")[0];
		if( type.equals("3p") ) geneSymbol = fusionScanReads.getGene_pair().split("_")[1];

		List<ReadVo> reads = ReadVo.makeReadList(fusionScanReads);
		
		String line = "browser position "+chr+":"+start+"-"+end+"\n";
		line += "browser hide all\n";
		line += "browser dense knownGene\n";
		line += "browser dense refGene\n";
		line += "browser dense ucscGenePfam\n";
		line += "track name=Custom_Track_" + geneSymbol+"_From_"+fusionScanReads.getGene_pair()+" description=\"Aligned read list\" visibility=2\n";

		for(ReadVo vo : reads ) {
			if( vo.getType().equals(type) ) {
				line += vo.getChr() + "\t" + vo.getStart() + "\t" + vo.getEnd() + "\n";
			}
		}

		return line;
	}
}