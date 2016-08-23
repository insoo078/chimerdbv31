package org.com.chimerdbv31.chimerpub.mapper;

import java.util.List;
import org.com.chimerdbv31.chimerseq.vo.ChimerSeqVo;
import org.com.chimerdbv31.common.vo.ParamVo;
import org.springframework.stereotype.Repository;

@Repository(value = "chimerPubMapper")
public interface ChimerPubMapper {
    public List<ChimerSeqVo> getChimerPubResult(ParamVo param);
}
