/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var sletd_tab;
$(document).ready(function () {
    check_m_state("mmchimerkbbtn");
    init_variable_values();
    $(".chimerkbsearchdiv").equalHeights();
    
    var autoCmplteData = ["Acute erythroleukemia (FAB type M6)",
        "Acute lymphoblastic leukemia/lymphoblastic lymphoma",
        "Acute megakaryoblastic leukemia (FAB type M7)",
        "Acute monoblastic leukemia (FAB type M5)",
        "Acute monoblastic leukemia with differentiation (FAB type M5b)",
        "Acute monoblastic leukemia without differentiation (FAB type M5a)",
        "Acute myeloblastic leukemia with maturation (FAB type M2)",
        "Acute myeloblastic leukemia with minimal differentiation (FAB type M0)",
        "Acute myeloblastic leukemia without maturation (FAB type M1)",
        "Acute myeloid leukemia, NOS",
        "Acute myelomonocytic leukemia (FAB type M4)",
        "Acute promyelocytic leukemia (FAB type M3)",
        "Acute undifferentiated leukemia",
        "Adenocarcinoma",
        "adenolymphoma_(Warthin_tumour)",
        "adenoma",
        "adenoma-nodule-goitre",
        "adnexal_tumour",
        "Alveolar rhabdomyosarcoma",
        "Alveolar soft part sarcoma",
        "alveolar_soft_part_sarcoma",
        "Anaplastic large cell lymphoma, systemic type",
        "Aneurysmal bone cyst",
        "Angioimmunoblastic T-cell lymphoma",
        "Askins_tumour",
        "Astrocytoma, grade III-IV",
        "Atypical chronic myeloid leukemia",
        "benign_melanocytic_nevus",
        "Bilineage or biphenotypic leukemia",
        "biphenotypic_sarcoma_with_myogenic_and_neural_differentiation",
        "B-prolymphocytic leukemia",
        "Breast Invasive Carcinoma",
        "Burkitt lymphoma/leukemia",
        "carcinoma",
        "chondrosarcoma",
        "Chronic lymphocytic leukemia",
        "Chronic myeloid leukemia, aberrant translocation",
        "Chronic myeloid leukemia, t(9;22)",
        "Chronic myelomonocytic leukemia",
        "chronic_thyroiditis",
        "Clear cell sarcoma",
        "congenital_(infantile)_fibrosarcoma",
        "dermatofibroma",
        "dermatofibrosarcoma_protuberans",
        "Desmoplastic small round cell tumor",
        "desmoplastic_small_round_cell_tumour",
        "Diffuse large B-cell lymphoma",
        "Endometrial stromal sarcoma",
        "endometrial_stromal_sarcoma",
        "epithelioid_sarcoma",
        "Ewing tumor/peripheral primitive neuroectodermal tumor",
        "Ewings_sarcoma-peripheral_primitive_neuroectodermal_tumour",
        "Extranodal marginal zone B-cell lymphoma",
        "Fibromyxoid sarcoma",
        "fibrosarcoma",
        "Follicular lymphoma",
        "glioma",
        "haemangioma",
        "haematopoietic_neoplasm",
        "Head and neck squamous cell carcinoma (HNSCC)",
        "hyalinizing_spindle_cell_tumour_with_giant_rosettes",
        "hyperplasia",
        "in_situ_neoplasm",
        "Infant MLL-Rearranged Acute Lymphoblastic Leukemia",
        "inflammatory_myofibroblastic_tumour",
        "leiomyoma",
        "leiomyosarcoma",
        "lipoblastoma",
        "lipoma",
        "liposarcoma",
        "Liposarcoma, myxoid/round cell",
        "Localized giant cell tumor of tendon sheath",
        "low_malignant_potential_(borderline)_tumour",
        "lymphoid_neoplasm",
        "malignant_ectomesenchymoma",
        "malignant_melanoma",
        "malignant_melanoma_of_soft_parts-clear_cell_sarcoma",
        "malignant_Warthin_tumour",
        "Mantle cell lymphoma",
        "Mature B-cell neoplasm, NOS",
        "Mature T- and NK-cell neoplasm, NOS",
        "meningioma",
        "mesothelioma",
        "midline_carcinoma",
        "Mucoepidermoid carcinoma",
        "Multiple myeloma",
        "Myelodysplastic syndrome, NOS",
        "Myelodysplastic/myeloproliferative disease, NOS",
        "myoepithelial_tumour",
        "myoepithelioma",
        "neuroblastoma",
        "Nodal marginal zone B-cell lymphoma",
        "non–clear cell renal carcinoma",
        "Nonneoplastic myeloid disorder/lesion",
        "other",
        "pericytoma",
        "Peripheral T-cell lymphoma, unspecified",
        "perivascular_epithelioid_cell_tumour_(PEComa)",
        "Plasma cell leukemia",
        "primitive_neuroectodermal_tumour-medulloblastoma",
        "Refractory anemia",
        "Refractory anemia with ringed sideroblasts",
        "rhabdoid_tumour",
        "rhabdomyosarcoma",
        "sarcoma",
        "sclerosing_epithelioid_fibrosarcoma",
        "small cell lung cancer",
        "small_round_cell_tumour",
        "Soft tissue tumor, special type",
        "solitary_fibrous_tumour",
        "Splenic marginal zone B-cell lymphoma",
        "Synovial sarcoma",
        "synovial_sarcoma",
        "T-prolymphocytic leukemia",
        "Vascular and perivascular tumor, special type"];
    
    $("#by_disease_txt").autocomplete({
        minLength:2,
        source: "chimerkbdiseaselst.cdb"
//        select: function(event,ui){
//            ui.item ? "Selected: " + ui.item.value + " aka " + ui.item.id : "Nothing selected, input was " + this.value ;
//        }
    });
    
});


function init_variable_values(){
    
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
    $('input:checkbox').each(function(){
     if(this.checked){
            this.checked = false;
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
