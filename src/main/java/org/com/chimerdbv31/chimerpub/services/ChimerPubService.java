package org.com.chimerdbv31.chimerpub.services;

import java.util.List;
import javax.annotation.Resource;
import org.com.chimerdbv31.chimerpub.mapper.ChimerPubMapper;
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
    
}
