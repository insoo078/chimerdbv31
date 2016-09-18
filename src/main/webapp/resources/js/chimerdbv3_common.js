/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function () {
	$(".chimer-pub-icon").click(function(){
		var gene_pair = $("#srt_td_5gene_nm").text() + "_" + $("#srt_td_3gene_nm").text();
		
		var url = "chimerpub_from_others.cdb?key_data_for_search_type=" + gene_pair;
		window.open(url, 'ChimerPub', 'window settings');
		return false;
	});
	
	$(".chimer-kb-icon").click(function(){
		var gene_pair = $("#srt_td_5gene_nm").text() + "_" + $("#srt_td_3gene_nm").text();

		var url = "chimerkb_from_others.cdb?key_data_for_search_type=" + gene_pair;
		window.open(url, 'ChimerKb', 'window settings');
		return false;
	});
	
	$(".chimer-seq-icon").click(function(){
		var gene_pair = $("#srt_td_5gene_nm").text() + "_" + $("#srt_td_3gene_nm").text();

		var url = "chimerseq_link.cdb?gene_pair=" + gene_pair;
		window.open(url, 'ChimerSeq', 'window settings');
		return false;
	});
});