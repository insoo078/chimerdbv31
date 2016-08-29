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
		addAutocompleteField( "#byGeneTxt",		1);
		addAutocompleteField( "#byGenePairTxt",	2);
		addAutocompleteField( "#byChrLocusTxt",	3);
		addAutocompleteField( "#byDiseaseTxt",	4);

		// If user choose one radio button, then other radios are disabled
		// and active filed is moving their text filed
		$("input[name='searchType']").change(function() {
			var value = $(this).val();
			var inputs = $("#search-Panel").find("input:text");

			inputs.each(function(){
				if( this.id === (value+"Txt") ){
					$(this).prop('disabled', false);
//					$("#" + (value+"_txt") ).focus();
				}else{
					$(this).prop('disabled', true);
//					$(this).val('');
				}
			});

			// When user click 'by_gene' option, 5' or 3' checkboxes are changing to clickable else un-clickable
			if( value==='byGene' ) {
				$("div#search-Panel input[type=checkbox]").each(function(){
					$(this).prop("disabled", false);
					if( this.name === 'byGene5Prime' ) {
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
		$("#searchType1").prop("checked", true).change();
		$("#byGene5Prime").prop("checked", true);
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
});

function search() {
	var searchType = $("input:radio[name='search_type_rdo']:checked").val();

	if( checkInputPrams(searchType) ) {
		$("#resultmain_form").submit();
	}

	return false;
}

function checkInputPrams(searchType) {
	var keyVal = "";
	
	console.log( searchType );

	switch(searchType){
		case "by_gene":{
			keyVal = $("#by_gene_txt").val();
			if( (keyVal === "") || ($.trim(keyVal) === "") || (keyVal === null) ){
				alert("You have to input Gene symbol which is user interested in");
				$("#by_gene_txt").focus();
				return false;
			}
		};break;
		case "by_gene_pair":{
			keyVal = $("#by_gene_pair_txt").val();

			if( (keyVal === "") || ($.trim(keyVal) === "") || (keyVal === null) ){
				alert("You have to input Pair Gene symbols which is user interested in");
				$("#by_gene_pair_txt").focus();
				return false;
			}
		};break;
		case "by_chr_locus":{
			keyVal = $("#by_chr_locus_txt").val();
			if( (keyVal === "") || ($.trim(keyVal) === "") || (keyVal === null) ){
				alert("You have to input chromosome locus(cytoband) which is user interested in");
				$("#by_chr_locus_txt").focus();
				return false;
			}
		};break;
		case "by_disease":{
			keyVal = $("#by_disease_txt").val();
			if( (keyVal === "") || ($.trim(keyVal) === "") || (keyVal === null) ){
				alert("You have to input disease which is user interested in");
				$("#by_disease_txt").focus();
				return false;
			}
		};break;
	}
	return true;
}