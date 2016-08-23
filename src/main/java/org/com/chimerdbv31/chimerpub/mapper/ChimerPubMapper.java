package org.com.chimerdbv31.chimerpub.mapper;

import java.util.List;
import org.com.chimerdbv31.chimerseq.vo.CimrSeqVo;
import org.com.chimerdbv31.vo.ParamVo;
import org.springframework.stereotype.Repository;

@Repository(value = "ChimerPubMapper")
public interface ChimerPubMapper {
    public List<CimrSeqVo> getChimerSeqResult(ParamVo param);
}
