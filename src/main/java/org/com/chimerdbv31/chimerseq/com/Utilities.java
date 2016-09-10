/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.com.chimerdbv31.chimerseq.com;

/**
 *
 * @author 김수린
 */
public class Utilities {
	public static boolean isOverlapped( long start1, long end1, long start2, long end2 ) {
		long sum = (end1 - start1 + 1) + (end2 - start2 + 1);
		long m1 = Math.max(end1, end2);
		long m2 = Math.min(start1, start2);
		long max = Math.max(end1, end2) - Math.min(start1, start2) + 1;
		
		System.out.println(start1 + ", " + end1 + " ========= " + start2 + ", " + end2);
		
		if( sum > max ) return true;
		
		return false;
	}
}