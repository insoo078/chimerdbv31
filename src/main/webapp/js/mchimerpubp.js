/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var sletd_tab;
$(document).ready(function () {
    check_m_state("mmchimerpubbtn");
    init_variable_values();
    sletd_tab = $("#main_tabs .active .main_tabs_span").text();
    
    
    $("#chimrKb_fbySupot_chimrKBS_chk").hide();
    $("#chimrKb_fbySupot_chimrKBS_lvl").hide();
//    var availableTags = ["ActionScript","AppleScript","Asp","BASIC","C","C++"];
//    var gene_exmp = ["TMPRSS2","TMPRSS2_ERG"];
//    $("#gene_symbol").autocomplete({
//        source: gene_exmp
//    });
    
    
    
    //// Fusion Prediction Tool ///////////////////////////////////////////////////////////////
//    $("#chimrSeq_1_fusnscan_chk").bind("click",function(){
//        if( $(this).is(":checked") ){
//            
//            if( $("#chimrSeq_1_tophat_chk").is(":checked") ){
//                if(  $("#chimrSeq_1_num_of_s_pairs").is(":disabled") == false ){
//                    $("#chimrSeq_1_num_of_s_pairs").prop("disabled",true);
//                }
//            }else{
//                if( $("#chimrSeq_1_prada_chk").is(":checked") ){
//                    if(  $("#chimrSeq_1_num_of_junc_reads").is(":disabled") == false ){
//                        $("#chimrSeq_1_num_of_junc_reads").prop("disabled",true);
//                    }
//                }else{
//                    if(  $("#chimrSeq_1_num_of_s_pairs").is(":disabled") == false ){
//                        $("#chimrSeq_1_num_of_s_pairs").prop("disabled",true);
//                    }
//                    if(  $("#chimrSeq_1_num_of_junc_reads").is(":disabled") == false ){
//                        $("#chimrSeq_1_num_of_junc_reads").prop("disabled",true);
//                    }
//                }
//            }
//
//        }else{
//            
//            if( $("#chimrSeq_1_tophat_chk").is(":checked") ){
//                if( ! $("#chimrSeq_1_prada_chk").is(":checked") ){
//                    if(  $("#chimrSeq_1_num_of_s_pairs").is(":disabled") == true ){
//                        $("#chimrSeq_1_num_of_s_pairs").prop("disabled",false);
//                    }
//                }
//            }else{
//                
//                if( $("#chimrSeq_1_prada_chk").is(":checked") ){
//                    if(  $("#chimrSeq_1_num_of_junc_reads").is(":disabled") == true ){
//                        $("#chimrSeq_1_num_of_junc_reads").prop("disabled",false);
//                    }
//                }else{
//                    if(  $("#chimrSeq_1_num_of_s_pairs").is(":disabled") == true ){
//                        $("#chimrSeq_1_num_of_s_pairs").prop("disabled",false);
//                    }
//                    if(  $("#chimrSeq_1_num_of_junc_reads").is(":disabled") == true ){
//                        $("#chimrSeq_1_num_of_junc_reads").prop("disabled",false);
//                    }
//                }
//            }
//        }
//    });
//    
//    
//    $("#chimrSeq_1_tophat_chk").bind("click",function(){
//        if( $(this).is(":checked") ){
//            
//            if( $("#chimrSeq_1_fusnscan_chk").is(":checked") ){
//                if(  $("#chimrSeq_1_num_of_seed_reads").is(":disabled") == false ){
//                    $("#chimrSeq_1_num_of_seed_reads").prop("disabled",true);
//                }
//            }else{
//                if( $("#chimrSeq_1_prada_chk").is(":checked") ){
//                    if(  $("#chimrSeq_1_num_of_junc_reads").is(":disabled") == false ){
//                        $("#chimrSeq_1_num_of_junc_reads").prop("disabled",true);
//                    }
//                }else{
//                    if(  $("#chimrSeq_1_num_of_seed_reads").is(":disabled") == false ){
//                        $("#chimrSeq_1_num_of_seed_reads").prop("disabled",true);
//                    }
//                    if(  $("#chimrSeq_1_num_of_junc_reads").is(":disabled") == false ){
//                        $("#chimrSeq_1_num_of_junc_reads").prop("disabled",true);
//                    }
//                }
//            }
//            
//        }else{
//            
//            if(  $("#chimrSeq_1_fusnscan_chk").is(":checked")  ){
//                if( ! $("#chimrSeq_1_prada_chk").is(":checked") ){
//                    if(  $("#chimrSeq_1_num_of_seed_reads").is(":disabled") == true ){
//                        $("#chimrSeq_1_num_of_seed_reads").prop("disabled",false);
//                    }
//                }
//            }else{
//                if( $("#chimrSeq_1_prada_chk").is(":checked") ){
//                    if(  $("#chimrSeq_1_num_of_junc_reads").is(":disabled") == true ){
//                        $("#chimrSeq_1_num_of_junc_reads").prop("disabled",false);
//                    }
//                }else{
//                    if(  $("#chimrSeq_1_num_of_seed_reads").is(":disabled") == true ){
//                        $("#chimrSeq_1_num_of_seed_reads").prop("disabled",false);
//                    }
//                    if(  $("#chimrSeq_1_num_of_junc_reads").is(":disabled") == true ){
//                        $("#chimrSeq_1_num_of_junc_reads").prop("disabled",false);
//                    }
//                }
//                
//            }
//        }
//    });
//    
//    $("#chimrSeq_1_prada_chk").bind("click",function(){
//        if( $(this).is(":checked") ){
//            
//            if( $("#chimrSeq_1_fusnscan_chk").is(":checked") ){
//                
//                if( ! $("#chimrSeq_1_tophat_chk").is(":checked") ){
//                    if(  $("#chimrSeq_1_num_of_seed_reads").is(":disabled") == false ){
//                        $("#chimrSeq_1_num_of_seed_reads").prop("disabled",true);
//                    }
//                }
//                
//                
//            }else{
//                if( $("#chimrSeq_1_tophat_chk").is(":checked") ){
//                    if(  $("#chimrSeq_1_num_of_s_pairs").is(":disabled") == false ){
//                        $("#chimrSeq_1_num_of_s_pairs").prop("disabled",true);
//                    }
//                }else{
//                    if(  $("#chimrSeq_1_num_of_seed_reads").is(":disabled") == false ){
//                        $("#chimrSeq_1_num_of_seed_reads").prop("disabled",true);
//                    }
//                    if(  $("#chimrSeq_1_num_of_s_pairs").is(":disabled") == false ){
//                        $("#chimrSeq_1_num_of_s_pairs").prop("disabled",true);
//                    }
//                }
//            }
//            
//        }else{
//            
//            if( $("#chimrSeq_1_fusnscan_chk").is(":checked") ){
//                if( ! $("#chimrSeq_1_tophat_chk").is(":checked") ){
//                    if(  $("#chimrSeq_1_num_of_seed_reads").is(":disabled") == true ){
//                        $("#chimrSeq_1_num_of_seed_reads").prop("disabled",false);
//                    }
//                }
//                
//            }else{
//                if( $("#chimrSeq_1_tophat_chk").is(":checked") ){
//                    if(  $("#chimrSeq_1_num_of_s_pairs").is(":disabled") == true ){
//                        $("#chimrSeq_1_num_of_s_pairs").prop("disabled",false);
//                    }
//                }else{
//                    if(  $("#chimrSeq_1_num_of_seed_reads").is(":disabled") == true ){
//                        $("#chimrSeq_1_num_of_seed_reads").prop("disabled",false);
//                    }
//                    if(  $("#chimrSeq_1_num_of_s_pairs").is(":disabled") == true ){
//                        $("#chimrSeq_1_num_of_s_pairs").prop("disabled",false);
//                    }
//                }
//            }
//            
//            
//        }
//    });
    //// Fusion Prediction Tool ///////////////////////////////////////////////////////////////
    
    
    
});







