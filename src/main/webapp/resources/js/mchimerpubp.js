/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


$(document).ready(function () {
    check_m_state("mmchimerpubbtn");
    $(".chimerkbsearchdiv").equalHeights();
    $("#by_disease_txt").autocomplete({
        minLength:2,
        source: "chimerpubdiseaselst.cdb"
//        select: function(event,ui){
//            ui.item ? "Selected: " + ui.item.value + " aka " + ui.item.id : "Nothing selected, input was " + this.value ;
//        }
    });
});



//-----------
//-----------


function checkbtnofradio(type){
    switch(type){
        case "by_gene":{
                $("#search_type_gene_rdo").prop("checked",true);
        };break;
        case "by_gene_pair":{
                $("#search_type_gp_rdo").prop("checked",true);
        };break;
        case "by_chr_locus":{
                $("#search_type_chr_rdo").prop("checked",true);
        };break;
        case "by_disease":{
                $("#search_type_dses_rdo").prop("checked",true);
        };break;
    }
    
    if( type === "by_gene" ){
        $("#by_gene_chk_5").prop("checked",true);
        $("#by_gene_chk_3").prop("checked",true);
    }else{
        if( $("input:checkbox[id='by_gene_chk_5']").is(":checked") ){
            $("#by_gene_chk_5").prop("checked",false);
        }
        if( $("input:checkbox[id='by_gene_chk_3']").is(":checked") ){
            $("#by_gene_chk_3").prop("checked",false);
        }
    }
}




function validatnmtd_toggle(type){
    var flag = $("input:checkbox[id='vm_none_chk']").is(":checked");
    switch(type){
        case "fish":{
            if(flag){
                $("#vm_none_chk").prop("checked",function(){ return false; });
            }
        };break;
        case "sanger":{
            if(flag){
                $("#vm_none_chk").prop("checked",function(){ return false; });
            }
        };break;
        case "pcr":{
            if(flag){
                $("#vm_none_chk").prop("checked",function(){ return false; });
            }
        };break;
        case "no":{
            if(flag){
                $("#vm_fish_chk").prop("checked",function(){ return false; });
                $("#vm_sanger_chk").prop("checked",function(){ return false; });
                $("#vm_rtpcr_chk").prop("checked",function(){ return false; });
            }
        };break;
    }
}


function resetall(){
    if( $("input:radio[id='search_type_gene_rdo']").is(":checked") == false ){ $("#search_type_gene_rdo").prop("checked",true); }
    $("#pub_num_txt").val("1");
    $("#txt_mining_score_txt").val("10");            
    $('input:checkbox').each(function(){
        var chkObjId = $(this).attr("id");
        if( chkObjId == "by_gene_chk_3" ){
            if( $("input:checkbox[id='"+chkObjId+"']").is(":checked") == false ){ $("#"+chkObjId).prop("checked",true); }
        }else if( chkObjId == "vm_fish_chk" ){
            if( $("input:checkbox[id='"+chkObjId+"']").is(":checked") == false ){ $("#"+chkObjId).prop("checked",true); }
        }else if( chkObjId == "vm_sanger_chk" ){
            if( $("input:checkbox[id='"+chkObjId+"']").is(":checked") == false ){ $("#"+chkObjId).prop("checked",true); }
        }else if( chkObjId == "vm_rtpcr_chk" ){
            if( $("input:checkbox[id='"+chkObjId+"']").is(":checked") == false ){ $("#"+chkObjId).prop("checked",true); }
        }else if( chkObjId == "vm_none_chk" ){
            if( $("input:checkbox[id='"+chkObjId+"']").is(":checked") == false ){ $("#"+chkObjId).prop("checked",true); }
        }else{
            if(this.checked){
                this.checked = false;
            }
        }
    });
}


