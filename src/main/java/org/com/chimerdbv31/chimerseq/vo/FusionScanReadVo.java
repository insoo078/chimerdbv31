/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.com.chimerdbv31.chimerseq.vo;

/**
 *
 * @author insoo078
 */
public class FusionScanReadVo {
	private int id;
	private String gene_pair;
	private String h_alignment;
	private String t_alignment;

			
			/*
						id
			, Fusion_pair as gene_pair
			, H_alignment as h_alignment
			, T_alignment as t_alignment
			*/

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getGene_pair() {
		return gene_pair;
	}

	public void setGene_pair(String gene_pair) {
		this.gene_pair = gene_pair;
	}

	public String getH_alignment() {
		return h_alignment;
	}

	public void setH_alignment(String h_alignment) {
		this.h_alignment = h_alignment;
	}

	public String getT_alignment() {
		return t_alignment;
	}

	public void setT_alignment(String t_alignment) {
		this.t_alignment = t_alignment;
	}
}
