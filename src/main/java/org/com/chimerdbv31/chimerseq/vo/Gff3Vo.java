/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.com.chimerdbv31.chimerseq.vo;

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

}
