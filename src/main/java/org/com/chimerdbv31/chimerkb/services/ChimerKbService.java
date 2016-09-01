package org.com.chimerdbv31.chimerkb.services;

import java.util.List;
import javax.annotation.Resource;
import org.com.chimerdbv31.chimerkb.mapper.ChimerKbMapper;
import org.com.chimerdbv31.chimerkb.vo.ChimerKbVo;
import org.com.chimerdbv31.common.vo.ParamVo;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service(value = "chimerKbService")
public class ChimerKbService {	
    @SuppressWarnings("unused")
    private static final Logger logger = LoggerFactory.getLogger(ChimerKbService.class);

    @Resource(name = "chimerKbMapper")
    private ChimerKbMapper chimerKbMapper;
    
    public int getChimerKBTotalNumber(ParamVo param) {
        int result = 0;
        try {
            result = this.chimerKbMapper.getChimerKBTotalNumber(param);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return result;
    }

    public List<ChimerKbVo> getChimerKBResult(ParamVo param) {
        List<ChimerKbVo> result = null;
        try {
            result = this.chimerKbMapper.getChimerKBResult(param);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return result;
    }
    
    public ChimerKbVo getSelectedFGeneData(ChimerKbVo param) {
        ChimerKbVo result = null;
        try {
            result = this.chimerKbMapper.getSelectedFGeneData(param);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return result;
    }
    
    public List<String> getDiseaseList(String keyStr) {
        List<String> result = null;
        try {
            result = this.chimerKbMapper.getDiseaseList(keyStr);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return result;
    }
    
    
}
