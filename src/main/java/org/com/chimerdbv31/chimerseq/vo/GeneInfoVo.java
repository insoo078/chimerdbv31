/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.com.chimerdbv31.chimerseq.vo;

import java.util.ArrayList;
import java.util.List;
import org.com.chimerdbv31.chimerseq.obj.GeneBaseObj;
import org.com.chimerdbv31.chimerseq.obj.TranscriptObj;

/**
 *
 * @author insoo078
 */
public class GeneInfoVo extends GeneBaseObj{
	private String fusionLocation;							// 5' or 3'
	private List<Gff3Vo> features;							// all features
	
	private Gff3Vo geneFeature;								// gene gff feature
	private List<TranscriptObj> transcripts;				// transcript hierachy
	
	private List<PfamVo> pFamDomainList;					// domain list

	public void makeHierachyTreeOfFeatures( List<Gff3Vo> exonElementsWithIndex ) {
		if( this.transcripts == null )	this.transcripts = new ArrayList<TranscriptObj>();
		else							this.transcripts.clear();

		TranscriptObj obj = null;
		for(Gff3Vo vo : this.features ) {
			if( vo != null ) {
				if( vo.getType().equals("gene") )	this.geneFeature = vo;
				else if( vo.getType().equals("mRNA") || vo.getType().equals("transcript") ) {
					obj = new TranscriptObj( vo );
					this.transcripts.add( obj );
				}else {
					obj.addExon(vo);
				}
			}
		}
	}

	public String getFusionLocation() {
		return fusionLocation;
	}

	public void setFusionLocation(String fusionLocation) {
		this.fusionLocation = fusionLocation;
	}
	

	public Gff3Vo getGeneFeature() {
		return geneFeature;
	}

	public void setGeneFeature(Gff3Vo geneFeature) {
		this.geneFeature = geneFeature;
	}

	public List<TranscriptObj> getTranscripts() {
		return transcripts;
	}

	public void setTranscripts(List<TranscriptObj> transcripts) {
		this.transcripts = transcripts;
	}

	public List<Gff3Vo> getFeatures() {
		return features;
	}

	public void setFeatures(List<Gff3Vo> features) {
		this.features = features;
	}

	public List<PfamVo> getpFamDomainList() {
		return pFamDomainList;
	}

	public void setpFamDomainList(List<PfamVo> pFamDomainList) {
		this.pFamDomainList = pFamDomainList;
	}
}
