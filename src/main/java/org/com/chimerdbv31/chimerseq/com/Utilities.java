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
	public static boolean isOverlapped( int start1, int end1, int start2, int end2 ) {
		int sum = (end1 - start1 + 1) + (end2 - start2 + 1);
		int max = Math.max(end1, end2) + Math.min(start1, start2);
		
		if( sum > max ) return true;
		
		return false;
	}
}