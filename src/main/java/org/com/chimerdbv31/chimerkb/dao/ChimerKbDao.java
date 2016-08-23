package org.com.chimerdbv31.chimerkb.dao;

import java.util.List;
import org.com.chimerdbv31.chimerkb.vo.ChimerKBVo;
import org.com.chimerdbv31.common.vo.ParamVo;

public interface ChimerKbDao {
    public int getChimerKBTotalNumber(ParamVo param);
    public List<ChimerKBVo> getChimerKBResult(ParamVo param);
}
