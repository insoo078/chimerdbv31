/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function () {
    check_m_state("mmchimerseqbtn");

	var json = $("#paramTest").val();

    var mainTable = null;
    mainTable = $("#chimerSeqTbl").DataTable({
        "dom":"T<'clear'>frtilp",
        "scrollX":true,
        "tableTools":{"sSwfPath": "./resources/swf/copy_csv_xls_pdf.swf"},
        "processing": true,
        "serverSide": true,
        "ajax": {
            "url":"nextp.cdb",
			"data":{formData:json},
			"dataType":"json",
            "type": "POST"
        },
        "iDisplayLength": 10,
        "columns":[
            {"data":"Fusion_pair"},
            {"data":"gene5Junc"},
            {"data":"gene3Junc"},
            {"data":"Breakpoint_Type"},
            {"data":"Cancertype"},
            {"data":"BarcodeID"},
            {"data":"Frame"},
            {"data":"Chr_info"},
            {"data":"Source"},
            {"data":"supported"}
        ],
		"fnRowCallback": function( nRow, aData, iDisplayIndex, iDisplayIndexFull ) {
			var imgTag = "";

			var tmp = aData.supported.split("_");
			
			if(tmp[0]==='1') imgTag += '<div class="rcorner-3" style="width:30px;height:20px;line-height:20px;text-align:center;background:green;">KB</div>';
			if(tmp[1]==='1') imgTag += '<div class="rcorner-3" style="width:30px;height:20px;line-height:20px;text-align:center;background:purple;">Pub</div>';
			$('td:eq(9)', nRow).html(imgTag); // where 4 is the zero-origin visible column in the HTML

			return nRow;
		}
    });

    $('#chimerSeqTbl tbody').on('click', 'tr', function(){
        var rowdata = mainTable.row( this ).data();
		
		var genes = rowdata.fusion_pair.split("_");
		
		genes[0] = "5':" + genes[0];
		genes[1] = "3':" + genes[1];
		
		getGeneInformation( genes );

//        showDesc(rowdata[0], rowdata[1], rowdata[2], rowdata[5], rowdata[8]);
    });
});

function getGeneInformation(genes) {
	var data = JSON.stringify(genes);

	$.ajax({
		url: "getGeneInfo.cdb",
		type : 'POST',
		data : {"genes":data},
		dataType: "json",
		success: function(jData) {
			$("#chimer-seq-viewer").empty();

			var config = {
				organism: "human",
				orientation: "horizontal",
				chromosomes: [jData[0].chromosome, jData[1].chromosome],
				chrMargin: 300,
				chrHeight: 1024,
				chrWidth: 20,
				topMargin : 20,
				showBandLabels: true,
		  //          brush: true,
					container: "#chimer-seq-viewer",
		  //          rows : 10,
		  //          annotationsPath: "./resources/ideogram/data/annotations/all_human_genes.json",
		  //          annotationTracks: annotationTracks,
		  //          annotationHeight: 3.5
		  //          
		  //          
		  //	  perspective: "comparative"
		  //	  onLoad: onIdeogramLoad
			  };
			  
			  var gene1 = jData[0];
			  var gene2 = jData[1];

			  var viewer = new ChimeraDbV3Viewer(config, gene1, gene2);
		}
	});
}

function showDesc(fuspair, gene5junc, gene3junc, barcodeid, source){

    var data = "fuspair=" + fuspair + "&gene5junc=" + gene5junc + "&gene3junc=" + gene3junc + "&barcodeid=" + barcodeid + "&source=" + source;

    $.ajax({
          url: "descofgene.cdb",
          type : 'POST',
          data : data,
          dataType: "json",
          success: function(jData) {

              var mypopup = window.open("description_popup.cdb", 'mypopup', "_blank", "toolbar=no,scrollbars=no,resizable=no,top=500,left=500,width=400,height=400");
//              mypopup.pdata = jData;
              //mypopup.document.write();
              
//              <table><tr><td rowspan="2">Funsion Gene(5'_3')</td><td></td><td></td></tr>
//                <tr><td></td><td></td></tr>
//                <tr><td>Gene Name</td><td></td><td></td></tr>
//                <tr><td>Chromosome</td><td></td><td></td></tr>
//                <tr><td>Junction(Exon BreakPoint)</td><td></td><td></td></tr>
//                <tr><td>Strand</td><td></td><td></td></tr>
//                <tr><td>Function</td><td></td><td></td></tr>
//                <tr><td>ChimerDB Type</td><td></td><td></td></tr>
//                <tr><td>Source</td><td></td><td></td></tr>
//                <tr><td>Genome Build Version</td><td></td><td></td></tr>
//                <tr><td>Cancer Type</td><td></td><td></td></tr>
//                <tr><td>TCGA Sample Id</td><td></td><td></td></tr>
//                <tr><td>Seed reads num</td><td></td><td></td></tr>
//                <tr><td>Spanning pairs num</td><td></td><td></td></tr>
//                <tr><td>Junction reads num</td><td></td><td></td></tr>
//                <tr><td>Frame</td><td></td><td></td></tr>
//                <tr><td>Chromosome Information</td><td></td><td></td></tr>
//                <tr><td>Supported</td><td></td><td></td></tr></table>
              
              
          },
          error : function(xhr, status) {
            alert(status);
          }
      });
    
}

function initVariable(){
};
