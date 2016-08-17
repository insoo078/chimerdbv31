/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var sletd_tab;
$(document).ready(function () {
    check_m_state("mmchimerkbbtn");
    init_variable_values();
    
});


function init_variable_values(){
    
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
