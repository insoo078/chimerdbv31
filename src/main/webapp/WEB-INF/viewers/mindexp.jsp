<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE HTML>

<html>
<head>
<title>ChimerDB 3.0</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="keywords" content="" />
<meta name="description" content="" />
<meta name="viewport" content="width=device-width">


<link type="text/css" rel="stylesheet" href="resources/css/templatemo_main.css"/>
<link type="text/css" rel="stylesheet" href="resources/css/chimerdbv3.css"/>
<link type="text/css" rel="stylesheet" href="resources/css/index_main.css"/>

<script type="text/javascript" src="resources/js/jq/jquery-1.12.4.min.js"></script>
<script type="text/javascript" src="resources/js/bootstrap.min.js"></script>

<script type="text/javascript" src="resources/js/hoy.js"></script>
<script type="text/javascript" src="resources/js/index.js"></script>

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
                                <span style="font-size: 20px; font-weight: bold;">About ChimerDB</span>
                            </div>
                            <div class="panel-body">
                                <p>ChimerDB 3.0 provides the most comprehensive catalog of fusion genes with extensive manual curation, analysis of all TCGA RNA-Seq data,<br>and text mining of PubMed articles.</p>
                            </div>
                        </div>
                    </div>
                    
                </div>
                <div class="col-md-1"></div>
            </div>
            
            
            <div class="row margin-bottom-30">
                <div class="col-md-1"></div>
                <div class="col-md-10">
                    
                    <div class="templatemo-panels">
                        <div class="panel panel-primary">
                            <div class="panel-body" style="text-align: center;">
                                <img alt="" src="resources/images/chimerdbv3_main_final.png" style="width: 80%; height: 80%;" />
                            </div>
                        </div>
                    </div>
                    
                </div>
                <div class="col-md-1"></div>
            </div>
            
            
            <div class="row margin-bottom-30">
                <div class="col-md-1"></div>
                <div class="col-md-10">
                    
                    <div class="templatemo-panels">
                        <div class="panel panel-primary">
                            <div class="panel-heading">
                                <span style="font-size: 20px; font-weight: bold;">Major Features</span>
                            </div>
                            <div class="panel-body">
                                <p>Representative features of chimerDB 3.0 are summarized as follows:</p>
                                <ol>
                                    <li class='index-main-feature-li'>
										<span style="font-weight: bold;">ChimerKB</span>
                                        <ul>
                                            <li style="list-style: none;">
                                                This knowledgebase includes manually curated and highly reliable 1,770 fusion genes. Fusion genes from COSMIC, GenBank, OMIM, Mitelman, TICdb, ChimerDB 2.0 were included.
                                            </li>
                                        </ul>
                                    </li>
                                    <li class='index-main-feature-li'>
										<span style="font-weight: bold;">ChimerPub</span>
                                        <ul>
                                            <li style="list-style: none;">
                                                We developed a literature-based fusion gene extraction tool using text mining and machine learning. Abstract sentences in 26 million PubMed articles were analyzed for two co-occurring genes with additional information on disease, experimental methods, and translocation position. Elaborate feature selection and machine learning processes were applied to identify reliable PubMed records for gene fusion.
                                            </li>
                                        </ul>
                                    </li>
                                    <li class='index-main-feature-li'>
										<span style="font-weight: bold;">ChimerSeq</span>
                                        <ul>
                                            <li style="list-style: none;">
                                                We have analyzed all the TCGA transcriptome sequencing data using FusionScan and TopHat-Fusion, two most reliable programs in our benchmark test. The result from the PRADA pipeline was added as well. We further compiled the existing predictions from ChimerDB 2.0 and ChiTarS databases.
                                            </li>
                                        </ul>
                                    </li>
                                </ol>
                            </div>
                        </div>
                    </div>
                    
                </div>
                <div class="col-md-1"></div>
            </div>
            
            <div class="row margin-bottom-30">
                <div class="col-md-1"></div>
                <div class="col-md-10">
                    
                    <div class="templatemo-panels">
                        <div class="panel panel-primary">
                            <div class="panel-heading">
                                <span style="font-size: 20px; font-weight: bold;">References</span>
                            </div>
                            <div class="panel-body">
                                <ul>
                                    <li class='reference'>
                                        <span style="font-weight: bold;">ChimerDB 3.0 :</span>
                                        <span style="font-size: 14px;">an enhanced database of fusion genes with cancer transcriptome and literature data mining. in press</span>
                                    </li>
                                    <li class='reference'>
                                        <a href="http://www.ncbi.nlm.nih.gov/pubmed/19906715" target="_blank"><span style="font-weight: bold;">ChimerDB 2.0 :</span></a>
                                        <span style="font-size: 13px;">a knowledgebase for fusion genes updated. Kim P, Yoon S, Kim N, Lee S, Ko M, Lee H, Kang H, Kim J, Lee S. Nucleic Acids Res. 2010 Jan;38(Database issue):D81-5.</span>
										<span id='chimerdbv2_site' class='site_link'>Website</span>
                                    </li>
                                    <li class='reference'>
                                        <a href="http://www.ncbi.nlm.nih.gov/pubmed/16381848" target="_blank"><span style="font-weight: bold;">ChimerDB :</span></a>
                                        <span style="font-size: 14px;">a knowledgebase for fusion sequences. Kim N, Kim P, Nam S, Shin S, Lee S. Nucleic Acids Res. 2006 Jan 1;34(Database issue):D21-4.</span>
										<span id='chimerdbv1_site' class='site_link'>Website</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    
                </div>
                <div class="col-md-1"></div>
            </div>
            
            
        </div>
    </div>
</div>




<%@include file="part/footer.jsp" %>
</body>
</html>
