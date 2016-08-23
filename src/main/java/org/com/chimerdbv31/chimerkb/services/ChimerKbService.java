package org.com.chimerdbv31.chimerkb.services;

import java.util.List;
import javax.annotation.Resource;
import org.com.chimerdbv31.chimerkb.mapper.ChimerKbMapper;
import org.com.chimerdbv31.chimerkb.vo.ChimerKBVo;
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

    public List<ChimerKBVo> getChimerKBResult(ParamVo param) {
        List<ChimerKBVo> result = null;
        try {
            result = this.getChimerKBResult(param);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return result;
    }
}
