/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.com.chimerdbv31.chimerseq.obj;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import org.com.chimerdbv31.chimerseq.vo.ChimerSeqVo;
import org.com.chimerdbv31.chimerseq.vo.Gff3Vo;
import org.com.chimerdbv31.chimerseq.vo.PfamVo;
import org.com.chimerdbv31.chimerseq.obj.TranscriptObj;

/**
 *
 * @author insoo078
 */
public class FusionGeneObj extends ChimerSeqVo{
	public static final String _5P_GENE = "5'";
	public static final String _3P_GENE = "3'";
	
	private Map<String, GeneObj> genes;
	
	public FusionGeneObj(ChimerSeqVo vo) {
		super( vo.getId(), vo.getFusion_pair(), vo.getGene5Junc(), vo.getGene3Junc(), vo.getBreakpoint_Type()
				, vo.getCancertype(), vo.getBarcodeID(), vo.getFrame(), vo.getChr_info(), vo.getSource()
				, vo.getChimerKB(), vo.getChimerPub(), vo.getSupported(), vo.getT_gene(), vo.getH_gene() );

		this.genes = new LinkedHashMap<String, GeneObj>();
	}

	public Map<String, GeneObj> getGenes() {
		return genes;
	}

	public void addGene( String geneLoc, GeneObj gene ) {
		this.genes.put(geneLoc, gene);
		
		this.reArrangeRelativePositionInGeneBoundary( gene );
	}
	
	private void reArrangeRelativePositionInGeneBoundary( GeneObj gene ) {
		this.reArrangeRelativePositionExonsInGeneBoundary( gene );
		this.reArrangeRelativePositionPfamDomainsInGeneBoundary( gene );
	}
	
	private void reArrangeRelativePositionExonsInGeneBoundary( GeneObj gene ) {
		int start = gene.getStart();

		TranscriptObj transcript = gene.getCanonicalTranscript();
		transcript.setStart( transcript.getStart() - start );
		transcript.setEnd( transcript.getEnd() - start );

		for(Gff3Vo vo:transcript.getExons()) {
			vo.setStart( vo.getStart() - start );
			vo.setEnd( vo.getEnd() - start );
		}
	}
	
	private void reArrangeRelativePositionPfamDomainsInGeneBoundary( GeneObj gene ) {
		int start = gene.getStart();

		List<PfamVo> pfamDomainList = gene.getpFamDomainList();
		for(PfamVo vo:pfamDomainList) {
			vo.setChromStart( vo.getChromStart() - start );
			vo.setChromEnd( vo.getChromEnd() - start );

			String[] starts = vo.getChromStarts().split(",");
			String[] blockSizes = vo.getBlockSizes().split(",");

			for(int i=0; i<starts.length; i++) {
				int domainFragmentStart = Integer.valueOf( starts[i] );
				int domainFragmentEnd = Integer.valueOf( starts[i] ) + Integer.valueOf(blockSizes[i]);
				
				DomainFragmentObj fragment = new DomainFragmentObj( domainFragmentStart, domainFragmentEnd );
				
				vo.addFragment( fragment );
			}
		}
	}
}