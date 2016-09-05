/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.com.chimerdbv31.chimerseq.obj;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import org.com.chimerdbv31.chimerseq.vo.GeneInfoVo;
import org.com.chimerdbv31.chimerseq.vo.Gff3Vo;
import org.com.chimerdbv31.chimerseq.vo.PfamVo;

/**
 *
 * @author insoo078
 */
public class GeneObj extends GeneBaseObj{
	private String seqid;
	private String source;
	private String type;
	private int start;
	private int end;
	private String strand;
	private String phase;
	private String fusionLocation;							// 5' or 3'
	private Map<String, String> attributesMap;	

	private TranscriptObj canonicalTranscript;				// transcript hierachy
	private List<PfamVo> pFamDomainList;					// domain list
	
	private int length;
	private int noOfExons;
	
	public GeneObj( GeneInfoVo vo ) throws IllegalArgumentException, IllegalAccessException {
		super( vo.getTax_id(), vo.getGene_id(), vo.getSymbol(), vo.getLocus_tag(), vo.getSynonyms()
				, vo.getDbxrefs(), vo.getChromosome(), vo.getMap_location(), vo.getDescription()
				, vo.getType_of_gene(), vo.getSymbol_from_nomenclature_authority(), vo.getFull_name_from_nomenclature_authority()
				, vo.getNomenclature_status(), vo.getOther_designations(), vo.getModification_date() );
		
		this.makeHierachyTreeOfFeatures( vo.getFeatures() );
	}

	private void makeHierachyTreeOfFeatures( List<Gff3Vo> features ) {
		List<TranscriptObj> transcripts = new ArrayList<TranscriptObj>();
		TranscriptObj obj = null;
		
		int i = 1;
		for( Gff3Vo vo : features ) {
			if( vo != null ) {
				if( vo.getType().equals("gene") )	this.initGeneInfo(vo);
				else if( vo.getType().equals("mRNA") || vo.getType().equals("transcript") ) {
					obj = new TranscriptObj( vo );
					transcripts.add( obj );
					i = 1;
				}else {
					vo.setElementIndex(i);
					obj.addExon(vo);
					i++;
				}
			}
		}
		this.canonicalTranscript = transcripts.get(0);
		this.noOfExons = this.canonicalTranscript.getExons().size();
	}
	
	private void initGeneInfo( Gff3Vo vo ) {
		this.seqid = vo.getSeqid();
		this.source = vo.getSource();
		this.type = vo.getType();
		this.start = vo.getStart();
		this.end = vo.getEnd();
		this.strand = vo.getStrand();
		this.phase = vo.getPhase();
		
		this.length = this.end - this.start + 1;
		
		this.attributesMap = vo.getAttributesMap();
	}

	public String getSeqid() {
		return seqid;
	}

	public void setSeqid(String seqid) {
		this.seqid = seqid;
	}

	public String getSource() {
		return source;
	}

	public void setSource(String source) {
		this.source = source;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
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

	public String getStrand() {
		return strand;
	}

	public void setStrand(String strand) {
		this.strand = strand;
	}

	public String getPhase() {
		return phase;
	}

	public void setPhase(String phase) {
		this.phase = phase;
	}

	public String getFusionLocation() {
		return fusionLocation;
	}

	public void setFusionLocation(String fusionLocation) {
		this.fusionLocation = fusionLocation;
	}

	public Map<String, String> getAttributesMap() {
		return attributesMap;
	}

	public void setAttributesMap(Map<String, String> attributesMap) {
		this.attributesMap = attributesMap;
	}

	public TranscriptObj getCanonicalTranscript() {
		return canonicalTranscript;
	}

	public void setCanonicalTranscript(TranscriptObj canonicalTranscript) {
		this.canonicalTranscript = canonicalTranscript;
	}

	public List<PfamVo> getpFamDomainList() {
		return pFamDomainList;
	}

	public void setpFamDomainList(List<PfamVo> pFamDomainList) {
		this.pFamDomainList = pFamDomainList;
	}

	public int getLength() {
		return length;
	}

	public void setLength(int length) {
		this.length = length;
	}

	public int getNoOfExons() {
		return noOfExons;
	}

	public void setNoOfExons(int noOfExons) {
		this.noOfExons = noOfExons;
	}
	
//	
//	public void validatePfamDomains() {
//		for(PfamVo pfam : this.pFamDomainList) {
//			for(Gff3Vo gff : this.canonicalTranscript.getExons() ) {
//				pfam.getch
//			}
//		}
//	}
}
