package org.com.chimerdbv31.chimerseq.mapper;

import java.util.List;
import java.util.Map;
import org.apache.ibatis.annotations.Param;
import org.com.chimerdbv31.chimerseq.obj.ChimerSeqQueryForm;
import org.com.chimerdbv31.chimerseq.vo.ChimerSeqDetailVo;
import org.com.chimerdbv31.chimerseq.vo.ChimerSeqVo;
import org.com.chimerdbv31.chimerseq.vo.GeneInfoVo;
import org.com.chimerdbv31.chimerseq.vo.Gff3Vo;
import org.com.chimerdbv31.chimerseq.vo.PfamVo;
import org.com.chimerdbv31.common.vo.ParamVo;
import org.springframework.stereotype.Repository;

@Repository(value = "chimerSeqMapper")
public interface ChimerSeqMapper {
//    public List<ChimerSeqVo> getChimerSeqResult(ParamVo param);
	public List<ChimerSeqVo> getChimerSeqResult(ChimerSeqQueryForm param);
//    public int getChimerSeqTotalNumber(ParamVo param);
	public int getChimerSeqTotalNumber(ChimerSeqQueryForm param);
    public List<ChimerSeqVo> getResult(ParamVo param);
    public List<ChimerSeqVo> getResultTest(ParamVo param);
	public GeneInfoVo getGeneInfo(@Param("symbol") String symbol);
	public List<Gff3Vo> getGeneFeatureInfo(@Param("symbol") String symbol);
//	public List<Gff3Vo> getExonElementsWithIndex(@Param("symbol") String symbol);
	public List<String> getAutocompleteInfo(Map<String, String> map);
	public List<String> getTcgaCancerTypes();
	public ChimerSeqDetailVo getFusionGeneDetailInfo(@Param("id") String id);
	public List<PfamVo> getPfamDomainInfo(Map<String, Object> param);
}
