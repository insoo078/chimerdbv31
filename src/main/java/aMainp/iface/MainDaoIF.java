/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package aMainp.iface;



import aMainp.vo.CimrKBVo;
import aMainp.vo.CimrSeqVo;
import aMainp.vo.MainTableVo;
import aMainp.vo.ParamVo;
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
    public List<CimrKBVo> getChimerKBResult(ParamVo param);
    public List<CimrSeqVo> getResult(ParamVo param);
    public List<CimrSeqVo> getResultTest(ParamVo param);
}
