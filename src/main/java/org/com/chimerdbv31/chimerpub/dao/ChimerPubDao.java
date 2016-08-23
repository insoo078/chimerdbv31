package org.com.chimerdbv31.chimerpub.dao;

import java.util.List;
import org.com.chimerdbv31.chimerseq.vo.CimrSeqVo;
import org.com.chimerdbv31.common.vo.ParamVo;

public interface ChimerPubDao {
    public List<CimrSeqVo> getChimerPubResult(ParamVo param);
}
