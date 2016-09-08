/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var ChimerSeqResult = function( config ) {
	this.config = JSON.parse( JSON.stringify(config) );

	this.init();
};

ChimerSeqResult.prototype.init = function() {
	this.initChimerSeqResultjQueryDataTables();
};

ChimerSeqResult.prototype.initChimerSeqResultjQueryDataTables = function() {
	var obj = this;

	var mainTable = $( this.config.container ).DataTable({
		"dom":"T<'clear'>frtilp",
		"scrollX":true,
		"tableTools":{"sSwfPath": "./resources/swf/copy_csv_xls_pdf.swf"},
		"processing": true,
		"serverSide": true,
		"ajax": {
			"url":"nextp.cdb",
			"data":{formData: this.config.data},
			"dataType":"json",
			"type": "POST"
		},
		"iDisplayLength": 10,
		"columnDefs":[{targets:[0,1,2,3,4,5,6,7,8,9], visible:true}, {targets:'_all', visible:false}],
		"columns":[
			{"data":"fusion_pair"},
			{"data":"gene5Junc"},
			{"data":"gene3Junc"},
			{"data":"breakpoint_Type"},
			{"data":"cancertype"},
			{"data":"barcodeID"},
			{"data":"frame"},
			{"data":"chr_info"},
			{"data":"source"},
			{"data":"supported"},
			{"data":"id"},
			{"data":"h_gene"},
			{"data":"t_gene"}
		],
		"fnRowCallback": function( nRow, aData, iDisplayIndex ) {
			var imgTag = "";

			var tmp = aData.supported.split("_");

			if(tmp[0]==='1') imgTag += '<div class="rcorner-3" style="width:30px;height:20px;line-height:20px;text-align:center;background:green;">KB</div>';
			if(tmp[1]==='1') imgTag += '<div class="rcorner-3" style="width:30px;height:20px;line-height:20px;text-align:center;background:purple;">Pub</div>';
			$('td:eq(9)', nRow).html(imgTag); // where 4 is the zero-origin visible column in the HTML

			// When this page is opend, default fusion structure is drawing by first row data
			if( iDisplayIndex === 2 ){
				obj.getGeneInformation( aData );
			}

			return nRow;
		}
	});

	$(this.config.container + ' tbody').on('click', 'tr', function(){
		var rowdata = mainTable.row( this ).data();

		obj.getGeneInformation( rowdata );
	});
};

ChimerSeqResult.prototype.getGeneInformation = function (rowdata) {
	// To get each fused gene's symbols
	var data = JSON.stringify(rowdata);

	var chimerSeqResult = this;

	$.ajax({
		url: "getGeneInfo.cdb",
		type : 'POST',
		data : {"data":data},
		dataType: "json",
		success: function(jData) {
			var container = "#chimer-seq-viewer-content";

			d3.selectAll('svg').remove();
			
			chimerSeqResult.showDetailInfo( jData );

			jData.fusionGene5p = jData.genes["5'"];
			jData.fusionGene3p = jData.genes["3'"];
			var config = {
				organism: "human",
				orientation: "horizontal",
				chrMargin: 300,
				chrHeight: 1024,
				chrWidth: 20,
				topMargin : 20,
				sideMargin : 10,
				canvasHeight : 500,
				topPanelHeightToExplain : 170,
				fusionInfo : jData,
				showBandLabels: true,
				container: container
			  };

			  var viewer = new ChimeraDbV3ViewerWithOutChromosome(config);
		},
		error: function(e, status) {
			alert(status);
		}
	});
};

ChimerSeqResult.prototype.showDetailInfo = function(rowdata) {
	$.ajax({
		url: "getFusionDetailInfo.cdb",
		type : 'POST',
		data : {"id":rowdata.id},
		dataType: "json",
		success: function(jData) {
			$("#srt_td_5gene_nm").text( jData.h_gene );
			$("#srt_td_3gene_nm").text( jData.t_gene );
			$("#srt_td_5g_chr_nm").text( jData.h_chr );
			$("#srt_td_3g_chr_nm").text( jData.t_chr );
			$("#srt_td_5g_junc_point").text( jData.gene5Junc );
			$("#srt_td_3g_junc_point").text( jData.gene3Junc );
			$("#srt_td_5g_strand").text( rowdata.genes["5'"].strand );
			$("#srt_td_3g_strand").text( rowdata.genes["3'"].strand );
			
			var funcArray = [];
			if( jData.receptor > 0 )			funcArray.push("Receptor");
			if( jData.kinase > 0 )				funcArray.push("Kinase");
			if( jData.tumor_suppressor > 0 )	funcArray.push("Tomor suppressor");
			if( jData.oncogene > 0 )			funcArray.push("Oncogene");

			var func = "";
			$.each(funcArray, function(i, d){
				if( func === "" )	func += d;
				else				func += (", "+d);
			});

			$("#srt_td_5g_3g_func").text( func );
			$("#srt_td_chimerdb_type").text( jData.chimerDB_Type);
			$("#srt_td_source").text( jData.source );
			$("#srt_td_genome_build_ver").text( jData.genome_Build_Version );
			$("#srt_td_disease").text( jData.disease );
			$("#srt_td_tcga_barcode").text( jData.barcodeID );
			$("#srt_cancer_type").text( jData.cancertype==='NA'?"": jData.cancertype );
			$("#srt_td_frame").text( jData.frame );
			console.log( jData );
		},
		error : function(xhr, status) {
			alert(status);
		}
	});
};

ChimerSeqResult.prototype.showDescPopup = function (id){
	$.ajax({
		url: "getFusionDetailInfo.cdb",
		type : 'POST',
		data : {"id":id},
		dataType: "json",
		success: function(jData) {
			var data = JSON.stringify(jData);
			var mypopup = window.open("chimerseq_popup.cdb?detailInfo="+data+"", 'mypopup', "_blank", "toolbar=no,scrollbars=no,resizable=no,top=500,left=500,width=400,height=400");
		},
		error : function(xhr, status) {
			alert(status);
		}
	});
};

$(document).ready(function () {
    check_m_state("mmchimerseqbtn");

	var config = {
		container: "#chimerSeqTbl",
		data: $("#queryFormData").val()
	};
	
	var chimerSeqResult = new ChimerSeqResult(config);
});