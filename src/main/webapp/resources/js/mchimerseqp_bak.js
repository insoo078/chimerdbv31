/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var ChimerSeq = {
	name:'ChimerSeq',
	chimrSeqTcgaState:null,
	init: function(){
		this.chimrSeqTcgaState = false;

		// to express which menu user has choosed
		check_m_state("mmchimerseqbtn");
		$(".chimerkbsearchdiv").equalHeights();

		this.init_functions();
		this.setDefaultValues();
	},
	init_functions: function() {	
		this.setSearchPanelSetting();
		this.setOptionPanelSetting();
	},
	setSearchPanelSetting: function() {
		addAutocompleteField( "#by_gene_txt",		1);
		addAutocompleteField( "#by_gene_pair_txt",	2);
		addAutocompleteField( "#by_chr_locus_txt",	3);
		addAutocompleteField( "#by_disease_txt",	4);

		// If user choose one radio button, then other radios are disabled
		// and active filed is moving their text filed
		$("input[name='search_type_rdo']").change(function() {
			var value = $(this).val();
			var inputs = $("#search-Panel").find("input:text");
			inputs.each(function(){
				if( this.id === (value+"_txt") ){
					$(this).prop('disabled', false);
//					$("#" + (value+"_txt") ).focus();
				}else{
					$(this).prop('disabled', true);
//					$(this).val('');
				}
			});

			// When user click 'by_gene' option, 5' or 3' checkboxes are changing to clickable else un-clickable
			if( value==='by_gene' ) {
				$("div#search-Panel input[type=checkbox]").each(function(){
					$(this).prop("disabled", false);
					if( this.id === 'by_gene_chk_5' ) {
						$(this).prop("checked", true);
					}
				});
			}else {
				$("div#search-Panel input[type=checkbox]").each(function(){
					$(this).prop("checked", false);
					$(this).prop("disabled", true);
				});
			}
		});
		
		$(".form-control").focus(function() {
			clearText(this);
		});
	},
	setOptionPanelSetting: function() {
	
		$("#chimrSeq_1_chimr2_chk").change(function(){
			var flag = $(this).is(':checked');
			
			if( flag === false ) {
				$("#chimrSeq_1_all_chk").prop("checked", false);
			}
		});
		
		$("#chimrSeq_1_chitars_chk").change(function(){
			var flag = $(this).is(':checked');
			
			if( flag === false ) {
				$("#chimrSeq_1_all_chk").prop("checked", false);
			}
		});
		
		this.setTcgaInOptionPanel();
		this.setAllSourcesInOptionPanel();
	},
	setAllSourcesInOptionPanel: function() {
		$("#chimrSeq_1_all_chk").change(function(){
			var flag = $(this).is(':checked');

			$("#chimrSeq_1_tcga_chk").trigger('click');
			$("#chimrSeq_1_chimr2_chk").prop("checked", flag);
			$("#chimrSeq_1_chitars_chk").prop("checked", flag);
		});
	},
	setTcgaInOptionPanel: function() {
		$("#chimrSeq_1_tcga_chk").change(function(){
			var flag = $(this).is(':checked');

			$("div#fusion_prediction_tool_options input[type=checkbox]").each(function(){
				$(this).prop("checked", flag);
			});
			
			if( flag === false ) {
				$("#chimrSeq_1_all_chk").prop("checked", false);
//				$("#cancer_type_all").trigger('click');
			}
		});

		$("#cancer_type_all").click(function(){
			ChimerSeq.chimrSeqTcgaState = !ChimerSeq.chimrSeqTcgaState;
			$("#chimrSeq_1_cancertype_slt > option").prop("selected", ChimerSeq.chimrSeqTcgaState);
		});

		$("#chimrSeq_1_cancertype_slt > option.cancer-type").click(function(){
			if( ChimerSeq.chimrSeqTcgaState ) ChimerSeq.chimrSeqTcgaState = false;
		});
	},
	setDefaultValues: function() {
		// The default value of Search panel is 'by_gene' and '5''
		$("#search_type_rdo1").prop("checked", true).change();
		$("#by_gene_chk_5").prop("checked", true);
	}
};

function addAutocompleteField( selector, type ) {
	$(selector).autocomplete({
		source: function(request, response) {
			$.ajax({
				type: 'post',
				url: 'autocomplete.cdb',
				dataType: 'json',
				data:{service:'ChimerSeq', type:type, text:request.term},
				success:function(data) {
					response($.map(data, function(item){
						return {
							label: item,
							value: item
						};
					}));
				}
			});
		},
		minLength:2
	});
}

