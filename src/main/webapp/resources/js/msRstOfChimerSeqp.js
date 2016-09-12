/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var ChimerSeqResult = function( config ) {
	this.config = JSON.parse( JSON.stringify(config) );
	this.viewer = null;

	this.init();
	this.initController();
};

ChimerSeqResult.prototype.init = function() {
	this.initChimerSeqResultjQueryDataTables();
};

ChimerSeqResult.prototype.init4Redraw = function() {
	var config = this.viewer.getConfig();

	d3.selectAll('svg').remove();

	var nconfig = {
		organism: "human",
		orientation: "horizontal",
		chrMargin: 300,
		chrHeight: 1024,
		chrWidth: 20,
		topMargin : 20,
		sideMargin : 10,
		canvasHeight : 900,
		topPanelHeightToExplain : 170,
		fusionInfo : config.fusionInfo,
		showBandLabels: true,
		container: config.container,
		zoom: config.zoom,
		currentXPos: config.currentXPos,
		SCREEN_BACKBONE_AREALENGTH: config.SCREEN_BACKBONE_AREALENGTH
	};
	return nconfig;
};

ChimerSeqResult.prototype.initController = function() {
	var chimerSeq = this;
	
	$("#move_left_1000").click(function(){
		var nconfig = chimerSeq.init4Redraw();
		nconfig.currentXPos = nconfig.currentXPos - 100;
		if( nconfig.currentXPos <= 0 )	nconfig.currentXPos = 0;

		chimerSeq.viewer = new ChimeraDbV3ViewerWithOutChromosome(nconfig);
	});
	$("#move_left").click(function(){
		var nconfig = chimerSeq.init4Redraw();
		nconfig.currentXPos = nconfig.currentXPos - 10;
		if( nconfig.currentXPos <= 0 )	nconfig.currentXPos = 0;

		chimerSeq.viewer = new ChimeraDbV3ViewerWithOutChromosome(nconfig);
	});
	$("#zoom_in").click(function(){
		var nconfig = chimerSeq.init4Redraw();
		nconfig.zoom = nconfig.zoom + 0.1;

		chimerSeq.viewer = new ChimeraDbV3ViewerWithOutChromosome(nconfig);
	});
	$("#zoom_in_3x").click(function(){
		var nconfig = chimerSeq.init4Redraw();
		nconfig.zoom = nconfig.zoom * 3;

		chimerSeq.viewer = new ChimeraDbV3ViewerWithOutChromosome(nconfig);
	});
	$("#zoom_out").click(function(){
		var nconfig = chimerSeq.init4Redraw();
		nconfig.zoom = nconfig.zoom - 0.1;

		chimerSeq.viewer = new ChimeraDbV3ViewerWithOutChromosome(nconfig);
	});
	$("#zoom_out_3x").click(function(){
		var nconfig = chimerSeq.init4Redraw();
		nconfig.zoom = nconfig.zoom / 3;

		chimerSeq.viewer = new ChimeraDbV3ViewerWithOutChromosome(nconfig);
	});
	$("#move_right").click(function(){
		var nconfig = chimerSeq.init4Redraw();
		nconfig.currentXPos = nconfig.currentXPos + 10;
		
		if( nconfig.SCREEN_BACKBONE_AREALENGTH < nconfig.currentXPos )
			nconfig.currentXPos = nconfig.SCREEN_BACKBONE_AREALENGTH;

		chimerSeq.viewer = new ChimeraDbV3ViewerWithOutChromosome(nconfig);
	});
	$("#move_right_1000").click(function(){
		var nconfig = chimerSeq.init4Redraw();
		nconfig.currentXPos = nconfig.currentXPos + 100;
		
		if( nconfig.SCREEN_BACKBONE_AREALENGTH < nconfig.currentXPos )
			nconfig.currentXPos = nconfig.SCREEN_BACKBONE_AREALENGTH;

		chimerSeq.viewer = new ChimeraDbV3ViewerWithOutChromosome(nconfig);
	});
	$("#controller_init").click(function(){
		var nconfig = chimerSeq.init4Redraw();
		nconfig.currentXPos = 0;
		nconfig.zoom = 1;

		chimerSeq.viewer = new ChimeraDbV3ViewerWithOutChromosome(nconfig);
	})
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

			if( tmp[0]==='1' ) imgTag += "<img src='./resources/images/icons/ickb.png'></img>";
			if( tmp[1]==='1' ) imgTag += "<img src='./resources/images/icons/icpub.png'></img>";
			
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
				canvasHeight : 900,
				topPanelHeightToExplain : 170,
				fusionInfo : jData,
				showBandLabels: true,
				container: container,
				zoom: 1.0,
				currentXPos: 0
			  };

			  chimerSeqResult.viewer = new ChimeraDbV3ViewerWithOutChromosome(config);
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
			$("#srt_td_chr_info").text( jData.chr_info );
			
			
			var supported = "";
			if( jData.chimerKB > 0 ) {
				supported += "<img src='./resources/images/icons/ickb.png'></img>";
			}
			if( jData.chimerPub > 0 ) {
				supported += "<img src='./resources/images/icons/icpub.png'></img>";
			}
			$("#srt_td_supported").html( supported );
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