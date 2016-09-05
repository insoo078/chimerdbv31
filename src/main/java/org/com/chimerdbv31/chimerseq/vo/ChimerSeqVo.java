/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package org.com.chimerdbv31.chimerseq.vo;

/**
 *
 * @author Ik-Jung Choi <cij@ewha.ac.kr>
 */
public class ChimerSeqVo {
	private int id;
    private String fusion_pair;
    private String gene5Junc;
    private String gene3Junc;
    private String breakpoint_Type;
    private String cancertype;
    private String barcodeID;
    private String frame;
    private String chr_info;
    private String source;
    private String chimerKB;
    private String chimerPub;
    private String supported;
	private String t_gene;
	private String h_gene;
	private String exon_breakpoint;
	
	public ChimerSeqVo() {
		this(-1, null, null, null, null, null, null, null
		, null, null, null, null, null, null, null, null);
	}
	
	public ChimerSeqVo(int id, String fusion_pair, String gene5Junc, String gene3Junc
			, String breakpoint_Type, String cancertype, String barcodeID, String frame
			, String chr_info, String source, String chimerKB, String chimerPub
			, String supported, String t_gene, String h_gene, String exon_breakpoint) {
		this.id = id;
		this.fusion_pair = fusion_pair;
		this.gene5Junc = gene5Junc;
		this.gene3Junc = gene3Junc;
		this.breakpoint_Type = breakpoint_Type;
		this.cancertype = cancertype;
		this.barcodeID = barcodeID;
		this.frame = frame;
		this.chr_info = chr_info;
		this.source = source;
		this.chimerKB = chimerKB;
		this.chimerPub = chimerPub;
		this.supported = supported;
		this.t_gene = t_gene;
		this.h_gene = h_gene;
		this.exon_breakpoint = exon_breakpoint;
	}

	public String getExon_breakpoint() {
		return exon_breakpoint;
	}

	public void setExon_breakpoint(String exon_breakpoint) {
		this.exon_breakpoint = exon_breakpoint;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

    public String getFusion_pair() {
        return fusion_pair;
    }

    public void setFusion_pair(String Fusion_pair) {
        this.fusion_pair = Fusion_pair;
    }

    public String getGene5Junc() {
        return gene5Junc;
    }

    public void setGene5Junc(String gene5Junc) {
        this.gene5Junc = gene5Junc;
    }

    public String getGene3Junc() {
        return gene3Junc;
    }

    public void setGene3Junc(String gene3Junc) {
        this.gene3Junc = gene3Junc;
    }

    public String getBreakpoint_Type() {
        return this.breakpoint_Type;
    }

    public void setBreakpoint_Type(String Breakpoint_Type) {
        this.breakpoint_Type = Breakpoint_Type;
    }

    public String getCancertype() {
        return cancertype;
    }

    public void setCancertype(String Cancertype) {
        this.cancertype = Cancertype;
    }

    public String getBarcodeID() {
        return barcodeID;
    }

    public void setBarcodeID(String BarcodeID) {
        this.barcodeID = BarcodeID;
    }

    public String getFrame() {
        return frame;
    }

    public void setFrame(String Frame) {
        this.frame = Frame;
    }

    public String getChr_info() {
        return chr_info;
    }

    public void setChr_info(String Chr_info) {
        this.chr_info = Chr_info;
    }

    public String getSource() {
        return source;
    }

    public void setSource(String Source) {
        this.source = Source;
    }

    public String getChimerKB() {
        return chimerKB;
    }

    public void setChimerKB(String ChimerKB) {
        this.chimerKB = ChimerKB;
    }

    public String getChimerPub() {
        return chimerPub;
    }

    public void setChimerPub(String ChimerPub) {
        this.chimerPub = ChimerPub;
    }

    public String getSupported() {
        return supported;
    }

    public void setSupported(String supported) {
        this.supported = supported;
    }

	public String getT_gene() {
		return t_gene;
	}

	public void setT_gene(String t_gene) {
		this.t_gene = t_gene;
	}

	public String getH_gene() {
		return h_gene;
	}

	public void setH_gene(String h_gene) {
		this.h_gene = h_gene;
	}   
}
