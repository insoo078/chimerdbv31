package org.com.chimerdbv31.chimerkb.mapper;

import java.util.List;
import org.com.chimerdbv31.chimerkb.vo.ChimerKBVo;
import org.com.chimerdbv31.vo.ParamVo;
import org.springframework.stereotype.Repository;

@Repository(value = "ChimerKbMapper")
public interface ChimerKbMapper {
    public int getChimerKBTotalNumber(ParamVo param);
    public List<ChimerKBVo> getChimerKBResult(ParamVo param);
}
