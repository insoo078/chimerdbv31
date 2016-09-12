<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<!DOCTYPE HTML>

<html>
<head>
<title>ChimerDB v3.0</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="keywords" content="" />
<meta name="description" content="" />
<meta name="viewport" content="width=device-width">

<link type="text/css" rel="stylesheet" href="resources/css/templatemo_main.css"/>
<link type="text/css" rel="stylesheet" href="resources/css/chimerdbv3.css"/>
<link type="text/css" rel="stylesheet" href="resources/css/index_main.css"/>

<link rel="stylesheet" href="resources/css/jquery-ui.css">

<script type="text/javascript" src="resources/js/jq/jquery-1.12.4.min.js"></script>
<script type="text/javascript" src="resources/js/jq/jquery-ui.js"></script>
<script type="text/javascript" src="resources/js/bootstrap.min.js"></script>
<script type="text/javascript" src="resources/js/templatemo_script.js"></script>
<script type="text/javascript" src="resources/js/jqlib/jQuery.equalHeights.js"></script>
<script type="text/javascript" src="resources/js/hoy.js"></script>
<script type="text/javascript" src="resources/js/mchimerseqp.js"></script>

</head>
<body>
    <%@include file="part/header.jsp" %>
    
	<!-- content -->
	<form:form method="POST" commandName="chimerSeqQueryForm" action="msrstofchimerseq.cdb">
		<div id="main-wrapper">
			<div class="template-page-wrapper">
				<div class="templatemo-content-wrapper">
					<div class="row margin-bottom-30" style="margin-top: 30px;">
						<div class="col-md-1"></div>
						<div class="col-md-10" style="background-color: #fdfdfd;">
							<div class="row margin-bottom-30" style="margin-left: 5px; margin-top: 15px;">
								<span style="font-size: 30px; font-weight: bold; color: #428bca;">Search</span>
							</div>
							<div class="row" style="background: linear-gradient(#fdfdfd,#f3f3f3);">

								<div class="chimerkbsearchdiv col-md-11 col-md-offset-1 margin-bottom-30">

										<div class="col-md-4" style="border-right: 2px #999999 dotted;">

											<div class="row margin-bottom-15">
												<div class="col-md-7">
													<label class="radio-inline" style="font-weight: bold; margin-right: 20px;">
														<form:radiobutton path="searchType" value="byGene"/>Gene
													</label>
													<label class="checkbox-inline">
														<form:checkbox path="byGene5Prime" value="on"/>5'
													</label>
													<label class="checkbox-inline">
														<form:checkbox path="byGene3Prime" value="on"/>3'
													</label>
												</div>
												<div class="col-md-5">
													<form:input path="byGeneTxt" value="ALK" class="form-control"/>
												</div>
											</div>

											<div class="row">
												<div class="col-md-6">
													<label class="radio-inline" style="font-weight: bold;">
														<form:radiobutton path="searchType" value="byGenePair"/>Gene pair
													</label>
												</div>
												<div class="col-md-6">
													<form:input path="byGenePairTxt" value="EML4_ALK" class="form-control"/>
												</div>
											</div>

										</div>
										<div class="col-md-4" style="border-right: 2px #999999 dotted;">
											<div class="row margin-bottom-15">
												<div class="col-md-4">
													<label class="radio-inline" style="font-weight: bold;">
														<form:radiobutton path="searchType" value="byDisease"/>Disease
													</label>
												</div>
												<div class="col-md-8">
													<form:input path="byDiseaseTxt" value="Adenocarcinoma (CA ad)." class="form-control"/>
												</div>
											</div>
										</div>
										<div class="col-md-4" style="text-align: center;">
											<label class="radio-inline" style="font-weight: bold;">
												<form:radiobutton path="searchType" value="all_genes"/>Show all entries
											</label>
										</div>
								</div>
							</div>

						</div>
						<div class="col-md-1"></div>
					</div>

					<div id="option-Panel" class="row margin-bottom-30">
						<div class="col-md-1"></div>
						<div class="col-md-10" style="background-color: #fdfdfd;">

							<div class="row margin-bottom-30" style="margin-left: 5px; margin-top: 15px;">
								<span class="bold-sub-title">Options</span>
							</div>
							<div class="row" style="background: linear-gradient(#fdfdfd,#f3f3f3);">
								<div class="col-md-11 col-md-offset-1 margin-bottom-30">
									<div class="row margin-bottom-15">
										<span style="font-size: 15px; font-weight:bold;">&ndash;&nbsp;&nbsp;Data Source</span>
									</div>
									<div class="row margin-bottom-15">
										<div class="col-md-11 col-md-offset-1">
											<label class="checkbox-inline"><input type="checkbox" id="chkAllOptions" checked="true"/>All Sources</label>
										</div>
									</div>

									<div class="row margin-bottom-15">
										<div class="col-md-11 col-md-offset-1">
											<label class="checkbox-inline"><form:checkbox path="chkTcgaOption" value="on" checked="true"/>TCGA RNA-Seq</label>
										</div>
									</div>

									<div class="row margin-bottom-15">
										<div class="col-md-4 col-md-offset-2">
											<div class="row">
												<span style="font-size: 15px;">&ndash;&nbsp;&nbsp;Cancer type</span>
											</div>
											<div class="row">
												<div class="col-md-11 col-md-offset-1">
													<form:select path="tcgaCancerTypes" class="form-control" size="6" style="width: 190px; margin-top: 10px;" multiple="true">
														<form:option id="cancer-type-all" value="All cancer types" selected="true"/>
														<c:if test="${not empty cancer_type}">
															<c:forEach var="type" items="${cancer_type}">
																<form:option class='cancer-type' value="${type}" selected="true"/>
															</c:forEach>
														</c:if>
													</form:select>
												</div>
											</div>
											<div class="row">
												<div class="col-md-11 col-md-offset-1">
													<span style="font-size: 13px;">* Use Ctrl or Command key for multiple selection.</span>
												</div>
											</div>
										</div>
										<div class="col-md-6" id="fusion_prediction_tool_options">
											<div class="row">
												<span style="font-size: 15px;">&ndash;&nbsp;&nbsp;Fusion prediction tool</span>
											</div>

											<div class="row">
												<div class="col-md-11 col-md-offset-1">
													<table>
														<tr>
															<td><label class="checkbox-inline"><form:checkbox path="chkFusionScan" value="on" checked="true"/>FusionScan</label></td>
															<td><span style="font-size: 13px;">Number of seed reads &#62;&#61;</span></td>
															<td><form:input path="noOfSeedReads" class="form-control" style="width: 70px; height: 25px;" value="2"/></td>
														</tr>
													</table>
												</div>
											</div>

											<div class="row">
												<div class="col-md-11 col-md-offset-1">
													<table>
														<tr>
															<td><label class="checkbox-inline"><form:checkbox path="chkTophat" value="on" checked="true"/>TopHat-Fusion</label></td>
															<td><span style="font-size: 13px;">Number of spanning pairs &#62;&#61;</span></td>
															<td><form:input path="noOfSpaningPairs" class="form-control" style="width: 70px; height: 25px;" value="100"/></td>
														</tr>
													</table>
												</div>
											</div>

											<div class="row">
												<div class="col-md-11 col-md-offset-1">
													<table>
														<tr>
															<td><label class="checkbox-inline"><form:checkbox path="chkPrada" value="on" checked="true"/>PRADA</label></td>
															<td><span style="font-size: 13px;">Number of junction reads &#62;&#61;</span></td>
															<td><form:input path="noOfJunctionReads" class="form-control" style="width: 70px; height: 25px;" value="2"/></td>
														</tr>
													</table>
												</div>
											</div>
										</div>
									</div>

									<div class="row margin-bottom-15">
										<div class="col-md-11 col-md-offset-1">
											<label class="checkbox-inline"><form:checkbox path="chkChimerDbV2" value="on" checked="true"/>ChimerDB 2.0 SRA</label>
										</div>
									</div>
									<div class="row margin-bottom-15">
										<div class="col-md-11 col-md-offset-1">
											<label class="checkbox-inline"><form:checkbox path="chkChiTaRs" value="on" checked="true"/>ChiTaRs</label>
										</div>
									</div>

								</div>
							</div>
						</div>
						<div class="col-md-1"></div>
					</div>


					<div id="filter-Panel" class="row margin-bottom-30">
						<div class="col-md-1"></div>
						<div class="col-md-10" style="background-color: #fdfdfd;">

							<div class="row margin-bottom-30" style="margin-left: 5px; margin-top: 15px;">
								<span class="bold-sub-title">Filters</span>
							</div>
							<div class="row" style="background: linear-gradient(#fdfdfd,#f3f3f3);">
								
								<div class="col-md-11 col-md-offset-1 margin-bottom-30">
									<div class="row margin-bottom-15">
										
										<div class="row margin-bottom-15">
											<div class="col-md-3">
												<span style="font-size: 15px; font-weight:bold;">&ndash;&nbsp;&nbsp;Function</span>
											</div>
											<div class="col-md-9">
												<label class="checkbox-inline"><form:checkbox path="chkKinaseFusion" value="on"/>Kinase</label>
												<label class="checkbox-inline"><form:checkbox path="chkOncogene" value="on"/>Oncogene</label>
												<label class="checkbox-inline"><form:checkbox path="chkTumorSuppressor" value="on"/>Tumor suppressor</label>
												<label class="checkbox-inline"><form:checkbox path="chkReceptor" value="on"/>Receptor</label>
												<label class="checkbox-inline"><form:checkbox path="chkTranscriptionFactor" value="on"/>Transcription factor</label>
											</div>
										</div>

										<div class="row margin-bottom-15">
											<div class="col-md-3">
												<span style="font-size: 15px; font-weight:bold;">&ndash;&nbsp;&nbsp;Function type</span>
											</div>
											<div class="col-md-9">
												<label class="checkbox-inline"><form:checkbox path="chkInterChromosomal" value="on"/>Inter chromosomal</label>
												<label class="checkbox-inline"><form:checkbox path="chkIxtraChromosomal" value="on"/>Intra chromosomal</label>
											</div>
										</div>


										<div class="row margin-bottom-15">
											<div class="col-md-3">
												<span style="font-size: 15px; font-weight:bold;">&ndash;&nbsp;&nbsp;Supporting information</span>
											</div>
											<div class="col-md-9">
												<label class="checkbox-inline" id="chimrKb_fbySupot_chimrSeqS_lvl"><form:checkbox path="chkChimerKbSupport" value="on"/>ChimerSeq supported</label>
												<label class="checkbox-inline" id="chimrKb_fbySupot_chimrPubS_lvl"><form:checkbox path="chkChimerPubSupport" value="on"/>ChimerPub supported</label>
											</div>
										</div>
									</div>
							</div>
						</div>
						<div class="col-md-1"></div>
					</div>
				</div>
			</div>
		</div>	<!-- end main-wrapper -->
		
		<div class="container">
			<div class="row margin-bottom-30" style="margin-top: 30px; ">

				<div class="col-md-12" style="text-align: right;">
					<button class="btn btn-primary" type="button" id="resetButton" style="width: 180px; height: 40px; font-size: 20px; font-weight: bold;" >
						<span class="fa fa-arrow-left"></span>&nbsp;&nbsp;Reset
					</button>
					<button class="btn btn-primary" type="button" style="width: 180px; height: 40px; font-size: 20px; font-weight: bold;" onclick="search();">
						Submit&nbsp;&nbsp;<span class="fa fa-arrow-right"></span>
					</button>
				</div>
			</div>
		</div>

	</form:form>

	<%@include file="part/footer.jsp" %>

</body>

</html>