/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
$(document).ready(function () {
    check_m_state("mmhelpbtn");
	
	$(".menu_btn").hover(function() {
		$(this).addClass("menu_hilight");
	});

	$(".menu_btn").mouseout(function() {
		$(this).removeClass("menu_hilight");
	});

	$(".menu_btn").click(function(){
		var id=$(this).attr('id');
		
		var target = id.replace('btn', 'top');
		
		$(window).scrollTop( $("#"+target).offset().top );
	});
	
	$('.top_pop_scroll').click(function(){
		$('html, body').animate({scrollTop : 0},800);
		return false;
	});
	
	$(window).scroll(function(){
        var y = $(this).scrollTop();

        if(y >= 100){
            $('.top_pop_scroll').fadeIn();
        } else {
			$('.top_pop_scroll').fadeOut();
        }
    });
});