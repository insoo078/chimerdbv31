/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.com.chimerdbv31.chimerseq.obj;

import java.lang.reflect.Field;
import java.lang.reflect.Method;
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
	private List<Gff3Vo> features;							// all features
	
	public static void test( GeneInfoVo vo ) throws IllegalArgumentException, IllegalAccessException {
//		Field[] fields = GeneBaseObj.class.get.getFields();
//		System.out.println( fields.length );
//		for(Field field : fields) {
//			field.setAccessible(true);
//			
//			Object obj = field.get(vo);
//			
//			System.out.println( "====================================================> " + obj.toString() );
//		}
	}
}