var chimrSeqTcgaState;
var chimrSeqCancerTypeState;
var chimrSeqCancerTypeState2;

function init_variable_values(){
    chimrSeqTcgaState = false;
    chimrSeqCancerTypeState = true;
    chimrSeqCancerTypeState2 = true;
    //chimrSeq_1_cancer_type_toggle();
    chimrSeq_1_cancer_type_toggle2();
}

//-----------

function tabChg(obj){
    
    
    sletd_tab = $(obj).children().first().text();

    //console.log("tab = "+sletd_tab);

    switch(sletd_tab){
        case "ChimerKB":{
                if(  $("#main_filter_tbl").is(":visible") == false ){
                    $("#main_filter_tbl").show();
                }
                if(  $("#chimrKb_fbySupot_chimrKBS_chk").is(":visible") == true ){
                    $("#chimrKb_fbySupot_chimrKBS_chk").hide();
                }
                if(  $("#chimrKb_fbySupot_chimrSeqS_chk").is(":visible") == false ){
                    $("#chimrKb_fbySupot_chimrSeqS_chk").show();
                }
                if(  $("#chimrKb_fbySupot_chimrKBS_lvl").is(":visible") == true ){
                    $("#chimrKb_fbySupot_chimrKBS_lvl").hide();
                }
                if(  $("#chimrKb_fbySupot_chimrSeqS_lvl").is(":visible") == false ){
                    $("#chimrKb_fbySupot_chimrSeqS_lvl").show();
                }
        };break;
        case "ChimerSeq":{
                if(  $("#main_filter_tbl").is(":visible") == false ){
                    $("#main_filter_tbl").show();
                }
                if(  $("#chimrKb_fbySupot_chimrKBS_chk").is(":visible") == false ){
                    $("#chimrKb_fbySupot_chimrKBS_chk").show();
                }
                if(  $("#chimrKb_fbySupot_chimrSeqS_chk").is(":visible") == true ){
                    $("#chimrKb_fbySupot_chimrSeqS_chk").hide();
                }
                
                if(  $("#chimrKb_fbySupot_chimrKBS_lvl").is(":visible") == false ){
                    $("#chimrKb_fbySupot_chimrKBS_lvl").show();
                }
                if(  $("#chimrKb_fbySupot_chimrSeqS_lvl").is(":visible") == true ){
                    $("#chimrKb_fbySupot_chimrSeqS_lvl").hide();
                }
        };break;
        case "ChimerPub":{
                if(  $("#main_filter_tbl").is(":visible") == true ){
                    $("#main_filter_tbl").hide();
                }
        };break;
    }
        
    
}



