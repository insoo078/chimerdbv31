package org.com.chimerdbv31.chimerkb.mapper;

import java.util.List;
import org.com.chimerdbv31.chimerkb.vo.ChimerKbVo;
import org.com.chimerdbv31.common.vo.ParamVo;
import org.springframework.stereotype.Repository;

@Repository(value = "chimerKbMapper")
public interface ChimerKbMapper {
	public int getChimerKBTotalNumber(ParamVo param);
	public List<ChimerKbVo> getChimerKBResult(ParamVo param);
        public ChimerKbVo getSelectedFGeneData(ChimerKbVo param);
}
