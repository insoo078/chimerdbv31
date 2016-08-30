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
			{"data":"id"}
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

        showDesc(rowdata.id);
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
					container: "#chimer-seq-viewer",
			  };
			  
			  var gene1 = jData[0];
			  var gene2 = jData[1];

			  var viewer = new ChimeraDbV3Viewer(config, gene1, gene2);
		}
	});
}

function showDesc(id){
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
    
}

function initVariable(){
};
