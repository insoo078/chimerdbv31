/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.com.chimerdbv31.chimerseq.vo;

import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author insoo078
 */
public class ReadVo {
	private int id;
	private String gene_pair;
	private String type;
	private String readName;
	private String chr;
	private int start;
	private int end;
	private String strand;
	private float score;

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

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getChr() {
		return chr;
	}

	public void setChr(String chr) {
		this.chr = chr;
	}

	public int getStart() {
		return start;
	}

	public void setStart(int start) {
		this.start = start;
	}

	public int getEnd() {
		return end;
	}

	public void setEnd(int end) {
		this.end = end;
	}

	public String getReadName() {
		return readName;
	}

	public void setReadName(String readName) {
		this.readName = readName;
	}

	public String getStrand() {
		return strand;
	}

	public void setStrand(String strand) {
		this.strand = strand;
	}

	public float getScore() {
		return score;
	}

	public void setScore(float score) {
		this.score = score;
	}	
	
	public static List<ReadVo> makeReadList( FusionScanReadVo readVo ) {
		//read 당 구분은 '$' chromosome;start;end;readname(BarcodeID);score=0;strand
		//chr12;108098499;108098524;TCGA-DX-A1KW-01A;0;+$chr12;108098499;108098524;TCGA-DX-A1KW-01A;0;+$chr12;108098500;108098524;TCGA-DX-A1KW-01A;0;+$chr12;108098501;108098524;TCGA-DX-A1KW-01A;0;+$chr12;108098502;108098524;TCGA-DX-A1KW-01A;0;+$chr12;108098502;108098524;TCGA-DX-A1KW-01A;0;+
		List<ReadVo> read5p = ReadVo.split(readVo.getH_alignment(), "5p");
		List<ReadVo> read3p = ReadVo.split(readVo.getT_alignment(), "3p");
		
		read5p.addAll( read3p );
		
		int id = 0;
		for( ReadVo vo : read5p ) {
			vo.setId(id++);
		}

		return read5p;
	}
	
	private static List<ReadVo> split( String alignment, String type ) {
		List<ReadVo> reads = new ArrayList<ReadVo>();

		String[] readStringArray = alignment.split("\\$");
		for(String str : readStringArray ) {
			String[] parts = str.split(";");

			String chr = parts[0];
			String start = parts[1];
			String end = parts[2];
			String readName= parts[3];
			String score = parts[4];
			String strand = parts[5];

			ReadVo readVo = new ReadVo();
			readVo.setChr(chr);
			readVo.setStart( Integer.valueOf(start) );
			readVo.setEnd( Integer.valueOf(end) );
			readVo.setReadName(readName);
			readVo.setStrand(strand);
			readVo.setScore( Float.valueOf(score) );
			readVo.setType(type);

			reads.add( readVo );
		}
		return reads;
	}
}
