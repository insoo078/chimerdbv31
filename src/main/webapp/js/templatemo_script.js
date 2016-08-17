/* Credit: http://www.templatemo.com */
    
$(document).ready( function() {        

	// sidebar menu click
	$('.templatemo-sidebar-menu li.sub a').click(function(){
		if($(this).parent().hasClass('open')) {
			$(this).parent().removeClass('open');
		} else {
			$(this).parent().addClass('open');
		}
	});  // sidebar menu click

}); // document.ready

function JSONtoString(object){
    var results = [];
    for (var property in object){
    var value = object[property];
    if (value)
        results.push(property.toString() + ': ' + value);
    }
    return '{' + results.join(', ') + '}';
}