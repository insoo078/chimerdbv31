package org.com.chimerdbv31.chimerseq.services;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import javax.annotation.Resource;
import org.com.chimerdbv31.chimerseq.mapper.ChimerSeqMapper;
import org.com.chimerdbv31.chimerseq.obj.ChimerSeqQueryForm;
import org.com.chimerdbv31.chimerseq.vo.ChimerSeqVo;
import org.com.chimerdbv31.chimerseq.vo.GeneInfoVo;
import org.com.chimerdbv31.chimerseq.vo.ChimerSeqDetailVo;
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

//	public List<ChimerSeqVo> getChimerSeqResult(ParamVo param) {
//		List<ChimerSeqVo> result = null;
//		try {
//			result = this.chimerSeqMapper.getChimerSeqResult(param);
//		} catch (Exception e) {
//			System.out.println(e.getMessage());
//		}
//		return result;
//	}

	public List<ChimerSeqVo> getChimerSeqResult( ChimerSeqQueryForm param ) {
		List<ChimerSeqVo> result = null;
		try {
			param.revalidateData();

			result = this.chimerSeqMapper.getChimerSeqResult(param);
		} catch (Exception e) {
			System.out.println(e.getMessage());
		}
		return result;
	}

	public int getChimerSeqTotalNumber(ChimerSeqQueryForm param) {
		int result = 0;
		try {
			result = this.chimerSeqMapper.getChimerSeqTotalNumber(param);
		} catch (Exception e) {
			System.out.println(e.getMessage());
		}
		return result;
	}
	
//    public int getChimerSeqTotalNumber(ParamVo param) {
//        int result = 0;
//        try {
//            result = this.chimerSeqMapper.getChimerSeqTotalNumber(param);
//        } catch (Exception e) {
//            System.out.println(e.getMessage());
//        }
//        return result;
//    }

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
			obj.rearrangeFeatures( obj.getFeatures() );
			obj.setFusionLocation( props[0] );
			list.add(obj);
		}
		return list;
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
}