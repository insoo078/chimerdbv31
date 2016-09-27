/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.com.chimerdbv31.chimerpub.newpackage.obj;

import java.util.List;
import org.com.chimerdbv31.chimerpub.vo.DistributionVo;

/**
 *
 * @author insoo078
 */
public class DistObj {
	private List<DistributionVo> list;
	private int minScore;
	private int maxScore;
	private int minFreq;
	private int maxFreq;

	public List<DistributionVo> getList() {
		return list;
	}

	public void setList(List<DistributionVo> list) {
		this.list = list;
	}

	public int getMinScore() {
		return minScore;
	}

	public void setMinScore(int minScore) {
		this.minScore = minScore;
	}

	public int getMaxScore() {
		return maxScore;
	}

	public void setMaxScore(int maxScore) {
		this.maxScore = maxScore;
	}

	public int getMinFreq() {
		return minFreq;
	}

	public void setMinFreq(int minFreq) {
		this.minFreq = minFreq;
	}

	public int getMaxFreq() {
		return maxFreq;
	}

	public void setMaxFreq(int maxFreq) {
		this.maxFreq = maxFreq;
	}

}
