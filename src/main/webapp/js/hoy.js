/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function check_m_state(m){
    $(".mmAtagcss").filter(function(i){return ($(this).attr("id") === m);}).css("color","#fbb450");
}

function clearText(field){
    if( (field.defaultValue == field.value) ){
        field.value = "";
    }else if(field.value == ''){
        field.value = field.defaultValue;
    }
}