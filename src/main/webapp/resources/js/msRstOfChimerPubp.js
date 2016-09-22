/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
var expanded = false;


$(document).ready(function () {
    check_m_state("mmchimerpubbtn");
    
    var mainTable = null;
    
    mainTable =  mainTable = $("#chimerPubTbl").DataTable({
        "dom":"Tfrt<'row'<'col-md-2'l><'col-md-5'i><'col-md-5'p>>",
        "columnDefs": [
            { 'targets': [6], 'visible': false, 'searchable': false }
            ,{ 'targets': [7], 'visible': false, 'searchable': false }
			,{ 'targets': [8], 'visible': false, 'searchable': false }
        ],
         "scrollX":true,
         "tableTools":{"sSwfPath": "./resources/swf/copy_csv_xls_pdf.swf"},
         "deferRender": true
    });
    
    $('#chimerPubTbl tbody').on('click', 'tr', function(){
//        showAbstractText( mainTable.row( this ).data() );
		showJournalDataFromNcbi( mainTable.row(this).data() );
    });
	
	$(".author_info_text").click(function(){
		expanded = !expanded;
		
		if( expanded ) {
			$("#tr_author_affiliation").slideDown('normal');
			$("#author_info_expand").text("-");
		}else {
			$("#tr_author_affiliation").slideUp('normal');
			$("#author_info_expand").text("+");
		}
	});

	showJournalDataFromNcbi( mainTable.row(0).data() );
});


//function showAbstractText(rowObj){
//            
//        var data = "fuspair=" + rowObj[0] + "&disease=" + rowObj[3] + "&pmid=" + rowObj[5] + "&hgene=" + rowObj[6] + "&tgene=" + rowObj[7];
//
//        $.ajax({
//            url: "getjournaldata.cdb",
//            type : 'POST',
//            data : data,
//            dataType: "json",
//            success: function(jData) {
//                
////                $("#selectedfusiongene").text(jData.fusion_pair);
////                $("#selectedrowtitle").html(jData.sentence_highlight);
////                $("#dateofpublicationtxt").text(jData.h_gene_highlight);
////                $("#journaltxt").text(jData.t_gene_highlight);
////                $("#abstracttxt").html(jData.disease_highlight);                        
//            },
//            error : function(xhr, status) {
//
//            }
//          });
//
//}

function showJournalDataFromNcbi(rowObj) {
	var url = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id="+rowObj[5]+"&retmode=xml&rettype=abstract";
	
	$.ajax({
		url: url,
		dataType : "xml",
		type : 'POST',
		success: function(jData) {
			var pubmedObj = {};

			pubmedObj.pmid = rowObj[5];
			pubmedObj.title = $(jData).find("ArticleTitle").text();
			pubmedObj.journalTitle = $(jData).find("Article").find("Journal").find("Title").text();
			pubmedObj.journalTitleAbbr = $(jData).find("Article").find("Journal").find("ISOAbbreviation").text();
			pubmedObj.volume = $(jData).find("Article").find("Journal").find("JournalIssue").find("Volume").text();
			pubmedObj.issue = $(jData).find("Article").find("Journal").find("JournalIssue").find("Issue").text();
			pubmedObj.issuedYear = $(jData).find("Article").find("Journal").find("JournalIssue").find("PubDate").find("Year").text();
			pubmedObj.issedMonth = $(jData).find("Article").find("Journal").find("JournalIssue").find("PubDate").find("Month").text();
			pubmedObj.pagination = $(jData).find("Article").find("Pagination").find("MedlinePgn").text();

			var authors = [];
			var author = $(jData).find("Article").find("AuthorList").find("Author");
			$.each($(author), function(index, value) {
				var author = {lastName:$(value).find("LastName").text(), foreName:$(value).find("ForeName").text(), initial:$(value).find("Initials")};

				var affiliations = $(value).find("AffiliationInfo").find("Affiliation");
				$.each($(affiliations), function(index, value) {
					author.affiliation = $(value).text();
				});
				authors.push( author );
			});
			pubmedObj.authors = authors;
			pubmedObj.abstract = $(jData).find("AbstractText").text();

			var articles = [];
			var articleList = $(jData).find("ArticleIdList").find("ArticleId");
			$.each($(articleList), function(index, value) {
				var idType = $(value).attr("IdType");
				var id = $(value);
				
				var article = { id_type:idType, id:id.text() };
				articles.push( article );
			});
			pubmedObj.articles = articles;
			
			printArticle( pubmedObj, rowObj[8], rowObj[6], rowObj[7] );
		},
		error : function(xhr, status) {

		}
	});
}

function printArticle(pubmedObj, hilight_sentences, gene1, gene2) {
	var issue_info = pubmedObj.journalTitleAbbr + " " + pubmedObj.issuedYear + " " + pubmedObj.issedMonth + ";" + pubmedObj.volume + "(" + pubmedObj.issue + "):" + pubmedObj.pagination;
	$("#journal_issue_info").text( issue_info );
	$("#article_title").html( "<a href='http://www.ncbi.nlm.nih.gov/pubmed/"+ pubmedObj.pmid +"'>" + pubmedObj.title + "</a>" );
		
	var hilight_sentence = hilight_sentences.split("///");
	

	var authors = "";
	var affiliations = [];
	var str_affiliations = "";
	for(var i=0; i<pubmedObj.authors.length; i++ ) {
		var author = pubmedObj.authors[i];
		
		authors += author.lastName + " " + author.foreName;

		if( typeof author.affiliation !== "undefined" ) {
			if( affiliations.indexOf(author.affiliation) === -1 ) {
				affiliations.push( author.affiliation );
				str_affiliations += "<sup>" + (affiliations.indexOf(author.affiliation)+1) + "</sup>" + author.affiliation + "<br>";
			}

			authors += "<sup>"+(affiliations.indexOf(author.affiliation)+1)+"</sup>";
		};
		
		if( i < pubmedObj.authors.length-1 ) authors += " , ";
	}
	$("#article_authors").html( authors );
	$("#author_affiliation").html( str_affiliations );
	
	$("#tr_author_affiliation").hide('normal');
	
	
	var abstract = pubmedObj.abstract;

	for(var i=0; i<hilight_sentence.length; i++) {
		var sentence = hilight_sentence[i].trim().replace("..", "");
		abstract = abstract.replace(sentence, "<span style='background-color:yellow;'>" + sentence + "</span>");
	}
	abstract = replaceAll(abstract, gene1.trim(), "<span style='font-weight:bold;'>" + gene1.trim() + "</span>");
	abstract = replaceAll(abstract, gene2.trim(), "<span style='font-weight:bold;'>" + gene2.trim() + "</span>");
	
	$("#article_abstract").html( abstract );
 }
 
function replaceAll(str, searchStr, replaceStr) {
	return str.split(searchStr).join(replaceStr);
}