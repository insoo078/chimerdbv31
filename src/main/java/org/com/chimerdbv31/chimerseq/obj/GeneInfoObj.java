/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.com.chimerdbv31.chimerseq.obj;

import java.util.ArrayList;
import java.util.List;
import org.com.chimerdbv31.chimerseq.vo.GeneInfoVo;
import org.com.chimerdbv31.chimerseq.vo.Gff3Vo;

/**
 *
 * @author insoo078
 */
public class GeneInfoObj extends GeneInfoVo{
	private Gff3Vo geneGffRecord;
	private List<TranscriptObj> transcripts;
	
	public GeneInfoObj() {
		this.geneGffRecord = null;
		this.transcripts = new ArrayList<TranscriptObj>();
	}
	
	public GeneInfoObj(Gff3Vo geneFeature, List<TranscriptObj> transcripts) {
		this.geneGffRecord = geneFeature;
		this.transcripts = transcripts;
	}
	
	public void setGeneGffFeature( Gff3Vo geneFeature ) {
		this.geneGffRecord = geneFeature;
	}
	
	public void addTranscript( TranscriptObj transcript ) {
		this.transcripts.add( transcript );
	}

	public Gff3Vo getGeneGffRecord() {
		return geneGffRecord;
	}

	public List<TranscriptObj> getTranscripts() {
		return transcripts;
	}
}
