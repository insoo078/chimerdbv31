/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.com.chimerdbv31.chimerseq.vo;

import java.util.ArrayList;
import java.util.List;
import org.com.chimerdbv31.chimerseq.obj.DomainFragmentObj;

/**
 *
 * @author insoo078
 */
public class PfamVo {
	private int id;
	private int bin;
	private String chromosome;
	private int chromStart;
	private int chromEnd;
	private String name;
	private float score;
	private String strand;
	private int thickStart;
	private int thickEnd;
	private int reserved;
	private int blockCount;
	private String blockSizes;
	private String chromStarts;
			
	private List<DomainFragmentObj> fragments;

	public PfamVo(){
		this.fragments = new ArrayList<DomainFragmentObj>();
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getBin() {
		return bin;
	}

	public void setBin(int bin) {
		this.bin = bin;
	}

	public String getChromosome() {
		return chromosome;
	}

	public void setChromosome(String chromosome) {
		this.chromosome = chromosome;
	}

	public int getChromStart() {
		return chromStart;
	}

	public void setChromStart(int chromStart) {
		this.chromStart = chromStart;
	}

	public int getChromEnd() {
		return chromEnd;
	}

	public void setChromEnd(int chromEnd) {
		this.chromEnd = chromEnd;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public float getScore() {
		return score;
	}

	public void setScore(float score) {
		this.score = score;
	}

	public String getStrand() {
		return strand;
	}

	public void setStrand(String strand) {
		this.strand = strand;
	}

	public int getThickStart() {
		return thickStart;
	}

	public void setThickStart(int thickStart) {
		this.thickStart = thickStart;
	}

	public int getThickEnd() {
		return thickEnd;
	}

	public void setThickEnd(int thickEnd) {
		this.thickEnd = thickEnd;
	}

	public int getReserved() {
		return reserved;
	}

	public void setReserved(int reserved) {
		this.reserved = reserved;
	}

	public int getBlockCount() {
		return blockCount;
	}

	public void setBlockCount(int blockCount) {
		this.blockCount = blockCount;
	}

	public String getBlockSizes() {
		return blockSizes;
	}

	public void setBlockSizes(String blockSizes) {
		this.blockSizes = blockSizes;
	}

	public String getChromStarts() {
		return chromStarts;
	}

	public void setChromStarts(String chromStarts) {
		this.chromStarts = chromStarts;
	}

	public void addFragment(DomainFragmentObj fragment) {
		if( this.fragments == null )	this.fragments = new ArrayList<DomainFragmentObj>();
		
		this.fragments.add( fragment );
	}

	public List<DomainFragmentObj> getFragments() {
		return fragments;
	}
	
}
