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
			{"data":"t_gene"},
			{"data":"exon_breakpoint"}
		],
		"fnRowCallback": function( nRow, aData, iDisplayIndex ) {
			var imgTag = "";

			var tmp = aData.supported.split("_");

			if(tmp[0]==='1') imgTag += '<div class="rcorner-3" style="width:30px;height:20px;line-height:20px;text-align:center;background:green;">KB</div>';
			if(tmp[1]==='1') imgTag += '<div class="rcorner-3" style="width:30px;height:20px;line-height:20px;text-align:center;background:purple;">Pub</div>';
			$('td:eq(9)', nRow).html(imgTag); // where 4 is the zero-origin visible column in the HTML

			// When this page is opend, default fusion structure is drawing by first row data
			if( iDisplayIndex === 0 ){
				obj.getGeneInformation( aData );
			}

			return nRow;
		}
	});

	$(this.config.container + ' tbody').on('click', 'tr', function(){
		var rowdata = mainTable.row( this ).data();

		obj.getGeneInformation( rowdata );
		obj.showDescPopup(rowdata.id);
	});
};

ChimerSeqResult.prototype.getGeneInformation = function (rowdata) {
	// To get each fused gene's symbols
	var data = JSON.stringify(rowdata);
	
	$.ajax({
		url: "getGeneInfo.cdb",
		type : 'POST',
		data : {"data":data},
		dataType: "json",
		success: function(jData) {
			var container = "#chimer-seq-viewer-content";

			d3.selectAll('svg').remove();

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

//			  console.log( config );
			  var viewer = new ChimeraDbV3ViewerWithOutChromosome(config);
			  
//			  console.log( viewer.getConfig() );
		},
		error: function(e, status) {
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