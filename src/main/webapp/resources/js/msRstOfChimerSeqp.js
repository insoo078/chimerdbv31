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

ChimerSeqResult.prototype.initUcscSettings = function( rowdata ) {
	var gene5p = rowdata.fusionGene5p;
	var gene3p = rowdata.fusionGene3p;

	var id = rowdata.id;

	$("#ucsc_5pGene").click(function(){
		var file_url = "data/bed/bed_"+id+"_5p_"+gene5p.chromosome+"_"+gene5p.start+"_"+gene5p.end;
		
		var url = "https://genome.ucsc.edu/cgi-bin/hgTracks?org=human&db=hg19&position="+gene5p.chromosome+"%3A"+gene5p.start+"%2D"+gene5p.end+"&hgt.customText=http://ercsb.ewha.ac.kr/fusiongene/" + file_url;

		window.open(url, 'UCSC Genome Browser', 'window settings');
	});

	$("#ucsc_3pGene").click(function(){
		var file_url = "data/bed/bed_"+id+"_3p_"+gene3p.chromosome+"_"+gene3p.start+"_"+gene3p.end;

		var url = "https://genome.ucsc.edu/cgi-bin/hgTracks?org=human&db=hg19&position="+gene3p.chromosome+"%3A"+gene3p.start+"%2D"+gene3p.end+"&hgt.customText=http://ercsb.ewha.ac.kr/fusiongene/" + file_url;

		window.open(url, 'UCSC Genome Browser', 'window settings');
	});
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
		nconfig.zoom = nconfig.zoom * 1.1;

		chimerSeq.viewer = new ChimeraDbV3ViewerWithOutChromosome(nconfig);
	});
	$("#zoom_in_15x").click(function(){
		var nconfig = chimerSeq.init4Redraw();
		nconfig.zoom = nconfig.zoom * 1.5;

		chimerSeq.viewer = new ChimeraDbV3ViewerWithOutChromosome(nconfig);
	});
	$("#zoom_in_30x").click(function(){
		var nconfig = chimerSeq.init4Redraw();
		nconfig.zoom = nconfig.zoom * 3;

		chimerSeq.viewer = new ChimeraDbV3ViewerWithOutChromosome(nconfig);
	});
	$("#zoom_out").click(function(){
		var nconfig = chimerSeq.init4Redraw();
		nconfig.zoom = nconfig.zoom / 1.1;

		chimerSeq.viewer = new ChimeraDbV3ViewerWithOutChromosome(nconfig);
	});
	$("#zoom_out_15x").click(function(){
		var nconfig = chimerSeq.init4Redraw();
		nconfig.zoom = nconfig.zoom / 1.5;

		chimerSeq.viewer = new ChimeraDbV3ViewerWithOutChromosome(nconfig);
	});
	$("#zoom_out_30x").click(function(){
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
	});
};

ChimerSeqResult.prototype.initChimerSeqResultjQueryDataTables = function() {
	var obj = this;

	var mainTable = $( this.config.container ).DataTable({
		"dom":"Tfrt<'row'<'col-md-2'l><'col-md-5'i><'col-md-5'p>>",
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
		"columnDefs":[{targets:[0,1,2,3,4,6,7,8,9], visible:true}, {targets:'_all', visible:false}],
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
			{"data":"h_chr"},
			{"data":"t_chr"}
		],
		"fnRowCallback": function( nRow, aData, iDisplayIndex ) {
			var imgTag = "";

			var tmp = aData.supported.split("_");

			var pubIcon = "<span class='chimer-pub-icon chimerdb-icon'>Pub</span>";
			var kbIcon = "<span class='chimer-kb-icon chimerdb-icon'>KB</span>";
			
			if( tmp[1]==='1' ) imgTag += pubIcon;
			if( tmp[0]==='1' ) imgTag += kbIcon;
			
			$('td:eq(8)', nRow).html(imgTag); // where 4 is the zero-origin visible column in the HTML

			// When this page is opend, default fusion structure is drawing by first row data
			if( iDisplayIndex === 0 ){
				obj.getGeneInformation( aData );
			}

			return nRow;
		},
		"initComplete": function(settings, json) {
			$(".chimer-pub-icon").click(function() {
				var currentTr = $(this).parent().parent();
				var td = $(currentTr).find("td:first");
				var gene_pair = td.text();

				var url = "chimerpub_from_others.cdb?key_data_for_search_type=" + gene_pair;
				window.open(url, 'ChimerPub', 'window settings');
				return false;
			});
			
			$(".chimer-kb-icon").click(function() {
				var currentTr = $(this).parent().parent();
				var td = $(currentTr).find("td:first");
				var gene_pair = td.text();
				
				var url = "chimerkb_from_others.cdb?key_data_for_search_type=" + gene_pair;
				window.open(url, 'ChimerKb', 'window settings');
				return false;
			});
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

			  if( (typeof  jData.fusionGene3p !== "undefined") && (typeof jData.fusionGene5p !== "undefined") ) {
				chimerSeqResult.viewer = new ChimeraDbV3ViewerWithOutChromosome(config);
			  }
		},
		error: function(e, status) {
			console.log( e );
//			alert(status);
		}
	});
};

