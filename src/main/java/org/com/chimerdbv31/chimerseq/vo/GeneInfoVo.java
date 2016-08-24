/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.com.chimerdbv31.chimerseq.vo;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import org.com.chimerdbv31.chimerseq.obj.TranscriptObj;
import org.com.chimerdbv31.chimerseq.vo.Gff3Vo;

/**
 *
 * @author insoo078
 */
public class GeneInfoVo extends Gff3Vo{
	private String tax_id;
	private String gene_id;
	private String symbol;
	private String locus_tag;
	private String synonyms;
	private String dbxrefs;
	private String chromosome;
	private String map_location;
	private String description;
	private String type_of_gene;
	private String symbol_from_nomenclature_authority;
	private String full_name_from_nomenclature_authority;
	private String nomenclature_status;
	private String other_designations;
	private String modification_date;

	private List<TranscriptObj> transcripts;

	public GeneInfoVo() {
		this.transcripts = new ArrayList<TranscriptObj>();
	}
	
	public GeneInfoVo(List<TranscriptObj> transcripts) {
		this.transcripts = transcripts;
	}
	
	public void addTranscript( TranscriptObj transcript ) {
		this.transcripts.add( transcript );
	}

	public List<TranscriptObj> getTranscripts() {
		return transcripts;
	}

	public String getTax_id() {
		return tax_id;
	}

	public String getGene_id() {
		return gene_id;
	}

	public String getSymbol() {
		return symbol;
	}

	public String getLocus_tag() {
		return locus_tag;
	}

	public String getSynonyms() {
		return synonyms;
	}

	public String getDbxrefs() {
		return dbxrefs;
	}

	public String getChromosome() {
		return chromosome;
	}

	public String getMap_location() {
		return map_location;
	}

	public String getDescription() {
		return description;
	}

	public String getType_of_gene() {
		return type_of_gene;
	}

	public String getSymbol_from_nomenclature_authority() {
		return symbol_from_nomenclature_authority;
	}

	public String getFull_name_from_nomenclature_authority() {
		return full_name_from_nomenclature_authority;
	}

	public String getNomenclature_status() {
		return nomenclature_status;
	}

	public String getOther_designations() {
		return other_designations;
	}

	public String getModification_date() {
		return modification_date;
	}

	public void setTax_id(String tax_id) {
		this.tax_id = tax_id;
	}

	public void setGene_id(String gene_id) {
		this.gene_id = gene_id;
	}

	public void setSymbol(String symbol) {
		this.symbol = symbol;
	}

	public void setLocus_tag(String locus_tag) {
		this.locus_tag = locus_tag;
	}

	public void setSynonyms(String synonyms) {
		this.synonyms = synonyms;
	}

	public void setDbxrefs(String dbxrefs) {
		this.dbxrefs = dbxrefs;
	}

	public void setChromosome(String chromosome) {
		this.chromosome = chromosome;
	}

	public void setMap_location(String map_location) {
		this.map_location = map_location;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public void setType_of_gene(String type_of_gene) {
		this.type_of_gene = type_of_gene;
	}

	public void setSymbol_from_nomenclature_authority(String symbol_from_nomenclature_authority) {
		this.symbol_from_nomenclature_authority = symbol_from_nomenclature_authority;
	}

	public void setFull_name_from_nomenclature_authority(String full_name_from_nomenclature_authority) {
		this.full_name_from_nomenclature_authority = full_name_from_nomenclature_authority;
	}

	public void setNomenclature_status(String nomenclature_status) {
		this.nomenclature_status = nomenclature_status;
	}

	public void setOther_designations(String other_designations) {
		this.other_designations = other_designations;
	}

	public void setModification_date(String modification_date) {
		this.modification_date = modification_date;
	}

	public void setTranscripts(List<TranscriptObj> transcripts) {
		this.transcripts = transcripts;
	}
}
