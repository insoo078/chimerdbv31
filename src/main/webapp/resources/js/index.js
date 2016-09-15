/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
$(document).ready(function () {
    check_m_state("mmhomebtn");
	
	$("#chimerdbv2_site").click(function(){
		var url = "http://biome.ewha.ac.kr:8080/FusionGene";
		window.location.href = url;
	});
	
	$("#chimerdbv1_site").click(function(){
		var url = "http://genome.ewha.ac.kr/ChimerDB";
		window.location.href = url;
	});
	
	$(".site_link").mouseover(function(){
		$(this).addClass("shadow");
	});
	
	$(".site_link").mouseleave(function(){
		$(this).removeClass("shadow");
	});
});
