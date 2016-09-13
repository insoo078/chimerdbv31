/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var sletd_tab;
$(document).ready(function () {
    check_m_state("mmchimerkbbtn");
    $(".chimerkbsearchdiv").equalHeights();
    
    $("#by_disease_txt").autocomplete({
        minLength:2,
        source: "chimerkbdiseaselst.cdb"
//        select: function(event,ui){
//            ui.item ? "Selected: " + ui.item.value + " aka " + ui.item.id : "Nothing selected, input was " + this.value ;
//        }
    });
    
});


//
function checkbtnofradio(type){
    switch(type){
        case "by_gene":{
                $("#search_type_gene_rdo").prop("checked",true);
        };break;
        case "by_gene_pair":{
                $("#search_type_gp_rdo").prop("checked",true);
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





function chimerkb_breaktype_toggle(type){
    var flag = $("input:checkbox[id='chimrKb_2_na_chk']").is(":checked");
    switch(type){
        case "genomic":{
            if(flag){
                $("#chimrKb_2_na_chk").prop("checked",function(){ return false; });
            }
        };break;
        case "exon":{
            if(flag){
                $("#chimrKb_2_na_chk").prop("checked",function(){ return false; });
            }
        };break;
        case "no":{
            if(flag){
                $("#chimrKb_2_genomic_chk").prop("checked",function(){ return false; });
                $("#chimrKb_2_exon_chk").prop("checked",function(){ return false; });
            }
        };break;
    }
}


function chimerkb_no_breakpoint_toggle(){
    if( $("input:checkbox[id='chimrKb_2_na_chk']").is(":checked") == true ){
        if( $("input:checkbox[id='chimrKb_2_genomic_chk']").is(":checked") == true ){
            $("#chimrKb_2_genomic_chk").prop("checked",function(){ return false; });
        }
        if( $("input:checkbox[id='chimrKb_2_exon_chk']").is(":checked") == true ){
            $("#chimrKb_2_exon_chk").prop("checked",function(){ return false; });
        }
    }
}

function chimerkb_validatnmtd_toggle(type){
    var flag = $("input:checkbox[id='chimrKb_3_none_chk']").is(":checked");
    switch(type){
        case "fish":{
            if(flag){
                $("#chimrKb_3_none_chk").prop("checked",function(){ return false; });
            }
        };break;
        case "sanger":{
            if(flag){
                $("#chimrKb_3_none_chk").prop("checked",function(){ return false; });
            }
        };break;
        case "pcr":{
            if(flag){
                $("#chimrKb_3_none_chk").prop("checked",function(){ return false; });
            }
        };break;
        case "no":{
            if(flag){
                $("#chimrKb_3_fish_chk").prop("checked",function(){ return false; });
                $("#chimrKb_3_sanger_chk").prop("checked",function(){ return false; });
                $("#chimrKb_3_rtpcr_chk").prop("checked",function(){ return false; });
            }
        };break;
    }
}

function chimerkb_no_evidence_toggle(){
    if( $("input:checkbox[id='chimrKb_3_none_chk']").is(":checked") == true ){
        if( $("input:checkbox[id='chimrKb_3_fish_chk']").is(":checked") == true ){
            $("#chimrKb_3_fish_chk").prop("checked",function(){ return false; });
        }
        if( $("input:checkbox[id='chimrKb_3_sanger_chk']").is(":checked") == true ){
            $("#chimrKb_3_sanger_chk").prop("checked",function(){ return false; });
        }
        if( $("input:checkbox[id='chimrKb_3_rtpcr_chk']").is(":checked") == true ){
            $("#chimrKb_3_rtpcr_chk").prop("checked",function(){ return false; });
        }
    }
}


function resetall(){
    if( $("input:radio[id='search_type_gene_rdo']").is(":checked") == false ){ $("#search_type_gene_rdo").prop("checked",true); }
    $("#by_disease_txt").val("");
    $('input:checkbox').each(function(){
        var chkObjId = $(this).attr("id");
        if( chkObjId == "by_gene_chk_3" ){
            if( $("input:checkbox[id='"+chkObjId+"']").is(":checked") == false ){ $("#"+chkObjId).prop("checked",true); }
        }else if( chkObjId == "chimrKb_1_litratr_chk" ){
            if( $("input:checkbox[id='"+chkObjId+"']").is(":checked") == false ){ $("#"+chkObjId).prop("checked",true); }
        }else if( chkObjId == "chimrKb_1_cosmic_chk" ){
            if( $("input:checkbox[id='"+chkObjId+"']").is(":checked") == false ){ $("#"+chkObjId).prop("checked",true); }
        }else if( chkObjId == "chimrKb_1_mrna_chk" ){
            if( $("input:checkbox[id='"+chkObjId+"']").is(":checked") == false ){ $("#"+chkObjId).prop("checked",true); }
        }else if( chkObjId == "chimrKb_1_etc_chk" ){
            if( $("input:checkbox[id='"+chkObjId+"']").is(":checked") == false ){ $("#"+chkObjId).prop("checked",true); }
        }else if( chkObjId == "chimrKb_2_genomic_chk" ){
            if( $("input:checkbox[id='"+chkObjId+"']").is(":checked") == false ){ $("#"+chkObjId).prop("checked",true); }
        }else if( chkObjId == "chimrKb_2_exon_chk" ){
            if( $("input:checkbox[id='"+chkObjId+"']").is(":checked") == false ){ $("#"+chkObjId).prop("checked",true); }
        }else if( chkObjId == "chimrKb_2_na_chk" ){
            if( $("input:checkbox[id='"+chkObjId+"']").is(":checked") == false ){ $("#"+chkObjId).prop("checked",true); }
        }else if( chkObjId == "chimrKb_3_fish_chk" ){
            if( $("input:checkbox[id='"+chkObjId+"']").is(":checked") == false ){ $("#"+chkObjId).prop("checked",true); }
        }else if( chkObjId == "chimrKb_3_sanger_chk" ){
            if( $("input:checkbox[id='"+chkObjId+"']").is(":checked") == false ){ $("#"+chkObjId).prop("checked",true); }
        }else if( chkObjId == "chimrKb_3_rtpcr_chk" ){
            if( $("input:checkbox[id='"+chkObjId+"']").is(":checked") == false ){ $("#"+chkObjId).prop("checked",true); }
        }else if( chkObjId == "chimrKb_3_none_chk" ){
            if( $("input:checkbox[id='"+chkObjId+"']").is(":checked") == false ){ $("#"+chkObjId).prop("checked",true); }
        }else{
            if(this.checked){
                this.checked = false;
            }
        }
    });
}





//-----------



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
                                    var gene5flag = $("input:checkbox[id='by_gene_chk_5']").is(":checked");
                                    var gene3flag = $("input:checkbox[id='by_gene_chk_3']").is(":checked");
                                    if( (gene5flag == false) && (gene3flag == false) ){
                                        //$("#by_gene_chk_5").prop("checked",true);
                                        //$("#by_gene_chk_3").prop("checked",true);
                                        gene5flag = true;
                                        gene3flag = true;
                                    }
                                    
                                    if( gene5flag == true ){
                                        keyVal += ","+"5";
                                    }
                                    if( gene3flag == true ){
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
                
                keyVal = "";
                if( false ){
                    keyVal = "all";
                }else{
                    keyVal = "each";
                    if( $("input:checkbox[id='chimrKb_1_litratr_chk']").is(":checked") == true ){
                        keyVal += ","+"litratr";
                    }
                    if( $("input:checkbox[id='chimrKb_1_cosmic_chk']").is(":checked") == true ){
                        keyVal += ","+"cosmic";
                    }
                    if( $("input:checkbox[id='chimrKb_1_mrna_chk']").is(":checked") == true ){
                        keyVal += ","+"mrna";
                    }
                    if( $("input:checkbox[id='chimrKb_1_etc_chk']").is(":checked") == true ){
                        keyVal += ","+"etc";
                    }
                }
                $("#key_selt_the_websource").val( keyVal );
                
                keyVal = "";
                if( $("input:checkbox[id='chimrKb_2_na_chk']").is(":checked") == true ){
                    keyVal = "none";
                }else{
                    keyVal = "each";
                    if( $("input:checkbox[id='chimrKb_2_genomic_chk']").is(":checked") == true ){
                        keyVal += ","+"genomic";
                    }
                    if( $("input:checkbox[id='chimrKb_2_exon_chk']").is(":checked") == true ){
                        keyVal += ","+"exon";
                    }
                    
                    
                }
                $("#key_kb_selt_the_breakpoint").val( keyVal );
                
                keyVal = "";
                if( $("input:checkbox[id='chimrKb_3_none_chk']").is(":checked") == true ){
                    keyVal = "none";
                }else{
                    keyVal = "each";
                    if( $("input:checkbox[id='chimrKb_3_sanger_chk']").is(":checked") == true ){
                        keyVal += ","+"sanger";
                    }
                    if( $("input:checkbox[id='chimrKb_3_fish_chk']").is(":checked") == true ){
                        keyVal += ","+"fish";
                    }
                    if( $("input:checkbox[id='chimrKb_3_rtpcr_chk']").is(":checked") == true ){
                        keyVal += ","+"rtpcr";
                    }
                }
                $("#key_kb_selt_the_validtn_mtd").val( keyVal );
                //filter//////////////////////////////////////////////////////////////////////////////////
                keyVal = "each";
                if( false ){
                    keyVal = "none";
                }else{
                    if( $("input:checkbox[id='chimrKb_fbyfunc_kinase_chk']").is(":checked") == true ){
                        keyVal += ","+"kinase";
                    }
                    if( $("input:checkbox[id='chimrKb_fbyfunc_onco_chk']").is(":checked") == true ){
                        keyVal += ","+"onco";
                    }
                    if( $("input:checkbox[id='chimrKb_fbyfunc_tumor_chk']").is(":checked") == true ){
                        keyVal += ","+"tumor";
                    }
                    if( $("input:checkbox[id='chimrKb_fbyfunc_recpt_chk']").is(":checked") == true ){
                        keyVal += ","+"recpt";
                    }
                    if( $("input:checkbox[id='chimrKb_fbyfunc_transcript_chk']").is(":checked") == true ){
                        keyVal += ","+"transcript";
                    }
                }
                $("#key_flt_by_func").val( keyVal );
                
                keyVal = "each";
                if( false ){
                    keyVal = "all";
                }else{
                    if( $("input:checkbox[id='chimrKb_fbyfusn_inter_chr_chk']").is(":checked") == true ){
                        keyVal += ","+"inter_chr";
                    }
                    if( $("input:checkbox[id='chimrKb_fbyfusn_intra_chr_chk']").is(":checked") == true ){
                        keyVal += ","+"intra_chr";
                    }
                }
                $("#key_flt_by_fusn_type").val( keyVal );
                
                keyVal = "each";
                if( false ){
                    keyVal = "none";
                }else{
                    if( $("input:checkbox[id='chimrKb_fbySupot_chimrSeqS_chk']").is(":checked") == true ){
                        keyVal += ","+"chimrSeq";
                    }
                    if( $("input:checkbox[id='chimrKb_fbySupot_chimrPubS_chk']").is(":checked") == true ){
                        keyVal += ","+"chimrPub";
                    }
                }
                $("#key_flt_by_supted_info").val( keyVal );
    
    
    $("#resultmain_form").submit();
}
