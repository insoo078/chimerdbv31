package org.com.chimerdbv31.chimerseq.services;

import java.util.List;
import javax.annotation.Resource;
import org.com.chimerdbv31.chimerseq.mapper.ChimerSeqMapper;
import org.com.chimerdbv31.chimerseq.vo.CimrSeqVo;
import org.com.chimerdbv31.common.vo.ParamVo;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service(value = "ChimerSeqService")
public class ChimerSeqService {	
    @SuppressWarnings("unused")
    private static final Logger logger = LoggerFactory.getLogger(ChimerSeqService.class);

    @Resource(name = "ChimerSeqMapper")
    private ChimerSeqMapper chimerSeqMapper;

    public List<CimrSeqVo> getChimerSeqResult(ParamVo param) {
        List<CimrSeqVo> result = null;
        try {
            result = this.chimerSeqMapper.getChimerSeqResult(param);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return result;
    }

    public int getChimerSeqTotalNumber(ParamVo param) {
        int result = 0;
        try {
            result = this.chimerSeqMapper.getChimerSeqTotalNumber(param);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return result;
    }

    public List<CimrSeqVo> getResult(ParamVo param) {
        List<CimrSeqVo> result = null;
        try {
            result = this.chimerSeqMapper.getResult(param);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return result;
    }

    public List<CimrSeqVo> getResultTest(ParamVo param) {
        List<CimrSeqVo> result = null;
        try {
            result = this.chimerSeqMapper.getResultTest(param);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return result;
    }
}
