package org.com.chimerdbv31.chimerseq.services;

import java.util.ArrayList;
import java.util.List;
import javax.annotation.Resource;
import org.com.chimerdbv31.chimerseq.mapper.ChimerSeqMapper;
import org.com.chimerdbv31.chimerseq.vo.ChimerSeqVo;
import org.com.chimerdbv31.chimerseq.vo.GeneInfoVo;
import org.com.chimerdbv31.chimerseq.vo.Gff3Vo;
import org.com.chimerdbv31.chimerseq.vo.GeneInfoVo;
import org.com.chimerdbv31.chimerseq.obj.TranscriptObj;
import org.com.chimerdbv31.common.vo.ParamVo;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service(value = "chimerSeqService")
public class ChimerSeqService {	
    @SuppressWarnings("unused")
    private static final Logger logger = LoggerFactory.getLogger(ChimerSeqService.class);

    @Resource(name = "chimerSeqMapper")
    private ChimerSeqMapper chimerSeqMapper;

    public List<ChimerSeqVo> getChimerSeqResult(ParamVo param) {
        List<ChimerSeqVo> result = null;
        try {
            result = this.chimerSeqMapper.getChimerSeqResult(param);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return result;
    }

    public int getChimerSeqTotalNumber(ParamVo param) {
        int result = 0;
        try {
            result = this.chimerSeqMapper.getChimerSeqTotalNumber(param);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return result;
    }

    public List<ChimerSeqVo> getResult(ParamVo param) {
        List<ChimerSeqVo> result = null;
        try {
            result = this.chimerSeqMapper.getResult(param);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return result;
    }

    public List<ChimerSeqVo> getResultTest(ParamVo param) {
        List<ChimerSeqVo> result = null;
        try {
            result = this.chimerSeqMapper.getResultTest(param);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return result;
    }
	
	public List<GeneInfoVo> getGeneInfo(List<String> genes) {
		List<GeneInfoVo> list = new ArrayList<GeneInfoVo>();
		for(String gene:genes) {
			String[] props = gene.split(":");
			
			GeneInfoVo obj = (GeneInfoVo)this.chimerSeqMapper.getGeneInfo( props[1] );
			obj.rearrangeFeatures( this.chimerSeqMapper.getExonElementsWithIndex( props[1] ) );
			obj.setFusionLocation( props[0] );
			list.add(obj);
		}
		return list;
	}
	
//	private GeneInfoVo addGeneFeatures( GeneInfoVo gene, List<Gff3Vo> gff3Features ) {
//		TranscriptObj obj = null;
//		for(Gff3Vo vo : gff3Features ) {
//			if( vo.getType().equals("gene") )	gene.setGeneGffFeature( vo );
//			else if( vo.getType().equals("mRNA") || vo.getType().equals("transcript") ) {
//				obj = (TranscriptObj)vo;
//				gene.addTranscript( obj );
//			}else {
//				obj.addExon(vo);
//			}
//		}
//		return gene;
//	}
}