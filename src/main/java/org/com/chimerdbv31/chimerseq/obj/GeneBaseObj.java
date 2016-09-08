/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.com.chimerdbv31.chimerseq.obj;

/**
 *
 * @author insoo078
 */
public class GeneBaseObj {
	private String tax_id;									// taxonomy id
	private String gene_id;									// gene id
	private String symbol;									// gene symbol
	private String locus_tag;								// locus tag
	private String synonyms;								// synonyms
	private String dbxrefs;									// reference databasse ids
	private String chromosome;								// chromosome
	private String map_location;							// map location
	private String description;								// gene description
	private String type_of_gene;							// gene type
	private String symbol_from_nomenclature_authority;
	private String full_name_from_nomenclature_authority;
	private String nomenclature_status;
	private String other_designations;
	private String modification_date;
	
	public GeneBaseObj() {
		this(null, null, null, null, null, null,null, null, null,null, null, null,null, null, null);
	}
	
	public GeneBaseObj(
				String tax_id, String gene_id, String symbol, String locus_tag, String synonyms
				, String dbxrefs, String chromosome, String map_location, String description, String type_of_gene
				, String symbol_from_nomenclature_authority, String full_name_from_nomenclature_authority
				, String nomenclature_status, String other_designations, String modification_date
	) {
		this.tax_id = tax_id;									// taxonomy id
		this.gene_id = gene_id;									// gene id
		this.symbol = symbol;									// gene symbol
		this.locus_tag = locus_tag;								// locus tag
		this.synonyms = synonyms;								// synonyms
		this.dbxrefs = dbxrefs;									// reference databasse ids
		this.chromosome = chromosome;								// chromosome
		this.map_location = map_location;							// map location
		this.description = description;								// gene description
		this.type_of_gene = type_of_gene;							// gene type
		this.symbol_from_nomenclature_authority = symbol_from_nomenclature_authority;
		this.full_name_from_nomenclature_authority = full_name_from_nomenclature_authority;
		this.nomenclature_status = nomenclature_status;
		this.other_designations = other_designations;
		this.modification_date = modification_date;
	}

	public String getTax_id() {
		return tax_id;
	}

	public void setTax_id(String tax_id) {
		this.tax_id = tax_id;
	}

	public String getGene_id() {
		return gene_id;
	}

	public void setGene_id(String gene_id) {
		this.gene_id = gene_id;
	}

	public String getSymbol() {
		return symbol;
	}

	public void setSymbol(String symbol) {
		this.symbol = symbol;
	}

	public String getLocus_tag() {
		return locus_tag;
	}

	public void setLocus_tag(String locus_tag) {
		this.locus_tag = locus_tag;
	}

	public String getSynonyms() {
		return synonyms;
	}

	public void setSynonyms(String synonyms) {
		this.synonyms = synonyms;
	}

	public String getDbxrefs() {
		return dbxrefs;
	}

	public void setDbxrefs(String dbxrefs) {
		this.dbxrefs = dbxrefs;
	}

	public String getChromosome() {
		return chromosome;
	}

	public void setChromosome(String chromosome) {
		this.chromosome = chromosome;
	}

	public String getMap_location() {
		return map_location;
	}

	public void setMap_location(String map_location) {
		this.map_location = map_location;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getType_of_gene() {
		return type_of_gene;
	}

	public void setType_of_gene(String type_of_gene) {
		this.type_of_gene = type_of_gene;
	}

	public String getSymbol_from_nomenclature_authority() {
		return symbol_from_nomenclature_authority;
	}

	public void setSymbol_from_nomenclature_authority(String symbol_from_nomenclature_authority) {
		this.symbol_from_nomenclature_authority = symbol_from_nomenclature_authority;
	}

	public String getFull_name_from_nomenclature_authority() {
		return full_name_from_nomenclature_authority;
	}

	public void setFull_name_from_nomenclature_authority(String full_name_from_nomenclature_authority) {
		this.full_name_from_nomenclature_authority = full_name_from_nomenclature_authority;
	}

	public String getNomenclature_status() {
		return nomenclature_status;
	}

	public void setNomenclature_status(String nomenclature_status) {
		this.nomenclature_status = nomenclature_status;
	}

	public String getOther_designations() {
		return other_designations;
	}

	public void setOther_designations(String other_designations) {
		this.other_designations = other_designations;
	}

	public String getModification_date() {
		return modification_date;
	}

	public void setModification_date(String modification_date) {
		this.modification_date = modification_date;
	}
}
