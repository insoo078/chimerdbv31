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
<script type="text/javascript" src="resources/js/mstatisticp.js"></script>

</head>
<body>
    
    <%@include file="part/header.jsp" %>
    

<!-- content -->

<div id="main-wrapper">
    <div class="template-page-wrapper">
        <div class="templatemo-content-wrapper">
			
			<div class="row margin-bottom-30" style="margin-top: 30px;">
                <div class="col-md-1"></div>
                <div class="col-md-5">
                    
                    <div class="templatemo-panels">
                        <div class="panel panel-primary">
                            <div class="panel-heading">
                                <span style="font-size: 20px; font-weight: bold;">Table</span>
                            </div>
                            <div class="panel-body">
								<img alt="" src="resources/images/chimerdbv3_statistics_table.png" style="width: 100%; height: 100%;" />
                            </div>
                        </div>
                    </div>
                    
                </div>
                <div class="col-md-5">
                    
                    <div class="templatemo-panels">
                        <div class="panel panel-primary">
                            <div class="panel-heading">
                                <span style="font-size: 20px; font-weight: bold;">Venn Diagram</span>
                            </div>
                            <div class="panel-body">
								<img alt="" src="resources/images/chimerdbv3_statistics_diagram.png" style="width: 100%; height: 100%;" />
                            </div>
                        </div>
                    </div>
                    
                </div>
                <div class="col-md-1"></div>
            </div>

		</div>
	</div>
</div>

<!--
<div id="main-wrapper">
    <div class="template-page-wrapper">
        <div class="templatemo-content-wrapper">
            
            <div class="row margin-bottom-15" style="margin-top: 30px;">
                <div class="col-md-1"></div>
                <div class="col-md-10" style="text-align: right;">*() ChimerPub highscore</div>
                <div class="col-md-1"></div>
            </div>
            
            <div class="row margin-bottom-30">
                <div class="col-md-1"></div>
                <div class="col-md-5">
                    
                    <div class="templatemo-panels">
                        <div class="panel panel-primary">
                            <div class="panel-heading">
                                <span style="font-size: 20px; font-weight: bold;">ChimerKB</span>
                            </div>
                            <div class="panel-body">
                                <table class="table table-striped">
                                    <tbody>
                                      <tr>
                                        <td>Literature Curation</td>
                                        <td>147</td>
                                      </tr>
                                      <tr>
                                        <td>COSMIC_recurrent</td>
                                        <td>285</td>
                                      </tr>
                                      <tr>
                                        <td>COSMIC_nonrecurrent</td>
                                        <td>337</td>
                                      </tr>
                                      <tr>
                                        <td>mRNA Sequence</td>
                                        <td>949</td>
                                      </tr>
                                      <tr>
                                        <td>Mitelman, OMIM</td>
                                        <td>540</td>
                                      </tr>
                                      <tr>
                                        <td>GenBank</td>
                                        <td>40</td>
                                      </tr>
                                    </tbody>
                                </table>
                                  <br>
                                  <table class="table table-striped">
                                    <tbody>
                                      <tr>
                                        <td>Total</td>
                                        <td>1,770</td>
                                      </tr>
                                      <tr>
                                        <td>&nbsp;&nbsp;KnownBP</td>
                                        <td>1,259 (97/1,162)</td>
                                      </tr>
                                      <tr>
                                        <td>&nbsp;&nbsp;ChimerSeq supported</td>
                                        <td>482</td>
                                      </tr>
                                      <tr>
                                        <td>&nbsp;&nbsp;ChimerPub supported</td>
                                        <td>318 (102)</td>
                                      </tr>
                                    </tbody>
                                  </table>
                            </div>
                        </div>
                    </div>
                    
                </div>
                <div class="col-md-5">
                    
                    <div class="templatemo-panels">
                        <div class="panel panel-primary">
                            <div class="panel-heading">
                                <span style="font-size: 20px; font-weight: bold;">ChimerSeq</span>
                            </div>
                            <div class="panel-body">
                                <table class="table table-striped">
                                    <tbody>
                                        <tr>
                                            <td></td>
                                            <td>Gene pairs</td>
                                            <td>Recurrent Gene pairs</td>
                                        </tr>
                                        <tr>
                                          <td>TCGA</td>
                                          <td>14,375</td>
                                          <td>1,086</td>
                                        </tr>
                                        <tr>
                                          <td>&nbsp;&nbsp;FusionScan</td>
                                          <td>5,789</td>
                                          <td>397</td>
                                        </tr>
                                        <tr>
                                          <td>&nbsp;&nbsp;TopHat-Fusion</td>
                                          <td>2,474</td>
                                          <td>364</td>
                                        </tr>
                                        <tr>
                                          <td>&nbsp;&nbsp;PRADA</td>
                                          <td>7,992</td>
                                          <td>318</td>
                                        </tr>
                                        <tr>
                                          <td>ChimerDB 2.0 SRA</td>
                                          <td>2,333</td>
                                          <td></td>
                                        </tr>
                                        <tr>
                                          <td>ChiTaRs</td>
                                          <td>16,494</td>
                                          <td></td>
                                        </tr>
                                    </tbody>
                                </table>
                                <br>
                                <table class="table table-striped">
                                    <tbody>
                                        <tr>
                                            <td>Total</td>
                                            <td>32,970</td>
                                        </tr>
                                        <tr>
                                            <td>&nbsp;&nbsp;ChimerKB supported</td>
                                            <td>482</td>
                                        </tr>
                                        <tr>
                                            <td>&nbsp;&nbsp;ChimerPub supported</td>
                                            <td>183 (63)</td>
                                        </tr>
                                    </tbody>
                                </table>

                            </div>
                        </div>
                    </div>
                    
                </div>
                <div class="col-md-1"></div>
            </div>
            
            
            
            <div class="row margin-bottom-30">
                <div class="col-md-1"></div>
                <div class="col-md-5">
                    
                    <div class="templatemo-panels">
                        <div class="panel panel-primary">
                            <div class="panel-heading">
                                <span style="font-size: 20px; font-weight: bold;">ChimerPub</span>
                            </div>
                            <div class="panel-body">
                                <table class="table table-striped">
                                    <tbody>
                                        <tr>
                                            <td></td>
                                            <td>All</td>
                                            <td>High Score only</td>
                                        </tr>
                                        <tr>
                                            <td>Total</td>
                                            <td>3,521</td>
                                            <td>462</td>
                                        </tr>
                                        <tr>
                                            <td>&nbsp;&nbsp;ChimerKB supported</td>
                                            <td>318</td>
                                            <td>102</td>
                                        </tr>
                                        <tr>
                                            <td>&nbsp;&nbsp;ChimerSeq supported</td>
                                            <td>183</td>
                                            <td>63</td>
                                        </tr>
                                        <tr>
                                            <td>&nbsp;&nbsp;Novel</td>
                                            <td>2,740</td>
                                            <td>347</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    
                </div>
                <div class="col-md-5">
                    
                    <div class="templatemo-panels">
                        <div class="panel panel-primary">
                            <div class="panel-heading">
                                <span style="font-size: 16px; font-weight: bold;">Number of fusion gene pairs from each module</span>
                            </div>
                            <div class="panel-body" style="text-align: center;">
                                <img alt="" src="resources/images/chimerdbv3_statistic_01.png" style="width: 85%; height: 85%;" />
                            </div>
                        </div>
                    </div>
                    
                </div>
                <div class="col-md-1"></div>
            </div>
            
        </div>
    </div>
</div>-->

<!-- content -->
<%@include file="part/footer.jsp" %>
</body>
</html>
