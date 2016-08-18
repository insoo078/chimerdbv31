/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function () {
    check_m_state("mmchimerkbbtn");
    
    var mainTable = null;
    
    mainTable =  mainTable = $("#chimerKbTbl").DataTable({
        "dom":"T<'clear'>frtilp",
         "scrollX":true,
         "tableTools":{"sSwfPath": "./swf/copy_csv_xls_pdf.swf"},
         "iDisplayLength": 25
    });
    
   
});




function showDesc(fuspair, gene5junc, gene3junc, barcodeid, source){

    var data = "fuspair=" + fuspair + "&gene5junc=" + gene5junc + "&gene3junc=" + gene3junc + "&barcodeid=" + barcodeid + "&source=" + source;

    
    $.ajax({
          url: "descofgene.cdb",
          type : 'POST',
          data : data,
          dataType: "json",
          success: function(jData) {
              var mypopup = window.open("/popup/description.html", 'mypopup', "_blank", "toolbar=no,scrollbars=no,resizable=no,top=500,left=500,width=400,height=400");
              mypopup.pdata = jData;
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