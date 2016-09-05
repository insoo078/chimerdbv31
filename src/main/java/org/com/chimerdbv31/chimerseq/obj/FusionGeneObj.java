/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.com.chimerdbv31.chimerseq.obj;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import org.com.chimerdbv31.chimerseq.vo.ChimerSeqVo;
import org.com.chimerdbv31.chimerseq.vo.Gff3Vo;
import org.com.chimerdbv31.chimerseq.vo.PfamVo;

/**
 *
 * @author insoo078
 */
public class FusionGeneObj extends ChimerSeqVo{
	public static final String _5P_GENE = "5'";
	public static final String _3P_GENE = "3'";
	
	private Map<String, GeneObj> genes;
	private Map<String, List<Gff3Vo>> fusedExons;
	
	public FusionGeneObj(ChimerSeqVo vo) {
		super( vo.getId(), vo.getFusion_pair(), vo.getGene5Junc(), vo.getGene3Junc(), vo.getBreakpoint_Type()
				, vo.getCancertype(), vo.getBarcodeID(), vo.getFrame(), vo.getChr_info(), vo.getSource()
				, vo.getChimerKB(), vo.getChimerPub(), vo.getSupported(), vo.getT_gene(), vo.getH_gene(), vo.getExon_breakpoint() );

		this.genes = new LinkedHashMap<String, GeneObj>();
	}

	public Map<String, GeneObj> getGenes() {
		return genes;
	}

	public Map<String, List<Gff3Vo>> getFusedExons() {
		return fusedExons;
	}

	public void setFusedExons(Map<String, List<Gff3Vo>> fusedExons) {
		this.fusedExons = fusedExons;
	}

	public void addGene( String geneLoc, GeneObj gene ) {
		this.genes.put(geneLoc, gene);
		
		this.reArrangeRelativePositionInGeneBoundary( gene );
	}

	// 유전자의 위치(시작, 종료)에 따라 유전자 안에 포함된
	// Exon 영역의 위치를 절대위치에서 상대위치로 재조정하고
	// 또 단백질 도메인 영역도 절대 위치에서 상대위치로 재조정함
	private void reArrangeRelativePositionInGeneBoundary( GeneObj gene ) {
		this.reArrangeRelativePositionExonsInGeneBoundary( gene );
		this.reArrangeRelativePositionPfamDomainsInGeneBoundary( gene );

		this.fusedExons = this.reArrangeBreakedFusionGene();
	}
	
	// Exon 영역의 위치를 상대위치로 재조정하는 메소드
	private void reArrangeRelativePositionExonsInGeneBoundary( GeneObj gene ) {
		int start = gene.getStart();

		TranscriptObj transcript = gene.getCanonicalTranscript();
		transcript.setRelativeStart(transcript.getStart() - start );
		transcript.setRelativeEnd(transcript.getEnd() - start );

		for(Gff3Vo vo:transcript.getExons()) {
			vo.setRelativeStart( vo.getStart() - start );
			vo.setRelativeEnd( vo.getEnd() - start );
		}
	}
	
	// 단백질 domain의 영역의 위치를 상대위치로 재조정하는 메소드
	private void reArrangeRelativePositionPfamDomainsInGeneBoundary( GeneObj gene ) {
		int start = gene.getStart();

		List<PfamVo> pfamDomainList = gene.getpFamDomainList();
		for(PfamVo vo:pfamDomainList) {
//			vo.setChromStart( vo.getChromStart() - start );
//			vo.setChromEnd( vo.getChromEnd() - start );

			String[] starts = vo.getChromStarts().split(",");
			String[] blockSizes = vo.getBlockSizes().split(",");

			int offset = vo.getChromStart() - gene.getStart();
			for(int i=0; i<starts.length; i++) {
				int domainFragmentStart = Integer.valueOf( starts[i] ) + offset;
				int domainFragmentEnd = Integer.valueOf( starts[i] ) + Integer.valueOf(blockSizes[i]) + offset;

				DomainFragmentObj fragment = new DomainFragmentObj( vo.getName(), domainFragmentStart, domainFragmentEnd );

				vo.addFragment( fragment );
			}
		}
	}
	
	private Map<String, List<Gff3Vo>> reArrangeBreakedFusionGene() {
		Map<String, List<Gff3Vo>> map = new LinkedHashMap<String, List<Gff3Vo>>();
		for (String keyGeneType : this.getGenes().keySet()) {
			GeneObj gene = this.getGenes().get(keyGeneType);

			String strBreakPoint = this.getGene3Junc();
			if( keyGeneType.equals( FusionGeneObj._5P_GENE ) ) {
				strBreakPoint = this.getGene5Junc();
			}
			String[] divs = strBreakPoint.split(":");
			String chr = divs[0];
			int breakPoint = Integer.valueOf(divs[1]);

			List<Gff3Vo> fusedGenes = new ArrayList<Gff3Vo>();

			for(Gff3Vo gff : gene.getCanonicalTranscript().getExons()) {
				if( keyGeneType.equals( FusionGeneObj._5P_GENE ) ) {
					if( gff.getEnd() < breakPoint ) {
						Gff3Vo newGff = gff.clone();
						fusedGenes.add( newGff );
					}else if( gff.getStart() <= breakPoint && gff.getEnd() >= breakPoint ) {
						Gff3Vo newGff = gff.clone();

						if( gff.getStart() < breakPoint && gff.getEnd() >= breakPoint ) {
							gff.setEnd(breakPoint);
						}

						fusedGenes.add( newGff );
					}
				}else {
					if( gff.getStart() > breakPoint ) {
						Gff3Vo newGff = gff.clone();
						fusedGenes.add( newGff );
					}else if( gff.getStart() <= breakPoint && gff.getEnd() >= breakPoint ) {
						Gff3Vo newGff = gff.clone();

						if( gff.getStart() < breakPoint && gff.getEnd() >= breakPoint ) {
							gff.setStart(breakPoint);
						}

						fusedGenes.add( newGff );
					}
				}
			}

			map.put( keyGeneType, fusedGenes );
		}
		return map;
	}
}