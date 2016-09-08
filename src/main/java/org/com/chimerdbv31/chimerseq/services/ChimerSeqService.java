package org.com.chimerdbv31.chimerseq.services;

import com.google.gson.Gson;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import javax.annotation.Resource;
import org.com.chimerdbv31.chimerseq.mapper.ChimerSeqMapper;
import org.com.chimerdbv31.chimerseq.obj.ChimerSeqQueryForm;
import org.com.chimerdbv31.chimerseq.obj.FusionGeneObj;
import org.com.chimerdbv31.chimerseq.obj.GeneObj;
import org.com.chimerdbv31.chimerseq.vo.ChimerSeqVo;
import org.com.chimerdbv31.chimerseq.vo.GeneInfoVo;
import org.com.chimerdbv31.chimerseq.vo.ChimerSeqDetailVo;
import org.com.chimerdbv31.chimerseq.vo.PfamVo;

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
		param.validateData();

		return this.chimerSeqMapper.getChimerSeqResult(param);
	}

	/**
	 * 조회된 데이터를 Paging 처리하기 위해 전체 조회된 데이터의 size를 반환해주는 메소드
	 * 
	 * @param param 조회 옵션 기능을 담고 있는 오브젝트
	 * @return int 전체 조회된 데이터의 Size
	 */
	public int getChimerSeqTotalNumber(ChimerSeqQueryForm param) throws Exception{
		return this.chimerSeqMapper.getChimerSeqTotalNumber(param);
	}

	public FusionGeneObj getGeneInfo( ChimerSeqVo chimerSeqRecord ) throws Exception{
		Gson gson = new Gson();

		String[] genes = new String[]{chimerSeqRecord.getH_gene(), chimerSeqRecord.getT_gene()};
		String[] loc = new String[]{ FusionGeneObj._5P_GENE, FusionGeneObj._3P_GENE };

		FusionGeneObj fusionGene = new FusionGeneObj( chimerSeqRecord );
		for( int i=0; i<genes.length; i++ ) {
			// Find gene info by gene symbol
			GeneInfoVo geneInfoVo = (GeneInfoVo)this.chimerSeqMapper.getGeneInfo( genes[i] );

			GeneObj obj = new GeneObj( geneInfoVo );
			geneInfoVo.setFusionLocation( loc[i] );

			// Find Pfam domains by gene information
			obj.setpFamDomainList( this.getPfamDomainInfo( obj ) );

			fusionGene.addGene( loc[i], obj );
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
}