<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE HTML>

<html>
<head>
<title>ChimerDB v3.0 Template</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="keywords" content="" />
<meta name="description" content="" />
<meta name="viewport" content="width=device-width">

<link type="text/css" rel="stylesheet" href="resources/css/templatemo_main.css"/>
<link type="text/css" rel="stylesheet" href="resources/css/chimerdbv3.css"/>
<link type="text/css" rel="stylesheet" href="resources/css/index_main.css"/>

<script type="text/javascript" src="resources/js/jq/jquery-1.12.4.min.js"></script>
<script type="text/javascript" src="resources/js/bootstrap.min.js"></script>
<script type="text/javascript" src="resources/js/templatemo_script.js"></script>
<script type="text/javascript" src="resources/js/hoy.js"></script>
<script type="text/javascript" src="resources/js/mhelpp.js"></script>
</head>
<body>
    
    <%@include file="part/header.jsp" %>
    

<!-- content -->

<div id="main-wrapper">
    <div class="template-page-wrapper">
        <div class="templatemo-content-wrapper">
            
            <div class="row margin-bottom-30" style="margin-top: 30px;">
                <div class="col-md-1"></div>
                <div class="col-md-10">
                    
                    <div class="templatemo-panels">
                        <div class="panel panel-primary">
                            <div class="panel-heading">
                                <span style="font-size: 20px; font-weight: bold;">Help</span>
                            </div>
                            <div class="panel-body">
								<ol class="help_main">
									<li>
										<span>1.</span> DataSet of ChimerDB 3.0
										<ol class="help_main">
											<li<span>1.1</span> ChimerKB</li>
											<li><span>1.2</span> ChimerPub</li>
											<li<span>1.3</span> ChimerSeq
												<ol class="help_main">
													<li><span>1.3.1</span> Data processing</li>
													<li><span>1.3.2</span> FusionScan</li>
												</ol>
											</li>
										</ol>
									</li>
									<li>
										<span>2.</span> ChimerKB Menu
										<ol class="help_main">
											<li><span>2.1</span> How-to search</li>
											<li><span>2.2</span> Search result: Brief information & detailed information</li>
										</ol>
									</li>
									<li>
										<span>3.</span> ChimerPub Menu
										<ol class="help_main">
											<li><span>3.1</span> How-to search</li>
											<li><span>3.2</span> Search result: Brief information & detailed information</li>
										</ol>
									</li>
									<li>
										<span>4.</span> ChimerSeq Menu
										<ol class="help_main">
											<li><span>4.1</span> How-to search</li>
											<li><span>4.2</span> Search result: Brief information & detailed information</li>
											<li><span>4.3</span> Search result: Fusion Structure</li>
										</ol>
									</li>
								</ol>

								<table style="margin-top:120px;width:95%;margin-left:2.5%;">
									<tr>
										<td>1. Dataset of ChimerDB 3.0</td>
									</tr>
									<tr>
										<td>1.1 ChimerKB</td>
									</tr>
									<tr>
										<td>
ChimerKB represents a knowledgebase including 1,066 fusion genes with manual curation that were compiled from 
public resources of fusion genes with experimental evidences. Fusion genes were compiled from well-known 
public resources such as GenBank, Mitelman, OMIM, COSMIC, TICdb and PubMed articles. 
All entries were manually curated for disease, sequences, break points, and experimental evidences.
										</td>
									</tr>
									<tr>
										<td>Kim, P., Yoon, S., Kim, N., Lee, S., Ko, M., Lee, H., ... & Lee, S. (2010). ChimerDB 2.0—a knowledgebase for fusion genes updated. Nucleic acids research, 38(suppl 1), D81-D85.</td>
									</tr>
										<td>Benson, D. A., Cavanaugh, M., Clark, K., Karsch-Mizrachi, I., Lipman, D. J., Ostell, J., & Sayers, E. W. (2013). GenBank. Nucleic acids research, 41(D1), D36-D42. http://www.ncbi.nlm.nih.gov/genbank/</td>
									</tr>
									<tr>
										<td>Mitelman, F., Johansson, B., & Mertens, F. (2007). Mitelman database of chromosome aberrations in cancer. Cancer Genome Anatomy Project. http://cgap.nci.nih.gov/Chromosomes/Mitelman</td>
									</tr>
									<tr>
										<td>Hamosh, A., Scott, A. F., Amberger, J. S., Bocchini, C. A., & McKusick, V. A. (2005). Online Mendelian Inheritance in Man (OMIM), a knowledgebase of human genes and genetic disorders. Nucleic acids research, 33(suppl 1), D514-D517. http://www.omim.org/</td>
									</tr>
									<tr>
										<td>Novo, F. J., de Mendíbil, I. O., & Vizmanos, J. L. (2007). TICdb: a collection of gene-mapped translocation breakpoints in cancer. BMC genomics, 8(1), 1. http://www.unav.es/genetica/TICdb/</td>
									</tr>
									<tr class='blank' style="height:50px;"><td></td></tr>
									<tr>
										<td>1.2 ChimerPub</td>
									</tr>
									<tr>
										<td>To obtain fusion gene information from PubMed articles, we first searched for all the sentences 
											that contained at least two co-occurring genes using BEST entity extractor (BEST EE) [BEST Citation]. 
											We collected a total of 302,615 sentences in 156,228 abstracts that were published before June 2016.
											Through manual curation, we made a gold-standard fusion gene sentence set of 1,549 sentences. 
											We extracted features from the sentences including the differentially distributed words for machine learning 
											and score and rank all the target sentences with logistic regression. Among the top 10,000 scored sentences, 
											2,563 unique fusion genes were found, and 2,067 of them were novel. </td>
									</tr>
								</table>
								
                            </div>
                        </div>
                    </div>
                    
                </div>
                <div class="col-md-1"></div>
            </div>
            
            
        </div>
    </div>
</div>


<!-- content -->
<%@include file="part/footer.jsp" %>
</body>
</html>
