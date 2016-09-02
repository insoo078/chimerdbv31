package org.com.chimerdbv31.chimerpub.services;

import java.util.List;
import javax.annotation.Resource;
import org.com.chimerdbv31.chimerpub.mapper.ChimerPubMapper;
import org.com.chimerdbv31.chimerpub.vo.ChimerPubVo;
import org.com.chimerdbv31.common.vo.ParamVo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service(value = "chimerPubService")
public class ChimerPubService {	
    @SuppressWarnings("unused")
    private static final Logger logger = LoggerFactory.getLogger(ChimerPubService.class);

    @Resource(name = "chimerPubMapper")
    private ChimerPubMapper chimerPubMapper;
    
    
    public List<String> getDiseaseList(String keyStr) {
        List<String> result = null;
        try {
            result = this.chimerPubMapper.getDiseaseList(keyStr);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return result;
    }
    
    public List<ChimerPubVo> getChimerPubResult(ParamVo param) {
        List<ChimerPubVo> result = null;
        try {
            result = this.chimerPubMapper.getChimerPubResult(param);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return result;
    }
    
    public ChimerPubVo getJournal(ChimerPubVo param) {
        ChimerPubVo result = null;
        try {
            result = this.chimerPubMapper.getJournal(param);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return result;
    }
    
}
