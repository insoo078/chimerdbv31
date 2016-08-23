/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package org.com.chimerdbv31.dao;

import org.com.chimerdbv31.iface.MainDaoIF;
import org.com.chimerdbv31.chimerkb.vo.ChimerKBVo;
import org.com.chimerdbv31.chimerseq.vo.ChimerSeqVo;
import org.com.chimerdbv31.common.vo.ParamVo;
import java.util.List;
import org.mybatis.spring.SqlSessionTemplate;


//010-8632-4185
//박소현
//
//(김민서, 최진혁, 장인수)

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
	public List<ChimerSeqVo> getResult(ParamVo param) {
		List<ChimerSeqVo> result = null;
		try {
			result = sqlTemplate.selectList("main_mper.q1_result_for_search",param);
		} catch (Exception e) {
			System.out.println(e.getMessage());
		}
		return result;
	}

	@Override
	public List<ChimerSeqVo> getResultTest(ParamVo param) {
		List<ChimerSeqVo> result = null;
		try {
			result = sqlTemplate.selectList("main_mper.q2_result_for_search",param);
		} catch (Exception e) {
			System.out.println(e.getMessage());
		}
		return result;
	}

    @Override
    public List<ChimerSeqVo> getChimerSeqResult(ParamVo param) {
        List<ChimerSeqVo> result = null;
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
    public List<ChimerKBVo> getChimerKBResult(ParamVo param) {
        List<ChimerKBVo> result = null;
        try {
            result = sqlTemplate.selectList("main_mper.q10_result_of_chimerkb",param);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return result;
    }

    
    
}
