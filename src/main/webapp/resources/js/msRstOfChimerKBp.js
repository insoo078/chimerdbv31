/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function () {
    check_m_state("mmchimerkbbtn");
    
    var mainTable = null;
    
    mainTable =  mainTable = $("#chimerKbTbl").DataTable({
        "dom":"Tfrt<'row'<'col-md-2'l><'col-md-5'i><'col-md-5'p>>",
         "scrollX":true,
         "tableTools":{"sSwfPath": "./resources/swf/copy_csv_xls_pdf.swf"},
         "iDisplayLength": 25
    });
    
    $('#chimerKbTbl tbody').on('click', 'tr', function(){
        var rowdata = mainTable.row( this ).data();
        showDesc(rowdata[0], rowdata[1], rowdata[2], rowdata[5], rowdata[8]);
    });
    
   
});




function showDesc(fuspair, gene5junc, gene3junc, barcodeid, source){

    var data = "fuspair=" + fuspair + "&gene5junc=" + gene5junc + "&gene3junc=" + gene3junc + "&barcodeid=" + barcodeid + "&source=" + source;

    
    $.ajax({
          url: "genedesc.cdb",
          type : 'POST',
          data : data,
          dataType: "json",
          success: function(jData) {
            $("#td_fusion_gene").text(jData.fusion_pair);
            $("#td_5gene_nm").text(jData.h_gene);
            $("#td_3gene_nm").text(jData.t_gene);
            
            $("#td_5g_chr_nm").text(jData.h_chr);
            $("#td_3g_chr_nm").text(jData.t_chr);
            
            $("#td_5g_junc_point").text(jData.gene5Junc);
            $("#td_3g_junc_point").text(jData.gene3Junc);
            
            $("#td_5g_strand").text(jData.h_strand);
            $("#td_3g_strand").text(jData.t_strand);
            
            $("#td_5g_func").text("jData");
            $("#td_3g_func").text("jData");
            
            $("#td_chimerdb_type").text("ChimerKB");
            $("#td_source").text(jData.source);
            $("#td_genome_build_ver").text(jData.genome_build_version);
            $("#td_disease").text(jData.disease);
            $("#td_validation_mtd").text(jData.validation);
            $("#td_pmid").text(jData.pmid);
            $("#td_frame").text(jData.frame);
            $("#td_chr_info").text(jData.chr_info);
            $("#td_supported").text("jData");
              
            $("#genedescmodal").modal("show");
              
          },
          error : function(xhr, status) {
            alert(status);
          }
      });
    
}


function showDesc2(fuspair, gene5junc, gene3junc, barcodeid, source){

    var data = "fuspair=" + fuspair + "&gene5junc=" + gene5junc + "&gene3junc=" + gene3junc + "&barcodeid=" + barcodeid + "&source=" + source;

    
    $.ajax({
          url: "genedesc.cdb",
          type : 'POST',
          data : data,
          dataType: "json",
          success: function(jData) {
            
              
              
              var x = screen.width / 2;
              console.log("screen-width : "+screen.width);
              console.log("x : "+x);
              var y = screen.height / 2;
              console.log("screen-height : "+screen.height);
              console.log("y : "+y);
              console.log("window-width : "+$(window).width());
              console.log("window-height : "+$(window).height());
              console.log("window-screenLeft : "+window.screenLeft);
              console.log("window-screenX : "+window.screenX);
              console.log("window-screenY : "+window.screenY);
              
              if(window.screenLeft < 0){
                  x += window.screenLeft;
              }
              
              var mypopup = window.open("resources/popup/genedesc.html", "mypopup", "top="+y+", left="+x+", width=200, height=200, scrollbars=no, menubar=no, status=no, toolbar=no");
              mypopup.pdata = jData;
              if(window.focus){mypopup.focus()}


                

              
          },
          error : function(xhr, status) {
            alert(status);
          }
      });
    
}


function initVariable(){
};
