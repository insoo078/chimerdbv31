/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.com.chimerdbv31.chimerseq.obj;

import java.util.List;
import org.com.chimerdbv31.chimerseq.vo.GeneInfoVo;
import org.com.chimerdbv31.chimerseq.vo.Gff3Vo;

/**
 *
 * @author insoo078
 */
public class GeneInfoObj extends GeneInfoVo{
	private Gff3Vo geneGffRecord;
	private List<TranscriptObj> transcripts;
}