ChimerSeqResult.prototype.showDetailInfo = function(rowdata) {
	var ChimerSeq = this;

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
				
			$("#srt_td_5g_junc_point").html( function() {
				var margin = $(this).width()/2 - 105;
				var junc5pWithUcsc = "<span class='junction_label_pos' style='margin-left:"+margin+"px;'>"+jData.gene5Junc+"</span><span id='ucsc_5pGene' class='junction_label_ucsc'>UCSC</span>";
				return junc5pWithUcsc ;
			});
			$("#srt_td_3g_junc_point").html( function() {
				var margin = $(this).width()/2 - 105;
				var junc3pWithUcsc = "<span class='junction_label_pos' style='margin-left:"+margin+"px;'>"+jData.gene3Junc+"</span><span id='ucsc_3pGene' class='junction_label_ucsc'>UCSC</span>";
				return junc3pWithUcsc;
			});
			$("#srt_td_5g_strand").text( jData.h_strand );
			$("#srt_td_3g_strand").text( jData.t_strand );
			
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

			$("#selectedrowtitle").text( jData.fusion_pair );
			
			
			if( jData.breakpoint_Type === 'Exonic' )
				$("#junction_type").text(' (Exon BreakPoint)');
			else if( jData.breakpoint_Type === 'Genomic' )
				$("#junction_type").text(' (Genomic BreakPoint)');

			$("#srt_td_5g_3g_func").text( func );
			$("#srt_td_chimerdb_type").text( jData.chimerDB_Type);
			$("#srt_td_source").text( jData.source );
			$("#srt_td_genome_build_ver").text( jData.genome_Build_Version );
			$("#srt_td_disease").text( jData.disease );
			$("#srt_td_tcga_barcode").text( jData.barcodeID );
			$("#srt_cancer_type").text( jData.cancertype==='NA'?"": jData.cancertype );
			$("#srt_td_frame").text( jData.frame );
			$("#srt_td_chr_info").text( jData.chr_info );

			var pubIcon = "<span id='chimer_pub_icon' class='chimerdb-icon'>Pub</span>";
			var kbIcon = "<span id='chimer_kb_icon' class='chimerdb-icon'>KB</span>";
			
			var supported = "";
			if( jData.chimerPub > 0 ) {
				supported += pubIcon;
			}
			if( jData.chimerKB > 0 ) {
				supported += kbIcon;
			}

			$("#srt_td_supported").html( supported );
			
			$("#chimer_pub_icon").click( function() {
				var gene_pair = $("#srt_td_5gene_nm").text() + "_" + $("#srt_td_3gene_nm").text();
				
				var url = "chimerpub_from_others.cdb?key_data_for_search_type=" + gene_pair;
				window.open(url, 'ChimerPub', 'window settings');
				return false;
			});

			$("#chimer_kb_icon").click( function() {
				var gene_pair = $("#srt_td_5gene_nm").text() + "_" + $("#srt_td_3gene_nm").text();
				
				var url = "chimerkb_from_others.cdb?key_data_for_search_type=" + gene_pair;
				window.open(url, 'ChimerKb', 'window settings');
				return false;
			});

			ChimerSeq.initUcscSettings( rowdata );
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