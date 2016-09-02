/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function () {
    check_m_state("mmchimerpubbtn");
    
    var mainTable = null;
    
    mainTable =  mainTable = $("#chimerPubTbl").DataTable({
        "dom":"Tfrt<'row'<'col-md-2'l><'col-md-5'i><'col-md-5'p>>",
         "scrollX":true,
         "tableTools":{"sSwfPath": "./resources/swf/copy_csv_xls_pdf.swf"},
         "iDisplayLength": 25,
         "deferRender": true
    });
    
    $('#chimerPubTbl tbody').on('click', 'tr', function(){
        showAbstractText( mainTable.row( this ).data() );
    });
    
    
   
});


function initVariable(){
};


function showAbstractText(rowObj){
            
        var data = "fuspair=" + rowObj[0] + "&gene5junc=" + rowObj[1] + "&gene3junc=" + rowObj[2] + "&breaktype=" + rowObj[3] + "&disease=" + rowObj[4] + "&pmid=" + rowObj[8];

        $.ajax({
            url: "getjournaldata.cdb",
            type : 'POST',
            data : data,
            dataType: "json",
            success: function(jData) {
                $("#selectedrowtitle").text(jData.title);
                
                $("#dateofpublicationtxt").text(jData.dateofPublication);
                $("#journaltxt").text(jData.journal);
                $("#abstracttxt").text(jData.abstractText);                        
            },
            error : function(xhr, status) {

            }
          });

}