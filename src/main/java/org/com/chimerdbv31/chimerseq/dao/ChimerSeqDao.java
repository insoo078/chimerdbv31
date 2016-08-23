package org.com.chimerdbv31.chimerseq.dao;

import java.util.List;
import org.com.chimerdbv31.chimerseq.vo.CimrSeqVo;
import org.com.chimerdbv31.common.vo.ParamVo;

public interface ChimerSeqDao {
    public List<CimrSeqVo> getChimerSeqResult(ParamVo param);
    public int getChimerSeqTotalNumber(ParamVo param);
    public List<CimrSeqVo> getResult(ParamVo param);
    public List<CimrSeqVo> getResultTest(ParamVo param);
}
