package org.com.chimerdbv31.chimerpub.mapper;

import java.util.List;
import org.com.chimerdbv31.chimerpub.vo.ChimerPubVo;
import org.com.chimerdbv31.common.vo.ParamVo;
import org.springframework.stereotype.Repository;

@Repository(value = "chimerPubMapper")
public interface ChimerPubMapper {
//    public List<ChimerSeqVo> getChimerPubResult(ParamVo param);
    public List<String> getDiseaseList(String keyStr);
    public List<ChimerPubVo> getChimerPubResult(ParamVo param);
    public ChimerPubVo getJournal(ChimerPubVo param);
    
}
