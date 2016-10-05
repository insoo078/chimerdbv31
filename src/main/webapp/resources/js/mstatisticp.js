/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
$(document).ready(function () {
    check_m_state("mmstatisticbtn");
	
	
	$(".chimer-image").click(function(){
		var modal = $("#myImgModal");
		modal.css("display", "block");
		$("#img01").attr('src', this.src);
	});
	
	$(".img-close").click(function(){
		var modal = $("#myImgModal");
		modal.css("display", "none");
	});
});