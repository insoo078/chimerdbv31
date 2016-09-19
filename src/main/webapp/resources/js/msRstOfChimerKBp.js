/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function () {
    check_m_state("mmchimerkbbtn");
    
    //$("#chimerKbTbl").css({"display": "none"});
    var mainTable = null;
    
    mainTable = $("#chimerKbTbl").DataTable({
        "dom":"Tfrt<'row'<'col-md-2'l><'col-md-5'i><'col-md-5'p>>",
        "columnDefs": [
            { 'targets': [10], 'visible': false, 'searchable': false }
            ,{ 'targets': [11], 'visible': false, 'searchable': false }
            ,{ 'targets': [12], 'visible': false, 'searchable': false }
            ,{ 'targets': [13], 'visible': false, 'searchable': false }
            ,{ 'targets': [14], 'visible': false, 'searchable': false }
            ,{ 'targets': [15], 'visible': false, 'searchable': false }
            ,{ 'targets': [16], 'visible': false, 'searchable': false }
            ,{ 'targets': [17], 'visible': false, 'searchable': false }
            ,{ 'targets': [18], 'visible': false, 'searchable': false }
            ,{ 'targets': [19], 'visible': false, 'searchable': false }
            ,{ 'targets': [20], 'visible': false, 'searchable': false }
            ,{ 'targets': [21], 'visible': false, 'searchable': false }
            ,{ 'targets': [22], 'visible': false, 'searchable': false }
            ,{ 'targets': [23], 'visible': false, 'searchable': false }
            ,{ 'targets': [24], 'visible': false, 'searchable': false }
            ,{ 'targets': [25], 'visible': false, 'searchable': false }
            ,{ 'targets': [26], 'visible': false, 'searchable': false }
            ,{ 'targets': [27], 'visible': false, 'searchable': false }
            ,{ 'targets': [28], 'visible': false, 'searchable': false }
            ,{ 'targets': [29], 'visible': false, 'searchable': false }
            ,{ 'targets': [30], 'visible': false, 'searchable': false }
            ,{ 'targets': [31], 'visible': false, 'searchable': false }
        ],
        "scrollX":true,
        "tableTools":{"sSwfPath": "./resources/swf/copy_csv_xls_pdf.swf"},
        "deferRender": true
    });
    
    $('#chimerKbTbl tbody').on('click', 'tr', function(){
        //var rowdata = mainTable.row( this ).data();
        //showDesc2(rowdata[0], rowdata[1], rowdata[2], rowdata[3], rowdata[7], rowdata[9]);
        //showDesc1( mainTable.row( this ).data() );

        showDesc( mainTable.row( this ).data() );
    });

    showDesc( mainTable.row(0).data() );
});


function showDesc(popupdataobj){
    $("#selectedrowtitle").text( popupdataobj[0] );
    $("#srt_td_5gene_nm").text( popupdataobj[13] );
    $("#srt_td_3gene_nm").text( popupdataobj[17] );

    $("#srt_td_5g_chr_nm").text( popupdataobj[14] );
    $("#srt_td_3g_chr_nm").text( popupdataobj[18] );

    $("#srt_td_5g_junc_point").text( popupdataobj[1] );
    $("#srt_td_3g_junc_point").text( popupdataobj[2] );

    $("#srt_td_5g_strand").text( popupdataobj[16] );
    $("#srt_td_3g_strand").text( popupdataobj[20] );

    var selectedFuncStr = "";
    if( popupdataobj[25] === "1"){
        selectedFuncStr += "Kinase" + ", ";
    }
    if( popupdataobj[26] === "1"){
        selectedFuncStr += "Oncogene" + ", ";
    }
    if( popupdataobj[27] === "1"){
        selectedFuncStr += "Tumor suppressor" + ", ";
    }
    if( popupdataobj[28] === "1"){
        selectedFuncStr += "Receptor" + ", ";
    }
    if( popupdataobj[29] === "1"){
        selectedFuncStr += "Transcription factor" + ", ";
    }


    $("#srt_td_5g_3g_func").text( selectedFuncStr );
    
    $("#srt_td_chimerdb_type").text( popupdataobj[11] );
    $("#srt_td_source").text( popupdataobj[7] );
    $("#srt_td_genome_build_ver").text( popupdataobj[23] );
    $("#srt_td_disease").text( popupdataobj[4] );
    $("#srt_td_validation_mtd").text( popupdataobj[24] );
	
	var pmid_url = "<a href='http://www.ncbi.nlm.nih.gov/pubmed/?term=" + popupdataobj[9] + "' target='_blank'>" + popupdataobj[9] + "</a>";
	
    $("#srt_td_pmid").html( pmid_url );
    $("#srt_td_frame").text( popupdataobj[5] );
    $("#srt_td_chr_info").text( popupdataobj[6] );
//    $("#srt_td_supported").html( popupdataobj[8] );

	var pubIcon = "<span id='chimer_pub_icon' class='chimerdb-icon'>Pub</span>";
	var seqIcon = "<span id='chimer_seq_icon' class='chimerdb-icon'>Seq</span>";
			
	var supported = "";
	if( popupdataobj[popupdataobj.length-2] > 0 ) {
		supported += seqIcon;
	}
	if( popupdataobj[popupdataobj.length-1] > 0 ) {
		supported += pubIcon;
	}

	$("#srt_td_supported").html( supported );

	
	$("#chimer_pub_icon").click( function() {
		var gene_pair = $("#srt_td_5gene_nm").text() + "_" + $("#srt_td_3gene_nm").text();

		var url = "chimerpub_from_others.cdb?key_data_for_search_type=" + gene_pair;
		window.open(url, 'ChimerPub', 'window settings');
		return false;
	});

	$("#chimer_seq_icon").click( function() {
		var gene_pair = $("#srt_td_5gene_nm").text() + "_" + $("#srt_td_3gene_nm").text();

		var url = "chimerseq_link.cdb?gene_pair=" + gene_pair;
		window.open(url, 'ChimerSeq', 'window settings');
		return false;
	});
}