function searching(){
    var chkData = true;
    
            var searchType = $("input:radio[name='search_type_rdo']:checked").val();
                $("#key_a_search_type").val( searchType );
                var keyVal = "";
                
                    switch(searchType){
                        case "all_genes":{

                        };break;
                        case "by_gene":{
                                keyVal = $("#by_gene_txt").val();
                                if( (keyVal == "") || ($.trim(keyVal) == "") || (keyVal == null) ){
                                    $("#chimerdb_empty_data").modal("show");
                                    return;
                                }else{
                                    if( $("input:checkbox[id='by_gene_chk_5']").is(":checked") == true ){
                                        keyVal += ","+"5";
                                    }
                                    if( $("input:checkbox[id='by_gene_chk_3']").is(":checked") == true ){
                                        keyVal += ","+"3";
                                    }
                                    $("#key_data_for_search_type").val( keyVal );
                                }
                        };break;
                        case "by_gene_pair":{
                                keyVal = $("#by_gene_pair_txt").val();
                                
                                if( (keyVal == "") || ($.trim(keyVal) == "") || (keyVal == null) ){
                                    $("#chimerdb_empty_data").modal("show");
                                    return;
                                }else{
                                    $("#key_data_for_search_type").val( keyVal );
                                }
                        };break;
                        case "by_disease":{
                                keyVal = $("#by_disease_txt").val();
                                if( (keyVal == "") || ($.trim(keyVal) == "") || (keyVal == null) ){
                                    $("#chimerdb_empty_data").modal("show");
                                    return;
                                }else{
                                    $("#key_data_for_search_type").val( keyVal );
                                }
                        };break;
                        case "by_chr_locus":{
                                keyVal = $("#by_chr_locus_txt").val();
                                if( (keyVal == "") || ($.trim(keyVal) == "") || (keyVal == null) ){
                                    $("#chimerdb_empty_data").modal("show");
                                    return;
                                }else{
                                    $("#key_data_for_search_type").val( keyVal );
                                }
                        };break;
                    }
                ///////////////////////////////
                keyVal = "";
                
                keyVal = $("#pub_num_txt").val();
                
                if( (keyVal == "") || ($.trim(keyVal) == "") || (keyVal == null) ){
                    //$("#chimerdb_empty_data").modal("show");
                    //return;
                }else{
                    $("#key_num_of_pub").val( keyVal );
                }
                
                keyVal = "";
                
                keyVal = $("#txt_mining_score_txt").val();
                if( (keyVal == "") || ($.trim(keyVal) == "") || (keyVal == null) ){
                    //$("#chimerdb_empty_data").modal("show");
                    //return;
                }else{
                    $("#key_txt_mining_score").val( keyVal );
                }
                
                keyVal = "";
                if( $("input:checkbox[id='vm_none_chk']").is(":checked") == true ){
                    keyVal = "none";
                }else{
                    keyVal = "each";
                    if( $("input:checkbox[id='vm_sanger_chk']").is(":checked") == true ){
                        keyVal += ","+"sanger";
                    }
                    if( $("input:checkbox[id='vm_fish_chk']").is(":checked") == true ){
                        keyVal += ","+"fish";
                    }
                    if( $("input:checkbox[id='vm_rtpcr_chk']").is(":checked") == true ){
                        keyVal += ","+"rtpcr";
                    }
                }
                $("#key_pub_selt_the_validtn_mtd").val( keyVal );
                
                
                //filter//////////////////////////////////////////////////////////////////////////////////
                keyVal = "each";
                if( $("input:checkbox[id='fbyfunc_kinase_chk']").is(":checked") == true ){
                    keyVal += ","+"kinase";
                }
                if( $("input:checkbox[id='fbyfunc_onco_chk']").is(":checked") == true ){
                    keyVal += ","+"onco";
                }
                if( $("input:checkbox[id='fbyfunc_tumor_chk']").is(":checked") == true ){
                    keyVal += ","+"tumor";
                }
                if( $("input:checkbox[id='fbyfunc_recpt_chk']").is(":checked") == true ){
                    keyVal += ","+"recpt";
                }
                if( $("input:checkbox[id='fbyfunc_transcript_chk']").is(":checked") == true ){
                    keyVal += ","+"transcript";
                }
                $("#key_flt_by_func").val( keyVal );
                
                keyVal = "each";
                if( $("input:checkbox[id='fbyfusn_inter_chr_chk']").is(":checked") == true ){
                    keyVal += ","+"inter_chr";
                }
                if( $("input:checkbox[id='fbyfusn_intra_chr_chk']").is(":checked") == true ){
                    keyVal += ","+"intra_chr";
                }
                $("#key_flt_by_fusn_type").val( keyVal );
                
                keyVal = "each";
                if( $("input:checkbox[id='fbySupot_chimrSeqS_chk']").is(":checked") == true ){
                    keyVal += ","+"chimrSeq";
                }
                if( $("input:checkbox[id='fbySupot_chimrKBS_chk']").is(":checked") == true ){
                    keyVal += ","+"chimrKb";
                }
                $("#key_flt_by_supted_info").val( keyVal );
    
    $("#resultmain_form").submit();
}
