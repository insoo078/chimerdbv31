/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function () {
    check_m_state("mmchimerpubbtn");
    
    var mainTable = null;
    
    mainTable =  mainTable = $("#chimerPubTbl").DataTable({
        "dom":"Tfrt<'row'<'col-md-2'l><'col-md-5'i><'col-md-5'p>>",
        "columnDefs": [
            { 'targets': [6], 'visible': false, 'searchable': false }
            ,{ 'targets': [7], 'visible': false, 'searchable': false }
        ],
         "scrollX":true,
         "tableTools":{"sSwfPath": "./resources/swf/copy_csv_xls_pdf.swf"},
         "deferRender": true
    });
    
    $('#chimerPubTbl tbody').on('click', 'tr', function(){
        showAbstractText( mainTable.row( this ).data() );
    });
    
    
   
});


function showAbstractText(rowObj){
            
        var data = "fuspair=" + rowObj[0] + "&disease=" + rowObj[3] + "&pmid=" + rowObj[5] + "&hgene=" + rowObj[6] + "&tgene=" + rowObj[7];

        $.ajax({
            url: "getjournaldata.cdb",
            type : 'POST',
            data : data,
            dataType: "json",
            success: function(jData) {
                
//                $("#selectedfusiongene").text(jData.fusion_pair);
//                $("#selectedrowtitle").html(jData.sentence_highlight);
//                $("#dateofpublicationtxt").text(jData.h_gene_highlight);
//                $("#journaltxt").text(jData.t_gene_highlight);
//                $("#abstracttxt").html(jData.disease_highlight);                        
            },
            error : function(xhr, status) {

            }
          });

}