function chimrSeq_1_tcga_toggle(){
    $("#chimrSeq_1_fusnscan_chk").prop("checked",function(){ return chimrSeqTcgaState; });
    $("#chimrSeq_1_tophat_chk").prop("checked",function(){ return chimrSeqTcgaState; });
    $("#chimrSeq_1_prada_chk").prop("checked",function(){ return chimrSeqTcgaState; });
//    if(chimrSeqTcgaState){
//        if(  $("#chimrSeq_1_num_of_seed_reads").is(":disabled") == false ){
//            $("#chimrSeq_1_num_of_seed_reads").prop("disabled",true);
//        }
//        if(  $("#chimrSeq_1_num_of_s_pairs").is(":disabled") == false ){
//            $("#chimrSeq_1_num_of_s_pairs").prop("disabled",true);
//        }
//        if(  $("#chimrSeq_1_num_of_junc_reads").is(":disabled") == false ){
//            $("#chimrSeq_1_num_of_junc_reads").prop("disabled",true);
//        }
//    }else{
//        if(  $("#chimrSeq_1_num_of_seed_reads").is(":disabled") == true ){
//            $("#chimrSeq_1_num_of_seed_reads").prop("disabled",false);
//        }
//        if(  $("#chimrSeq_1_num_of_s_pairs").is(":disabled") == true ){
//            $("#chimrSeq_1_num_of_s_pairs").prop("disabled",false);
//        }
//        if(  $("#chimrSeq_1_num_of_junc_reads").is(":disabled") == true ){
//            $("#chimrSeq_1_num_of_junc_reads").prop("disabled",false);
//        }
//    }
    chimrSeqTcgaState = !chimrSeqTcgaState;
}


