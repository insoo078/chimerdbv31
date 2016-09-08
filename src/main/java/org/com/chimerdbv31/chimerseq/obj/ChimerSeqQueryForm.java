/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.com.chimerdbv31.chimerseq.obj;

import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author insoo078
 */
public class ChimerSeqQueryForm {
	private String searchType;
	private String byGeneTxt;
	private String byGene5Prime;
	private String byGene3Prime;
	private String byGenePairTxt;
	private String byChrLocusTxt;
	private String byDiseaseTxt;

	private String chkTcgaOption;
	private String tcgaCancerTypes;
	private String chkFusionScan;
	private String chkTophat;
	private String chkPrada;
	private String noOfSeedReads;
	private String noOfSpaningPairs;
	private String noOfJunctionReads;
	private String chkChimerDbV2;
	private String chkChiTaRs;
	
	private String chkKinaseFusion;
	private String chkOncogene;
	private String chkTumorSuppressor;
	private String chkReceptor;
	private String chkTranscriptionFactor;
	private String chkInterChromosomal;
	private String chkIxtraChromosomal;
	private String chkChimerKbSupport;
	private String chkChimerPubSupport;
	
	private List<String> cancerTypes;
	
	private int start;
	private int length;
	private int sortKey;
	private String sortOrderDir;
	private String searchKeyword;
	
	public void validateData() {
		this.cancerTypes = new ArrayList<String>();
		if( this.tcgaCancerTypes != null ) {
			String[] cancers = this.tcgaCancerTypes.split(",");
			for(String cancer:cancers) {
				if( cancer.equals("All cancer types") ) continue;

				this.cancerTypes.add( cancer );
			}
		}
	}
	
	public List<String> getCancerTypes() {
		return this.cancerTypes;
	}
	
	public void setCancerType(List<String> cancerTypes) {
		this.cancerTypes = cancerTypes;
	}

	public String getSearchType() {
		return searchType;
	}

	public void setSearchType(String searchType) {
		this.searchType = searchType;
	}

	public String getByGeneTxt() {
		return byGeneTxt;
	}

	public void setByGeneTxt(String byGeneTxt) {
		this.byGeneTxt = byGeneTxt;
	}

	public String getByGene5Prime() {
		return byGene5Prime;
	}

	public void setByGene5Prime(String byGene5Prime) {
		this.byGene5Prime = byGene5Prime;
	}

	public String getByGene3Prime() {
		return byGene3Prime;
	}

	public void setByGene3Prime(String byGene3Prime) {
		this.byGene3Prime = byGene3Prime;
	}

	public String getByGenePairTxt() {
		return byGenePairTxt;
	}

	public void setByGenePairTxt(String byGenePairTxt) {
		this.byGenePairTxt = byGenePairTxt;
	}

	public String getByChrLocusTxt() {
		return byChrLocusTxt;
	}

	public void setByChrLocusTxt(String byChrLocusTxt) {
		this.byChrLocusTxt = byChrLocusTxt;
	}

	public String getByDiseaseTxt() {
		return byDiseaseTxt;
	}

	public void setByDiseaseTxt(String byDiseaseTxt) {
		this.byDiseaseTxt = byDiseaseTxt;
	}

	public String getChkTcgaOption() {
		return chkTcgaOption;
	}

	public void setChkTcgaOption(String chkTcgaOption) {
		this.chkTcgaOption = chkTcgaOption;
	}

	public String getTcgaCancerTypes() {
		return tcgaCancerTypes;
	}

	public void setTcgaCancerTypes(String tcgaCancerTypes) {
		this.tcgaCancerTypes = tcgaCancerTypes;
	}

	public String getNoOfSeedReads() {
		return noOfSeedReads;
	}

	public void setNoOfSeedReads(String noOfSeedReads) {
		this.noOfSeedReads = noOfSeedReads;
	}

	public String getNoOfSpaningPairs() {
		return noOfSpaningPairs;
	}

