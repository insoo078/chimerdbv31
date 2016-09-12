<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE HTML>

<html>
<head>
<title>ChimerDB v3.0</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="keywords" content="" />
<meta name="description" content="" />
<meta name="viewport" content="width=device-width">

<link type="text/css" rel="stylesheet" href="resources/css/bootstrap.min.css"/>
<link type="text/css" rel="stylesheet" href="resources/css/jquery-ui.min.css"/>
<link type="text/css" rel="stylesheet" href="resources/css/jquery.dataTables.min.css"/>
<link type="text/css" rel="stylesheet" href="resources/css/dataTables.tableTools.min.css"/>


<link type="text/css" rel="stylesheet" href="resources/css/templatemo_main.css"/>

<link type="text/css" rel="stylesheet" href="resources/css/chimerdbv3.css"/>
<style type="text/css">
    .kFont{font-weight: bold;color: #F00;}
    .base_line{
        stroke:#bbbbbb;
        opacity:0.5;
    }
    .fu_rect{
        fill:red;
        stroke:black;
        stroke-width:5;
        opacity:0.5;
    }
    
    .rslt_tbl_row{
        font-size: 12px;
    }
</style>
<script type="text/javascript" src="resources/js/jq/jquery-1.12.4.min.js"></script>
<script type="text/javascript" src="resources/js/jq/jquery-ui.js"></script>
<script type="text/javascript" src="resources/js/bootstrap.min.js"></script>
<!--<script type="text/javascript" src="resources/js/dt/d3.min.js"></script>-->
<script src="http://d3js.org/d3.v3.min.js"></script>

<script type="text/javascript" src="resources/js/jqdt/jquery.dataTables.min.js"></script>
<script type="text/javascript" src="resources/js/jqdt/dataTables.tableTools.min.js"></script>

<script type="text/javascript" src="resources/js/templatemo_script.js"></script>
<script type="text/javascript" src="resources/js/hoy.js"></script>



<link type="text/css" rel="stylesheet" href="resources/ideogram/src/css/ideogram.css"/>
<link type="text/css" rel="stylesheet" href="resources/ideogram/src/css/chimerdbv3.css"/>
  
<script src="http://labratrevenge.com/d3-tip/javascripts/d3.tip.v0.6.3.js"></script>
<script type="text/javascript" src="resources/ideogram/src/js/es6-promise.js"></script>
<script type="text/javascript" src="resources/ideogram/src/js/d3.promise.js"></script>
<script type="text/javascript" src="resources/ideogram/src/js/chimerdbv3.js"></script>

<!--<script type="text/javascript">
    var activatedTab = "<c:out value="${activated_tab}" />";
    var searchType = "<c:out value="${search_type}" />";
</script>-->

<script type="text/javascript" src="resources/js/msRstOfChimerSeqp.js"></script>

</head>
<body>

<%@include file="part/header.jsp" %>

<input type="hidden" id="queryFormData" value="<c:out value='${queryForm}'/>"/>

<!-- content -->
<div class="container">
	<div class="row margin-bottom-30" style="margin-top: 30px; ">
		<div class="templatemo-panels">
			<div class="col-md-12">
				<div class="panel panel-primary">
					<div class="panel-heading">
					</div>
					<div class="panel-body">
						<table id="chimerSeqTbl" class="hover" style="margin: 0 auto; " >
							<thead>
								<tr>
									<td>Fusion Pair(5'_3')</td>
									<td>5 Gene Junction</td>
									<td>3 Gene Junction</td>
									<td>Breakpoint Type</td>
									<td>Cancer Type</td>
									<td>TCGA Sample Id</td>
									<td>Frame</td>
									<th>Chromosome Info.</th>
									<td>Source</td>
									<td>Supported</td>
									<td>id</td>
									<td>h_gene</td>
									<td>t_gene</td>
									<td>h_chr</td>
									<td>t_chr</td>
								</tr>
							</thead>
						</table>
					</div>
				</div>
			</div>
		</div>

		<div class="templatemo-panels">
			<div class="col-md-12">
				<div class="panel panel-primary">
					<div class="panel-heading">
						<span style="font-size: 20px; font-weight: bold;">Fusion structure</span>
					</div>
					<div class="panel-body" style="text-align: left;">
						<div id="chimer-seq-viewer-controller">
							<div class="controller-header">Controller</div>
							<div class='controller'>
								<span style="margin-left:10px;">Move</span>
								<button class='w3-btn w3-light-grey w3-border' id='move_left_1000'><<</button>
								<button class='w3-btn w3-light-grey w3-border' id='move_left'><</button>
								<button class='w3-btn w3-light-grey w3-border' id='move_right'>></button>
								<button class='w3-btn w3-light-grey w3-border' id='move_right_1000'>>></button>
								
								<span style="margin-left:10px;">Zoom in</span>
								<button class='w3-btn w3-light-grey w3-border' id='zoom_in'>x1.1</button>
								<button class='w3-btn w3-light-grey w3-border' id='zoom_in_15x'>x1.5</button>
								<button class='w3-btn w3-light-grey w3-border' id='zoom_in_30x'>x3</button>
								
								<span style="margin-left:10px;">Zoom out</span>
								<button class='w3-btn w3-light-grey w3-border' id='zoom_out'>x1.1</button>
								<button class='w3-btn w3-light-grey w3-border' id='zoom_out_15x'>x1.5</button>
								<button class='w3-btn w3-light-grey w3-border' id='zoom_out_30x'>x3</button>

								<span style="margin-left:10px;">Fit 2 screen</span>
								<button class='w3-btn w3-light-grey w3-border' id='controller_init'>Fit</button>
							</div>
						</div>
						<div id="chimer-seq-viewer-content"></div>
					</div>
				</div>
			</div>
		</div>

		<div class="templatemo-panels">
			<div class="col-md-12">
			<div class="panel panel-primary">
				<div class="panel-heading">
					<span style="font-size: 20px; font-weight: bold;">Fusion Gene(5'_3') : </span>
					<span id="selectedrowtitle" style="font-size: 20px; font-weight: bold;"></span>
				</div>
				<div class="panel-body" id="selectedrowcontent">
						<table class="table table-striped table-bordered table-hover" style="width: 80%; margin: 0px auto;">
							<tr>
								<td style="width: 24%; background: none;"></td>
								<td style="width: 38%; text-align: center;">5' Gene</td>
								<td style="width: 38%; text-align: center;">3' Gene</td>
							</tr>
							<tr>
								<td>Gene Name</td>
								<td id="srt_td_5gene_nm" style="text-align: center;"></td>
								<td id="srt_td_3gene_nm" style="text-align: center;"></td>
							</tr>
							<tr>
								<td>Chromosome</td>
								<td id="srt_td_5g_chr_nm" style="text-align: center;"></td>
								<td id="srt_td_3g_chr_nm" style="text-align: center;"></td>
							</tr>
							<tr>
								<td>Junction(Exon BreakPoint)</td>
								<td id="srt_td_5g_junc_point" style="text-align: center;"></td>
								<td id="srt_td_3g_junc_point" style="text-align: center;"></td>
							</tr>
							<tr>
								<td>Strand</td>
								<td id="srt_td_5g_strand" style="text-align: center;"></td>
								<td id="srt_td_3g_strand" style="text-align: center;"></td>
							</tr>
							<tr>
								<td>Function</td>
								<td colspan="2" id="srt_td_5g_3g_func" style="text-align: center;"></td>
							</tr>
							<tr>
								<td>ChimerDB Type</td>
								<td colspan="2" id="srt_td_chimerdb_type" style="text-align: center;"></td>
							</tr>
							<tr>
								<td>Source</td>
								<td colspan="2" id="srt_td_source" style="text-align: center;"></td>
							</tr>
							<tr>
								<td>Genome Build Version</td>
								<td colspan="2" id="srt_td_genome_build_ver" style="text-align: center;"></td>
							</tr>
							<tr>
								<td>Disease</td>
								<td colspan="2" id="srt_td_disease" style="text-align: center;"></td>
							</tr>
							<tr>
								<td>TCGA Barcode</td>
								<td colspan="2" id="srt_td_tcga_barcode" style="text-align: center;"></td>
							</tr>
							<tr>
								<td>Cancer Type</td>
								<td colspan="2" id="srt_cancer_type" style="text-align: center;"></td>
							</tr>
							<tr>
								<td>Frame</td>
								<td colspan="2" id="srt_td_frame" style="text-align: center;"></td>
							</tr>
							<tr>
								<td>Chromosome Information</td>
								<td colspan="2" id="srt_td_chr_info" style="text-align: center;"></td>
							</tr>
							<tr>
								<td>Supported</td>
								<td colspan="2" id="srt_td_supported" style="text-align: center;"></td>
							</tr>

						</table>
				</div>
			</div>
			</div>
		</div>
	</div>

	<%@include file="part/footer.jsp" %>
    
</div>

</body>
</html>
