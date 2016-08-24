package org.com.chimerdbv31.chimerseq.mapper;

import java.util.List;
import org.apache.ibatis.annotations.Param;
import org.com.chimerdbv31.chimerseq.vo.ChimerSeqVo;
import org.com.chimerdbv31.chimerseq.vo.GeneInfoVo;
import org.com.chimerdbv31.common.vo.ParamVo;
import org.springframework.stereotype.Repository;

@Repository(value = "chimerSeqMapper")
public interface ChimerSeqMapper {
    public List<ChimerSeqVo> getChimerSeqResult(ParamVo param);
    public int getChimerSeqTotalNumber(ParamVo param);
    public List<ChimerSeqVo> getResult(ParamVo param);
    public List<ChimerSeqVo> getResultTest(ParamVo param);
	public GeneInfoVo geneGeneInfo(@Param("symbol") String symbol);
}