//function showDesc1(popupdataobj){
//    $("#td_fusion_gene").text( popupdataobj[0] );
//    $("#td_5gene_nm").text( popupdataobj[12] );
//    $("#td_3gene_nm").text( popupdataobj[16] );
//
//    $("#td_5g_chr_nm").text( popupdataobj[13] );
//    $("#td_3g_chr_nm").text( popupdataobj[17] );
//
//    $("#td_5g_junc_point").text( popupdataobj[1] );
//    $("#td_3g_junc_point").text( popupdataobj[2] );
//
//    $("#td_5g_strand").text( popupdataobj[15] );
//    $("#td_3g_strand").text( popupdataobj[19] );
//
//    var selectedFuncStr = "";
//    if( popupdataobj[30] === "1"){
//        selectedFuncStr += "Kinase" + ", ";
//    }
//    if( popupdataobj[31] === "1"){
//        selectedFuncStr += "Oncogene" + ", ";
//    }
//    if( popupdataobj[32] === "1"){
//        selectedFuncStr += "Tumor suppressor" + ", ";
//    }
//    if( popupdataobj[33] === "1"){
//        selectedFuncStr += "Receptor" + ", ";
//    }
//    if( popupdataobj[34] === "1"){
//        selectedFuncStr += "Transcription factor" + ", ";
//    }
//
//
//    $("#td_5g_3g_func").text( selectedFuncStr );
//    
//    $("#td_chimerdb_type").text( popupdataobj[10] );
//    $("#td_source").text( popupdataobj[7] );
//    $("#td_genome_build_ver").text( popupdataobj[22] );
//    $("#td_disease").text( popupdataobj[4] );
//    $("#td_validation_mtd").text( popupdataobj[27] );
//    $("#td_pmid").text( popupdataobj[9] );
//    $("#td_frame").text( popupdataobj[5] );
//    $("#td_chr_info").text( popupdataobj[6] );
//    $("#td_supported").html( popupdataobj[8] );
//	
//	
//    $("#genedescmodal").modal("show");
//}
//
//
//function showDesc2(fuspair, gene5junc, gene3junc, breaktype, source, pmid){
//
//    var data = "fuspair=" + fuspair + "&gene5junc=" + gene5junc + "&gene3junc=" + gene3junc + "&breaktype=" + breaktype + "&source=" + source + "&pmid=" + pmid;
//
//    
//    $.ajax({
//          url: "genedesc.cdb",
//          type : 'POST',
//          data : data,
//          dataType: "json",
//          success: function(jData) {
//            $("#td_fusion_gene").text(jData.fusion_pair);
//            $("#td_5gene_nm").text(jData.h_gene);
//            $("#td_3gene_nm").text(jData.t_gene);
//            
//            $("#td_5g_chr_nm").text(jData.h_chr);
//            $("#td_3g_chr_nm").text(jData.t_chr);
//            
//            $("#td_5g_junc_point").text(jData.gene5Junc);
//            $("#td_3g_junc_point").text(jData.gene3Junc);
//            
//            $("#td_5g_strand").text(jData.h_strand);
//            $("#td_3g_strand").text(jData.t_strand);
//            
//            $("#td_5g_func").text("jData");
//            $("#td_3g_func").text("jData");
//            
//            $("#td_chimerdb_type").text("ChimerKB");
//            $("#td_source").text(jData.source);
//            $("#td_genome_build_ver").text(jData.genome_build_version);
//            $("#td_disease").text(jData.disease);
//            $("#td_validation_mtd").text(jData.validation);
//            $("#td_pmid").text(jData.pmid);
//            $("#td_frame").text(jData.frame);
//            $("#td_chr_info").text(jData.chr_info);
//            $("#td_supported").text("jData");
//              
//            $("#genedescmodal").modal("show");
//              
//          },
//          error : function(xhr, status) {
//            alert(status);
//          }
//      });
//    
//}
//
//
//function showDesc3(fuspair, gene5junc, gene3junc, barcodeid, source){
//
//    var data = "fuspair=" + fuspair + "&gene5junc=" + gene5junc + "&gene3junc=" + gene3junc + "&barcodeid=" + barcodeid + "&source=" + source;
//
//    
//    $.ajax({
//          url: "genedesc.cdb",
//          type : 'POST',
//          data : data,
//          dataType: "json",
//          success: function(jData) {
//            
//              
//              
//              var x = screen.width / 2;
//              console.log("screen-width : "+screen.width);
//              console.log("x : "+x);
//              var y = screen.height / 2;
//              console.log("screen-height : "+screen.height);
//              console.log("y : "+y);
//              console.log("window-width : "+$(window).width());
//              console.log("window-height : "+$(window).height());
//              console.log("window-screenLeft : "+window.screenLeft);
//              console.log("window-screenX : "+window.screenX);
//              console.log("window-screenY : "+window.screenY);
//              
//              if(window.screenLeft < 0){
//                  x += window.screenLeft;
//              }
//              
//              var mypopup = window.open("resources/popup/genedesc.html", "mypopup", "top="+y+", left="+x+", width=200, height=200, scrollbars=no, menubar=no, status=no, toolbar=no");
//              mypopup.pdata = jData;
//              if(window.focus){mypopup.focus()}
//
//
//                
//
//              
//          },
//          error : function(xhr, status) {
//            alert(status);
//          }
//      });
//    
//}
//
//
//function initVariable(){
//};