function chimrSeq_1_cancer_type_toggle(){
    $("#chimrSeq_1_cancertype_slt > option").prop("selected",function(){
        return chimrSeqCancerTypeState;
    });
    $("#chimrSeq_1_cancertype_slt").attr("disabled",function(){
        return chimrSeqCancerTypeState;
    });
    chimrSeqCancerTypeState = !chimrSeqCancerTypeState;
}
function chimrSeq_1_cancer_type_toggle2(){
    $("#chimrSeq_1_cancertype_slt > option").prop("selected",function(){
        return chimrSeqCancerTypeState;
    });
    chimrSeqCancerTypeState = !chimrSeqCancerTypeState;
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


function chimerSeq_all_source_toggle(){
    if( $("input:checkbox[id='chimrSeq_1_all_chk']").is(":checked") == true ){
        if( $("input:checkbox[id='chimrSeq_1_tcga_chk']").is(":checked") == false ){
            $("#chimrSeq_1_tcga_chk").prop("checked",true);
            chimrSeq_1_tcga_toggle();
            chimrSeq_1_cancer_type_toggle2();
        }
        
        if( $("input:checkbox[id='chimrSeq_1_chimr2_chk']").is(":checked") == false ){
            $("#chimrSeq_1_chimr2_chk").prop("checked",function(){ return true; });
        }
        if( $("input:checkbox[id='chimrSeq_1_chitars_chk']").is(":checked") == false ){
            $("#chimrSeq_1_chitars_chk").prop("checked",function(){ return true; });
        }
    }else{
        if( $("input:checkbox[id='chimrSeq_1_tcga_chk']").is(":checked") == true ){
            $("#chimrSeq_1_tcga_chk").prop("checked",false);
            chimrSeq_1_tcga_toggle();
            chimrSeq_1_cancer_type_toggle2();
        }
        
        if( $("input:checkbox[id='chimrSeq_1_chimr2_chk']").is(":checked") == true ){
            $("#chimrSeq_1_chimr2_chk").prop("checked",function(){ return false; });
        }
        if( $("input:checkbox[id='chimrSeq_1_chitars_chk']").is(":checked") == true ){
            $("#chimrSeq_1_chitars_chk").prop("checked",function(){ return false; });
        }
    }
}





//-----------



function searching(){
    var chkData = true;
    //sletd_tab = $("#main_tabs .active .main_tabs_span").text();
    
    //console.log(sletd_tab);
    $("#key_activated_tab").val(sletd_tab);
    
    switch(sletd_tab){
        case "ChimerKB":{
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
        };break;
        case "ChimerSeq":{
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
                if( $("input:checkbox[id='chimrSeq_1_all_chk']").is(":checked") == true ){
                    keyVal = "all";
                }else{
                    keyVal = "each";
                    if( $("input:checkbox[id='chimrSeq_1_tcga_chk']").is(":checked") == true ){
                        keyVal += ","+"tcga";
                    }
                    if( $("input:checkbox[id='chimrSeq_1_chimr2_chk']").is(":checked") == true ){
                        keyVal += ","+"chimr2";
                    }
                    if( $("input:checkbox[id='chimrSeq_1_chitars_chk']").is(":checked") == true ){
                        keyVal += ","+"chitars";
                    }
                }
                $("#key_selt_the_websource").val( keyVal );
                
                keyVal = "";
                if( chimrSeqCancerTypeState ){
                    keyVal = "all";
                }else{
                    keyVal = $("#chimrSeq_1_cancertype_slt").val().toString();
                }
                $("#key_seq_cancer_type").val( keyVal );
                
                
                
                ////
                keyVal = "";
                if( false ){
                    keyVal = "all";
                }else{
                    keyVal = "each";
                    if( $("input:checkbox[id='chimrSeq_1_fusnscan_chk']").is(":checked") == true ){
                        keyVal += ","+"fusnscan";
                        $("#key_seq_num_of_seed_reads").val( $("#chimrSeq_1_num_of_seed_reads").val() );
                    }
                    if( $("input:checkbox[id='chimrSeq_1_tophat_chk']").is(":checked") == true ){
                        keyVal += ","+"tophat";
                        $("#key_seq_num_of_s_pairs").val( $("#chimrSeq_1_num_of_s_pairs").val() );
                    }
                    if( $("input:checkbox[id='chimrSeq_1_prada_chk']").is(":checked") == true ){
                        keyVal += ","+"prada";
                        $("#key_seq_num_of_junc_reads").val( $("#chimrSeq_1_num_of_junc_reads").val() );
                    }
                }
                $("#key_seq_selt_the_source").val( keyVal );
                
                
                
//                keyVal = "each_0";
//                var numInput = $("#chimrSeq_1_num_of_seed_reads").val();
//                if( $.isNumeric(numInput) ){
//                    keyVal += ",num_of_seed_reads/" + numInput.toString();
//                }else{
////                    $("#chimerdb_empty_data").modal("show");
////                    return;
//                }
//                numInput = $("#chimrSeq_1_num_of_s_pairs").val();
//                if( $.isNumeric(numInput) ){
//                    keyVal += ",num_of_s_pairs/" + numInput.toString();
//                }else{
////                    $("#chimerdb_empty_data").modal("show");
////                    return;
//                }
//                numInput = $("#chimrSeq_1_num_of_junc_reads").val();
//                if( $.isNumeric(numInput) ){
//                    keyVal += ",num_of_junc_reads/" + numInput.toString();
//                }else{
////                    $("#chimerdb_empty_data").modal("show");
////                    return;
//                }
//                $("#key_seq_val_of_number").val( keyVal );
                
                
                
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
                    if( $("input:checkbox[id='chimrKb_fbySupot_chimrKBS_chk']").is(":checked") == true ){
                        keyVal += ","+"chimrKB";
                    }
                    if( $("input:checkbox[id='chimrKb_fbySupot_chimrPubS_chk']").is(":checked") == true ){
                        keyVal += ","+"chimrPub";
                    }
                }
                $("#key_flt_by_supted_info").val( keyVal );
        };break;
        case "ChimerPub":{
                
        };break;
    }
    
    $("#resultmain_form").submit();
}
