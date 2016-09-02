/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.com.chimerdbv31.chimerseq.obj;

import java.util.Map;
import org.com.chimerdbv31.chimerseq.vo.ChimerSeqVo;

/**
 *
 * @author insoo078
 */
public class FusionGeneObj extends ChimerSeqVo{
	public static final String _5P_GENE = "5'";
	public static final String _3P_GENE = "3'";
	
	private Map<String, GeneObj> genes;

	public Map<String, GeneObj> getGenes() {
		return genes;
	}

	public void setGenes(Map<String, GeneObj> genes) {
		this.genes = genes;
	}
}
