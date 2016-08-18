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


<link type="text/css" rel="stylesheet" href="css/templatemo_main.css"/>
<link type="text/css" rel="stylesheet" href="css/chimerdbv3.css"/>
<link type="text/css" rel="stylesheet" href="css/index_main.css"/>

<script type="text/javascript" src="jq/jquery-1.11.2.min.js"></script>
<script type="text/javascript" src="js/bootstrap.min.js"></script>

<script type="text/javascript" src="js/hoy.js"></script>
<script type="text/javascript" src="js/index.js"></script>

</head>
<body>

    <%@include file="part/h.jsp" %>
    
<!-- content -->
<div class="container">
    
    <div class="row margin-bottom-30" style="margin-top: 30px;">
    
        <div class="templatemo-panels">
            <div class="row">
                <div class="col-md-12 margin-bottom-30">
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
        </div>
        
        <div class="templatemo-panels">
            <div class="row">
                <div class="col-md-12 margin-bottom-30">
                    <div class="panel panel-primary">
                        <div class="panel-body" style="text-align: center;">
                            <img alt="" src="images/chimerdbv3_main1.png" style="width: 95%; height: 95%;" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="templatemo-panels">
            <div class="row">
                <div class="col-md-12 margin-bottom-30">
                    <div class="panel panel-primary">
                        <div class="panel-heading">
                            <span style="font-size: 20px; font-weight: bold;">Major Features</span>
                        </div>
                        <div class="panel-body">
                            <p>Representative features of chimerDB 3.0 are summarized as follows:</p>
                            <ol>
                                <li><span style="font-weight: bold;">ChimerKB</span>
                                    <ul>
                                        <li style="list-style: none;">
                                            This knowledgebase includes manually curated and highly reliable 1,770 fusion genes. Fusion genes from COSMIC, GenBank, OMIM, Mitelman, TICdb, ChimerDB 2.0 were included.
                                        </li>
                                    </ul>
                                </li>
                                <li><span style="font-weight: bold;">ChimerSeq</span>
                                    <ul>
                                        <li style="list-style: none;">
                                            We have analyzed all the TCGA transcriptome sequencing data using FusionScan and TopHat-Fusion, two most reliable programs in our benchmark test. The result from the PRADA pipeline was added as well. We further compiled the existing predictions from ChimerDB 2.0 and ChiTarS databases.
                                        </li>
                                    </ul>
                                </li>
                                <li><span style="font-weight: bold;">ChimerPub</span>
                                    <ul>
                                        <li style="list-style: none;">
                                            We developed a literature-based fusion gene extraction tool using text mining and machine learning. Abstract sentences in 26 million PubMed articles were analyzed for two co-occurring genes with additional information on disease, experimental methods, and translocation position. Elaborate feature selection and machine learning processes were applied to identify reliable PubMed records for gene fusion.
                                        </li>
                                    </ul>
                                </li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="templatemo-panels">
            <div class="row">
                <div class="col-md-12 margin-bottom-30">
                    <div class="panel panel-primary">
                        <div class="panel-heading">
                            <span style="font-size: 20px; font-weight: bold;">References</span>
                        </div>
                        <div class="panel-body">
                            <ul>
                                <li>
                                    <span style="font-weight: bold;">ChimerDB 3.0 :</span>
                                    <span style="font-size: 14px;">an enhanced database of fusion genes with cancer transcriptome and literature data mining. in press</span>
                                </li>
                                <li>
                                    <a href="http://biome.ewha.ac.kr:8080/FusionGene" target="_blank"><span style="font-weight: bold;">ChimerDB 2.0 :</span></a>
                                    <span style="font-size: 13px;">a knowledgebase for fusion genes updated. Kim P, Yoon S, Kim N, Lee S, Ko M, Lee H, Kang H, Kim J, Lee S. Nucleic Acids Res. 2010 Jan;38(Database issue):D81-5.</span>
                                </li>
                                <li>
                                    <span style="font-weight: bold;">ChimerDB :</span>
                                    <span style="font-size: 14px;">a knowledgebase for fusion sequences. Kim N, Kim P, Nam S, Shin S, Lee S. Nucleic Acids Res. 2006 Jan 1;34(Database issue):D21-4.</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</div>

<%@include file="part/f.jsp" %>
</body>
</html>
