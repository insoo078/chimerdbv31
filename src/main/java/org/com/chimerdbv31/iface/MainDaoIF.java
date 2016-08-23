/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package org.com.chimerdbv31.iface;



import org.com.chimerdbv31.chimerkb.vo.ChimerKBVo;
import org.com.chimerdbv31.chimerseq.vo.CimrSeqVo;
import org.com.chimerdbv31.common.vo.MainTableVo;
import org.com.chimerdbv31.common.vo.ParamVo;
import java.util.List;
import org.mybatis.spring.SqlSessionTemplate;

/**
 *
 * @author cij@ewha.ac.kr
 */
public interface MainDaoIF {
    public void setnSqlSessionTemplate(SqlSessionTemplate sqlSessionTemplate);
    public int getChimerSeqTotalNumber(ParamVo param);
    public List<CimrSeqVo> getChimerSeqResult(ParamVo param);
    public int getChimerKBTotalNumber(ParamVo param);
    public List<ChimerKBVo> getChimerKBResult(ParamVo param);
    public List<CimrSeqVo> getResult(ParamVo param);
    public List<CimrSeqVo> getResultTest(ParamVo param);
}