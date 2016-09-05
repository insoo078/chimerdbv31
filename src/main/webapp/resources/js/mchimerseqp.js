/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var ChimerSeqForm = {
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
		this.addAutocompleteField( "#byGeneTxt",		1);
		this.addAutocompleteField( "#byGenePairTxt",	2);
		this.addAutocompleteField( "#byChrLocusTxt",	3);
		this.addAutocompleteField( "#byDiseaseTxt",	4);

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
	
		$("#chkChimerDbV21").change(function(){
			var flag = $(this).is(':checked');
			
			if( flag === false ) {
				$("#chkAllOptions").prop("checked", false);
			}
		});
		
		$("#chkChiTaRs1").change(function(){
			var flag = $(this).is(':checked');
			
			if( flag === false ) {
				$("#chkAllOptions").prop("checked", false);
			}
		});
		
		this.setTcgaInOptionPanel();
		this.setAllSourcesInOptionPanel();
	},
	setAllSourcesInOptionPanel: function() {
		$("#chkAllOptions").change(function(){
			var flag = $(this).is(':checked');

			$("#chkTcgaOption1").trigger('click');
			$("#chkChimerDbV21").prop("checked", flag);
			$("#chkChiTaRs1").prop("checked", flag);
		});
	},
	setTcgaInOptionPanel: function() {
		$("#chkTcgaOption1").change(function(){
			var flag = $(this).is(':checked');

			$("div#fusion_prediction_tool_options input[type=checkbox]").each(function(){
				$(this).prop("checked", flag);
			});
			
			if( flag === false ) {
				$("#chkAllOptions").prop("checked", false);
//				$("#cancer_type_all").trigger('click');
			}
		});

		$("#cancer-type-all").click(function(){
			ChimerSeq.chimrSeqTcgaState = !ChimerSeq.chimrSeqTcgaState;
			$("#tcgaCancerTypes > option").prop("selected", ChimerSeq.chimrSeqTcgaState);
		});

		$("#tcgaCancerTypes > option.cancer-type").click(function(){
			if( ChimerSeq.chimrSeqTcgaState ) ChimerSeq.chimrSeqTcgaState = false;
		});
	},
	setDefaultValues: function() {
		// The default value of Search panel is 'by_gene' and '5''
		$("#searchType1").prop("checked", true).change();
		$("#byGene5Prime").prop("checked", true);
	},
	addAutocompleteField: function ( selector, type ) {
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
	},
	checkInputPrams: function (searchType) {
		var keyVal = "";

		switch(searchType){
			case "byGene":{
				keyVal = $("#byGeneTxt").val();
				if( (keyVal === "") || ($.trim(keyVal) === "") || (keyVal === null) ){
					alert("You have to input Gene symbol which is user interested in");
					$("#byGeneTxt").focus();
					return false;
				}
			};break;
			case "byGenePair":{
				keyVal = $("#byGenePairTxt").val();

				if( (keyVal === "") || ($.trim(keyVal) === "") || (keyVal === null) ){
					alert("You have to input Pair Gene symbols which is user interested in");
					$("#byGenePairTxt").focus();
					return false;
				}
			};break;
			case "byChrLocus":{
				keyVal = $("#byChrLocusTxt").val();
				if( (keyVal === "") || ($.trim(keyVal) === "") || (keyVal === null) ){
					alert("You have to input chromosome locus(cytoband) which is user interested in");
					$("#byChrLocusTxt").focus();
					return false;
				}
			};break;
			case "byDisease":{
				keyVal = $("#byDiseaseTxt").val();
				if( (keyVal === "") || ($.trim(keyVal) === "") || (keyVal === null) ){
					alert("You have to input disease which is user interested in");
					$("#byDiseaseTxt").focus();
					return false;
				}
			};break;
		}
		return true;
	},
	search: function () {
		var searchType = $("input:radio[name='searchType']:checked").val();

		if( this.checkInputPrams(searchType) ) {
			$("#chimerSeqQueryForm").submit();
		}

		return false;
	}
};

$(document).ready(function () {
//     to express which menu user has choosed
//	check_m_state("mmchimerseqbtn");

	ChimerSeqForm.init();
});

function search() {
	ChimerSeqForm.search();
}