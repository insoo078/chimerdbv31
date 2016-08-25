package org.com.chimerdbv31.chimerseq.dao;

import java.util.List;
import org.com.chimerdbv31.chimerseq.vo.ChimerSeqVo;
import org.com.chimerdbv31.common.vo.ParamVo;

public interface ChimerSeqDao {
    public List<ChimerSeqVo> getChimerSeqResult(ParamVo param);
    public int getChimerSeqTotalNumber(ParamVo param);
    public List<ChimerSeqVo> getResult(ParamVo param);
    public List<ChimerSeqVo> getResultTest(ParamVo param);
}
