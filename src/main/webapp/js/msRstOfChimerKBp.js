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
    
    $('#chimerKbTbl tbody').on('click', 'tr', function(){
        var rowdata = mainTable.row( this ).data();
        showDesc(rowdata[0], rowdata[1], rowdata[2], rowdata[5], rowdata[8]);
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
              //var mypopup = window.open("/popup/description.html", 'mypopup', "_blank", "toolbar=no,scrollbars=no,resizable=no,top=500,left=500,width=400,height=400");
              //mypopup.pdata = jData;
              console.log(jData);
              var mypopup = window.open("", 'mypopup', "_blank", "toolbar=no,scrollbars=no,resizable=no,width=300,height=200");
              
              var tblStr = "";
              tblStr += "<table><tr><td rowspan='2'>Funsion Gene(5'_3')</td><td colspan='2'>"+jData.fusion_pair+"</td></tr>";
                tblStr += "<tr><td>"+jData.h_gene+"</td><td>"+jData.t_gene+"</td></tr>";
                tblStr += "<tr><td>Gene Name</td><td>"+jData+"</td><td>"+jData+"</td></tr>";
                tblStr += "<tr><td>Chromosome</td><td>"+jData+"</td><td>"+jData+"</td></tr>";
                tblStr += "<tr><td>Junction(Exon BreakPoint)</td><td>"+jData+"</td><td>"+jData+"</td></tr>";
                tblStr += "<tr><td>Strand</td><td>"+jData+"</td><td>"+jData+"</td></tr>";
                tblStr += "<tr><td>Function</td><td>"+jData+"</td><td>"+jData+"</td></tr>";
                
              tblStr += "<tr><td>ChimerDB Type</td><td colspan='2'>"+jData+"</td></tr>";
                tblStr += "<tr><td>Source</td><td colspan='2'>"+jData+"</td></tr>";
                tblStr += "<tr><td>Genome Build Version</td><td colspan='2'>"+jData+"</td></tr>";
                tblStr += "<tr><td>Disease</td><td colspan='2'>"+jData+"</td></tr>";
                tblStr += "<tr><td>Validation method</td><td colspan='2'>"+jData+"</td></tr>";
                tblStr += "<tr><td>PMID</td><td colspan='2'>"+jData+"</td></tr>";
                tblStr += "<tr><td>Frame</td><td colspan='2'>"+jData+"</td></tr>";
                tblStr += "<tr><td>Chromosome Information</td><td colspan='2'>"+jData+"</td></tr>";
                tblStr += "<tr><td>Supported</td><td colspan='2'>"+jData+"</td></tr></table>";
                
              mypopup.document.write(tblStr);
                
                
              
              
          },
          error : function(xhr, status) {
            alert(status);
          }
      });
    
}

function initVariable(){
};
