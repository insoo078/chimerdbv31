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
<script type="text/javascript" src="resources/js/dt/d3.min.js"></script>

<script type="text/javascript" src="resources/js/jqdt/jquery.dataTables.min.js"></script>
<script type="text/javascript" src="resources/js/jqdt/dataTables.tableTools.min.js"></script>

<script type="text/javascript" src="resources/js/templatemo_script.js"></script>
<script type="text/javascript" src="resources/js/hoy.js"></script>



<link type="text/css" rel="stylesheet" href="resources/ideogram/src/css/ideogram.css"/>
<link type="text/css" rel="stylesheet" href="resources/ideogram/src/css/chimerdbv3.css"/>
  

<script type="text/javascript" src="resources/ideogram/src/js/es6-promise.js"></script>
<script type="text/javascript" src="resources/ideogram/src/js/d3.promise.js"></script>
<!--<script type="text/javascript" src="resources/ideogram/src/js/chimerdbv3.viewer.js"></script>-->
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
									<td>Fusion Pair</td>
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
									<td>exon_breakpoint</td>
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
								<button class='w3-btn w3-light-grey w3-border' id='move_left_1000'><<</button>
								<button class='w3-btn w3-light-grey w3-border' id='move_left'><</button>
								<button class='w3-btn w3-light-grey w3-border' id='zoom-in'>+</button>
								<button class='w3-btn w3-light-grey w3-border' id='zomm-out'>-</button>
								<button class='w3-btn w3-light-grey w3-border' id='move_right_1000'>>></button>
								<button class='w3-btn w3-light-grey w3-border' id='move_right'>></button>
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
						<span style="font-size: 20px; font-weight: bold;">Fusion Structure (Image)</span>
					</div>
					<div class="panel-body" style="text-align: center;">
						<img alt="" src="./resources/images/exon_img.png" style="width: 95%; height: 95%;" />
					</div>
				</div>
			</div>
		</div>
	</div>

	<%@include file="part/footer.jsp" %>
    
</div>

</body>
</html>
