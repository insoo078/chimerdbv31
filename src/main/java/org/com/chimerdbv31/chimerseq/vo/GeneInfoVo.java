/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.com.chimerdbv31.chimerseq.vo;

import java.util.List;
import org.com.chimerdbv31.chimerseq.obj.GeneBaseObj;

/**
 *
 * @author insoo078
 */
public class GeneInfoVo extends GeneBaseObj{
	private String fusionLocation;							// 5' or 3'
	private List<Gff3Vo> features;							// all features

	public String getFusionLocation() {
		return fusionLocation;
	}

	public void setFusionLocation(String fusionLocation) {
		this.fusionLocation = fusionLocation;
	}

	public List<Gff3Vo> getFeatures() {
		return features;
	}

	public void setFeatures(List<Gff3Vo> features) {
		this.features = features;
	}
}
