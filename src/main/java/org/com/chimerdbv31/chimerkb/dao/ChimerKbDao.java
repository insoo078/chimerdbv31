package org.com.chimerdbv31.chimerkb.dao;

import java.util.List;
import org.com.chimerdbv31.chimerkb.vo.ChimerKbVo;
import org.com.chimerdbv31.common.vo.ParamVo;

public interface ChimerKbDao {
    public int getChimerKBTotalNumber(ParamVo param);
    public List<ChimerKbVo> getChimerKBResult(ParamVo param);
}
