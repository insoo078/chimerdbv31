/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package aMainp.dao;

import aMainp.iface.MainDaoIF;
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
public class MainDao implements MainDaoIF{
    private SqlSessionTemplate sqlTemplate;
    
    @Override
    public void setnSqlSessionTemplate(SqlSessionTemplate sqlSessionTemplate) {
        this.sqlTemplate = sqlSessionTemplate;
    }


    @Override
    public List<CimrSeqVo> getResult(ParamVo param) {
        List<CimrSeqVo> result = null;
        try {
            result = sqlTemplate.selectList("main_mper.q1_result_for_search",param);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return result;
    }

    @Override
    public List<CimrSeqVo> getResultTest(ParamVo param) {
        List<CimrSeqVo> result = null;
        try {
            result = sqlTemplate.selectList("main_mper.q2_result_for_search",param);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return result;
    }

    @Override
    public List<CimrSeqVo> getChimerSeqResult(ParamVo param) {
        List<CimrSeqVo> result = null;
        try {
            result = sqlTemplate.selectList("main_mper.q10_result_of_chimerseq",param);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return result;
    }

    @Override
    public int getChimerSeqTotalNumber(ParamVo param) {
        int result = 0;
        try {
            result = sqlTemplate.selectOne("main_mper.q10_count_result_of_chimerseq", param);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return result;
    }

    @Override
    public int getChimerKBTotalNumber(ParamVo param) {
        int result = 0;
        try {
            result = sqlTemplate.selectOne("main_mper.q5_count_result_of_chimerkb", param);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return result;
    }

    @Override
    public List<CimrKBVo> getChimerKBResult(ParamVo param) {
        List<CimrKBVo> result = null;
        try {
            result = sqlTemplate.selectList("main_mper.q10_result_of_chimerkb",param);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return result;
    }

    
    
}