$(document).ready(function () {
	// to express which menu user has choosed
//	check_m_state("mmchimerseqbtn");

	ChimerSeq.init();

//	init_variable_values();

//	$(".chimerkbsearchdiv").equalHeights();
    
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

function submit() {
	$("#resultmain_form").submit();
}

//
//
//
//
//
//
//var chimrSeqTcgaState;
//var chimrSeqCancerTypeState;
//var chimrSeqCancerTypeState2;
//
//function init_variable_values(){
//    chimrSeqTcgaState = false;
//    chimrSeqCancerTypeState = true;
//    chimrSeqCancerTypeState2 = true;
//    //chimrSeq_1_cancer_type_toggle();
//    chimrSeq_1_cancer_type_toggle2();
//}

//-----------

//function chimrSeq_1_tcga_toggle(){
//    $("#chimrSeq_1_fusnscan_chk").prop("checked",function(){ return chimrSeqTcgaState; });
//    $("#chimrSeq_1_tophat_chk").prop("checked",function(){ return chimrSeqTcgaState; });
//    $("#chimrSeq_1_prada_chk").prop("checked",function(){ return chimrSeqTcgaState; });
////    if(chimrSeqTcgaState){
////        if(  $("#chimrSeq_1_num_of_seed_reads").is(":disabled") == false ){
////            $("#chimrSeq_1_num_of_seed_reads").prop("disabled",true);
////        }
////        if(  $("#chimrSeq_1_num_of_s_pairs").is(":disabled") == false ){
////            $("#chimrSeq_1_num_of_s_pairs").prop("disabled",true);
////        }
////        if(  $("#chimrSeq_1_num_of_junc_reads").is(":disabled") == false ){
////            $("#chimrSeq_1_num_of_junc_reads").prop("disabled",true);
////        }
////    }else{
////        if(  $("#chimrSeq_1_num_of_seed_reads").is(":disabled") == true ){
////            $("#chimrSeq_1_num_of_seed_reads").prop("disabled",false);
////        }
////        if(  $("#chimrSeq_1_num_of_s_pairs").is(":disabled") == true ){
////            $("#chimrSeq_1_num_of_s_pairs").prop("disabled",false);
////        }
////        if(  $("#chimrSeq_1_num_of_junc_reads").is(":disabled") == true ){
////            $("#chimrSeq_1_num_of_junc_reads").prop("disabled",false);
////        }
////    }
//    chimrSeqTcgaState = !chimrSeqTcgaState;
//}


//function chimrSeq_1_cancer_type_toggle(){
//    $("#chimrSeq_1_cancertype_slt > option").prop("selected",function(){
//        return chimrSeqCancerTypeState;
//    });
//    $("#chimrSeq_1_cancertype_slt").attr("disabled",function(){
//        return chimrSeqCancerTypeState;
//    });
//    chimrSeqCancerTypeState = !chimrSeqCancerTypeState;
//}
//
//function chimrSeq_1_cancer_type_toggle2(){
//    $("#chimrSeq_1_cancertype_slt > option").prop("selected",function(){
//        return chimrSeqCancerTypeState;
//    });
//    chimrSeqCancerTypeState = !chimrSeqCancerTypeState;
//}

//function chimerSeq_all_source_toggle(){
//    if( $("input:checkbox[id='chimrSeq_1_all_chk']").is(":checked") == true ){
//        if( $("input:checkbox[id='chimrSeq_1_tcga_chk']").is(":checked") == false ){
//            $("#chimrSeq_1_tcga_chk").prop("checked",true);
//            chimrSeq_1_tcga_toggle();
//            chimrSeq_1_cancer_type_toggle2();
//        }
//        
//        if( $("input:checkbox[id='chimrSeq_1_chimr2_chk']").is(":checked") == false ){
//            $("#chimrSeq_1_chimr2_chk").prop("checked",function(){ return true; });
//        }
//        if( $("input:checkbox[id='chimrSeq_1_chitars_chk']").is(":checked") == false ){
//            $("#chimrSeq_1_chitars_chk").prop("checked",function(){ return true; });
//        }
//    }else{
//        if( $("input:checkbox[id='chimrSeq_1_tcga_chk']").is(":checked") == true ){
//            $("#chimrSeq_1_tcga_chk").prop("checked",false);
//            chimrSeq_1_tcga_toggle();
//            chimrSeq_1_cancer_type_toggle2();
//        }
//        
//        if( $("input:checkbox[id='chimrSeq_1_chimr2_chk']").is(":checked") == true ){
//            $("#chimrSeq_1_chimr2_chk").prop("checked",function(){ return false; });
//        }
//        if( $("input:checkbox[id='chimrSeq_1_chitars_chk']").is(":checked") == true ){
//            $("#chimrSeq_1_chitars_chk").prop("checked",function(){ return false; });
//        }
//    }
//}
//
//
//
//
//
////-----------
//
//
//
//
function searchPanel(searchType) {
	var keyVal = "";

	switch(searchType){
		case "by_gene":{
			keyVal = $("#by_gene_txt").val();
			if( (keyVal === "") || ($.trim(keyVal) === "") || (keyVal === null) ){
				alert("You have to input Gene symbol which is user interested in");
				$("#by_gene_txt").focus();
				return false;
			}else{
				if( $("input:checkbox[id='by_gene_chk_5']").is(":checked") === true ){
					keyVal += ","+"5";
				}
				if( $("input:checkbox[id='by_gene_chk_3']").is(":checked") === true ){
					keyVal += ","+"3";
				}
				$("#key_data_for_search_type").val( keyVal );
			}
		};break;
		case "by_gene_pair":{
			keyVal = $("#by_gene_pair_txt").val();

			if( (keyVal === "") || ($.trim(keyVal) === "") || (keyVal === null) ){
				alert("You have to input Pair Gene symbols which is user interested in");
				$("#by_gene_pair_txt").focus();
				return false;
			}else{
				$("#key_data_for_search_type").val( keyVal );
			}
		};break;
		case "by_chr_locus":{
			keyVal = $("#by_chr_locus_txt").val();
			if( (keyVal === "") || ($.trim(keyVal) === "") || (keyVal === null) ){
				alert("You have to input chromosome locus(cytoband) which is user interested in");
				$("#by_chr_locus_txt").focus();
				return false;
			}else{
				$("#key_data_for_search_type").val( keyVal );
			}
		};break;
		case "by_disease":{
			keyVal = $("#by_disease_txt").val();
			if( (keyVal === "") || ($.trim(keyVal) === "") || (keyVal === null) ){
				alert("You have to input disease which is user interested in");
				$("#by_disease_txt").focus();
				return false;
			}else{
				$("#key_data_for_search_type").val( keyVal );
			}
		};break;
	}
	return true;
}


//
//function optionPanel() {
//	var keyVal = "each";
//	if( $("input:checkbox[id='chimrSeq_1_tcga_chk']").is(":checked") === true ){
//		keyVal += ","+"tcga";
//	}
//	if( $("input:checkbox[id='chimrSeq_1_chimr2_chk']").is(":checked") === true ){
//		keyVal += ","+"chimr2";
//	}
//	if( $("input:checkbox[id='chimrSeq_1_chitars_chk']").is(":checked") === true ){
//		keyVal += ","+"chitars";
//	}
//
//	$("#key_selt_the_websource").val( keyVal );
//
//	keyVal = $("#chimrSeq_1_cancertype_slt").val().toString();
//	$("#key_seq_cancer_type").val( keyVal );
//	
//	keyVal = "each";
//	if( $("input:checkbox[id='chimrSeq_1_fusnscan_chk']").is(":checked") == true ){
//		keyVal += ","+"fusnscan";
//		$("#key_seq_num_of_seed_reads").val( $("#chimrSeq_1_num_of_seed_reads").val() );
//	}
//	if( $("input:checkbox[id='chimrSeq_1_tophat_chk']").is(":checked") == true ){
//		keyVal += ","+"tophat";
//		$("#key_seq_num_of_s_pairs").val( $("#chimrSeq_1_num_of_s_pairs").val() );
//	}
//	if( $("input:checkbox[id='chimrSeq_1_prada_chk']").is(":checked") == true ){
//		keyVal += ","+"prada";
//		$("#key_seq_num_of_junc_reads").val( $("#chimrSeq_1_num_of_junc_reads").val() );
//	}
//
//	$("#key_seq_selt_the_source").val( keyVal );
//
//	
//	return true;
//}
//
//function searching(){
//	var chkData = true;
//
//	var searchType = $("input:radio[name='search_type_rdo']:checked").val();
//
//	$("#key_a_search_type").val( searchType );
//	if( searchPanel( searchType ) ) {
//		if( optionPanel() ) {
//			
//		}
//	}
//
////	keyVal = "";
////	if( $("input:checkbox[id='chimrSeq_1_all_chk']").is(":checked") == true ){
////		keyVal = "all";
////	}else{
////		keyVal = "each";
////		if( $("input:checkbox[id='chimrSeq_1_tcga_chk']").is(":checked") == true ){
////			keyVal += ","+"tcga";
////		}
////		if( $("input:checkbox[id='chimrSeq_1_chimr2_chk']").is(":checked") == true ){
////			keyVal += ","+"chimr2";
////		}
////		if( $("input:checkbox[id='chimrSeq_1_chitars_chk']").is(":checked") == true ){
////			keyVal += ","+"chitars";
////		}
////	}
////	$("#key_selt_the_websource").val( keyVal );
////
////	keyVal = "";
////	if( chimrSeqCancerTypeState ){
////		keyVal = "all";
////	}else{
////		keyVal = $("#chimrSeq_1_cancertype_slt").val().toString();
////	}
////	$("#key_seq_cancer_type").val( keyVal );
////
////
////
////	////
////	keyVal = "";
////	if( false ){
////		keyVal = "all";
////	}else{
////		keyVal = "each";
////		if( $("input:checkbox[id='chimrSeq_1_fusnscan_chk']").is(":checked") == true ){
////			keyVal += ","+"fusnscan";
////			$("#key_seq_num_of_seed_reads").val( $("#chimrSeq_1_num_of_seed_reads").val() );
////		}
////		if( $("input:checkbox[id='chimrSeq_1_tophat_chk']").is(":checked") == true ){
////			keyVal += ","+"tophat";
////			$("#key_seq_num_of_s_pairs").val( $("#chimrSeq_1_num_of_s_pairs").val() );
////		}
////		if( $("input:checkbox[id='chimrSeq_1_prada_chk']").is(":checked") == true ){
////			keyVal += ","+"prada";
////			$("#key_seq_num_of_junc_reads").val( $("#chimrSeq_1_num_of_junc_reads").val() );
////		}
////	}
////	$("#key_seq_selt_the_source").val( keyVal );
////
////
////
//////                keyVal = "each_0";
//////                var numInput = $("#chimrSeq_1_num_of_seed_reads").val();
//////                if( $.isNumeric(numInput) ){
//////                    keyVal += ",num_of_seed_reads/" + numInput.toString();
//////                }else{
////////                    $("#chimerdb_empty_data").modal("show");
////////                    return;
//////                }
//////                numInput = $("#chimrSeq_1_num_of_s_pairs").val();
//////                if( $.isNumeric(numInput) ){
//////                    keyVal += ",num_of_s_pairs/" + numInput.toString();
//////                }else{
////////                    $("#chimerdb_empty_data").modal("show");
////////                    return;
//////                }
//////                numInput = $("#chimrSeq_1_num_of_junc_reads").val();
//////                if( $.isNumeric(numInput) ){
//////                    keyVal += ",num_of_junc_reads/" + numInput.toString();
//////                }else{
////////                    $("#chimerdb_empty_data").modal("show");
////////                    return;
//////                }
//////                $("#key_seq_val_of_number").val( keyVal );
////
////
////
////	//filter//////////////////////////////////////////////////////////////////////////////////
////	keyVal = "each";
////	if( false ){
////		keyVal = "none";
////	}else{
////		if( $("input:checkbox[id='chimrKb_fbyfunc_kinase_chk']").is(":checked") == true ){
////			keyVal += ","+"kinase";
////		}
////		if( $("input:checkbox[id='chimrKb_fbyfunc_onco_chk']").is(":checked") == true ){
////			keyVal += ","+"onco";
////		}
////		if( $("input:checkbox[id='chimrKb_fbyfunc_tumor_chk']").is(":checked") == true ){
////			keyVal += ","+"tumor";
////		}
////		if( $("input:checkbox[id='chimrKb_fbyfunc_recpt_chk']").is(":checked") == true ){
////			keyVal += ","+"recpt";
////		}
////		if( $("input:checkbox[id='chimrKb_fbyfunc_transcript_chk']").is(":checked") == true ){
////			keyVal += ","+"transcript";
////		}
////	}
////	$("#key_flt_by_func").val( keyVal );
////
////	keyVal = "each";
////	if( false ){
////		keyVal = "all";
////	}else{
////		if( $("input:checkbox[id='chimrKb_fbyfusn_inter_chr_chk']").is(":checked") == true ){
////			keyVal += ","+"inter_chr";
////		}
////		if( $("input:checkbox[id='chimrKb_fbyfusn_intra_chr_chk']").is(":checked") == true ){
////			keyVal += ","+"intra_chr";
////		}
////	}
////	$("#key_flt_by_fusn_type").val( keyVal );
////
////	keyVal = "each";
////	if( false ){
////		keyVal = "none";
////	}else{
////		if( $("input:checkbox[id='chimrKb_fbySupot_chimrKBS_chk']").is(":checked") == true ){
////			keyVal += ","+"chimrKB";
////		}
////		if( $("input:checkbox[id='chimrKb_fbySupot_chimrPubS_chk']").is(":checked") == true ){
////			keyVal += ","+"chimrPub";
////		}
////	}
////	$("#key_flt_by_supted_info").val( keyVal );
////
////
////	$("#resultmain_form").submit();
//}
