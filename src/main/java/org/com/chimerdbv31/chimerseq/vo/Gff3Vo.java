/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.com.chimerdbv31.chimerseq.vo;

import java.util.LinkedHashMap;
import java.util.Map;

/**
 *
 * @author insoo078
 */
public class Gff3Vo {
	private String seqid;
	private String source;
	private String type;
	private int start;
	private int end;
	private float score;
	private String strand;
	private String phase;
	private String attributes;
	private Map<String, String> attributesMap;
	
	private int relativeStart;
	private int relativeEnd;
	
	private int elementIndex;
	
	public Gff3Vo() {}
	public Gff3Vo(String seqid, String source, String type, int start, int end, float score
			, String strand, String phase, String attributes, Map<String, String> attributesMap, int relativeStart, int relativeEnd, int elementIndex) {
		this.seqid = seqid;
		this.source = source;
		this.type = type;
		this.start = start;
		this.end = end;
		this.score = score;
		this.strand = strand;
		this.phase = phase;
		this.attributes = attributes;
		this.attributesMap = attributesMap;
		this.relativeEnd = relativeEnd;
		this.relativeStart = relativeStart;
		this.elementIndex = elementIndex;
	}
	
	@Override
	public Gff3Vo clone() {
		return new Gff3Vo(this.seqid, this.source, this.type, this.start, this.end, this.score
		, this.strand, this.phase, this.attributes, this.attributesMap, this.relativeStart, this.relativeEnd, this.elementIndex);
	}

	public int getElementIndex() {
		return elementIndex;
	}

	public void setElementIndex(int elementIndex) {
		this.elementIndex = elementIndex;
	}

	public void setSeqid(String seqid) {
		this.seqid = seqid;
	}

	public void setSource(String source) {
		this.source = source;
	}

	public void setType(String type) {
		this.type = type;
	}

	public void setStart(int start) {
		this.start = start;
	}

	public void setEnd(int end) {
		this.end = end;
	}

	public void setScore(float score) {
		this.score = score;
	}

	public void setStrand(String strand) {
		this.strand = strand;
	}

	public void setPhase(String phase) {
		this.phase = phase;
	}

	public void setAttributes(String attributes) {
		this.attributes = attributes;
		Map<String, String> map = new LinkedHashMap<String, String>();
//		ID=gene17180;Name=ABL1;Dbxref=GeneID:25,HGNC:76,HPRD:01809,MIM:189980;gbkey=Gene;gene=ABL1;gene_synonym=ABL,bcr%2Fabl,c-ABL,JTK7,p150,v-abl
		String[] attributeArray = attributes.split(";");
		for(String attribute : attributeArray) {
			String[] set = attribute.split("=");
			if( set != null && set.length == 2 )	map.put(set[0], set[1]);
		}
		this.setAttributesMap( map );
	}

	public void setAttributesMap(Map<String, String> attributesMap) {
		this.attributesMap = attributesMap;
	}

	public String getSeqid() {
		return seqid;
	}

	public String getSource() {
		return source;
	}

	public String getType() {
		return type;
	}

	public int getStart() {
		return start;
	}

	public int getEnd() {
		return end;
	}

	public float getScore() {
		return score;
	}

	public String getStrand() {
		return strand;
	}

	public String getPhase() {
		return phase;
	}

	public String getAttributes() {
		return attributes;
	}

	public Map<String, String> getAttributesMap() {
		return attributesMap;
	}

	public int getRelativeStart() {
		return relativeStart;
	}

	public void setRelativeStart(int relativeStart) {
		this.relativeStart = relativeStart;
	}

	public int getRelativeEnd() {
		return relativeEnd;
	}

	public void setRelativeEnd(int relativeEnd) {
		this.relativeEnd = relativeEnd;
	}

}
