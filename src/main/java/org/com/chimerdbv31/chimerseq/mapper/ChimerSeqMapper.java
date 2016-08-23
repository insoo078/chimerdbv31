package org.com.chimerdbv31.chimerseq.mapper;

import java.util.List;
import org.com.chimerdbv31.chimerseq.vo.CimrSeqVo;
import org.com.chimerdbv31.vo.ParamVo;
import org.springframework.stereotype.Repository;

@Repository(value = "ChimerSeqMapper")
public interface ChimerSeqMapper {
    public List<CimrSeqVo> getChimerSeqResult(ParamVo param);
}