	public void setNoOfSpaningPairs(String noOfSpaningPairs) {
		this.noOfSpaningPairs = noOfSpaningPairs;
	}

	public String getNoOfJunctionReads() {
		return noOfJunctionReads;
	}

	public void setNoOfJunctionReads(String noOfJunctionReads) {
		this.noOfJunctionReads = noOfJunctionReads;
	}

	public String getChkChimerDbV2() {
		return chkChimerDbV2;
	}

	public void setChkChimerDbV2(String chkChimerDbV2) {
		this.chkChimerDbV2 = chkChimerDbV2;
	}

	public String getChkChiTaRs() {
		return chkChiTaRs;
	}

	public void setChkChiTaRs(String chkChiTaRs) {
		this.chkChiTaRs = chkChiTaRs;
	}

	public String getChkKinaseFusion() {
		return chkKinaseFusion;
	}

	public void setChkKinaseFusion(String chkKinaseFusion) {
		this.chkKinaseFusion = chkKinaseFusion;
	}

	public String getChkOncogene() {
		return chkOncogene;
	}

	public void setChkOncogene(String chkOncogene) {
		this.chkOncogene = chkOncogene;
	}

	public String getChkTumorSuppressor() {
		return chkTumorSuppressor;
	}

	public void setChkTumorSuppressor(String chkTumorSuppressor) {
		this.chkTumorSuppressor = chkTumorSuppressor;
	}

	public String getChkReceptor() {
		return chkReceptor;
	}

	public void setChkReceptor(String chkReceptor) {
		this.chkReceptor = chkReceptor;
	}

	public String getChkTranscriptionFactor() {
		return chkTranscriptionFactor;
	}

	public void setChkTranscriptionFactor(String chkTranscriptionFactor) {
		this.chkTranscriptionFactor = chkTranscriptionFactor;
	}

	public String getChkInterChromosomal() {
		return chkInterChromosomal;
	}

	public void setChkInterChromosomal(String chkInterChromosomal) {
		this.chkInterChromosomal = chkInterChromosomal;
	}

	public String getChkIxtraChromosomal() {
		return chkIxtraChromosomal;
	}

	public void setChkIxtraChromosomal(String chkIxtraChromosomal) {
		this.chkIxtraChromosomal = chkIxtraChromosomal;
	}

	public String getChkChimerKbSupport() {
		return chkChimerKbSupport;
	}

	public void setChkChimerKbSupport(String chkChimerKbSupport) {
		this.chkChimerKbSupport = chkChimerKbSupport;
	}

	public String getChkChimerPubSupport() {
		return chkChimerPubSupport;
	}

	public void setChkChimerPubSupport(String chkChimerPubSupport) {
		this.chkChimerPubSupport = chkChimerPubSupport;
	}

	public String getChkFusionScan() {
		return chkFusionScan;
	}

	public void setChkFusionScan(String chkFusionScan) {
		this.chkFusionScan = chkFusionScan;
	}

	public String getChkTophat() {
		return chkTophat;
	}

	public void setChkTophat(String chkTophat) {
		this.chkTophat = chkTophat;
	}

	public String getChkPrada() {
		return chkPrada;
	}

	public void setChkPrada(String chkPrada) {
		this.chkPrada = chkPrada;
	}

	public int getStart() {
		return start;
	}

	public void setStart(int start) {
		this.start = start;
	}

	public int getLength() {
		return length;
	}

	public void setLength(int length) {
		this.length = length;
	}

	public int getSortKey() {
		return sortKey;
	}

	public void setSortKey(int sortKey) {
		this.sortKey = sortKey;
	}

	public String getSearchKeyword() {
		return searchKeyword;
	}

	public void setSearchKeyword(String searchKeyword) {
		this.searchKeyword = searchKeyword;
	}

	public String getSortOrderDir() {
		return sortOrderDir;
	}

	public void setSortOrderDir(String sortOrderDir) {
		this.sortOrderDir = sortOrderDir;
	}
}
