<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<html>
	<head>
		<title>ChimerSeq detail information</title>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<script type="text/javascript" src="resources/js/jq/jquery-1.12.4.min.js"></script>
		<script type="text/javascript" src="resources/js/jq/jquery-ui.js"></script>
		<script type="text/javascript">
			var pdata;
		</script>
		<script type="text/javascript">
			var pdata;
//            $(document).ready(function () {
//                
//            });
		</script>
	</head>
	<body>
		<div>
			<table>
				<tr><td rowspan="2">Funsion Gene(5'_3')</td><td colspan="2"><c:out value="${result.fusion_pair}"/></td></tr>
				<tr><td></td><td></td></tr>
				<tr><td>Gene Name</td><td></td><td></td></tr>
				<tr><td>Chromosome</td><td></td><td><c:out value="${result.h_chr}"/>-<c:out value="${result.t_chr}"/></td></tr>
				<tr><td>Junction(Exon BreakPoint)</td><td></td><td><c:out value="${result.exon_breakpoint}"/></td></tr>
				<tr><td>Strand</td><td></td><td><c:out value="${result.genomic_breakpoint}"/>-<c:out value="${result.exon_breakpoint}"/></td></tr>
				<tr><td>Function</td><td></td><td></td></tr>
				<tr><td>ChimerDB Type</td><td></td><td><c:out value="${result.chimerDB_Type}"/></td></tr>
				<tr><td>Source</td><td></td><td><c:out value="${result.source}"/></td></tr>
				<tr><td>Genome Build Version</td><td></td><td></td></tr>
				<tr><td>Cancer Type</td><td></td><td><c:out value="${result.cancertype}"/></td></tr>
				<tr><td>TCGA Sample Id</td><td></td><td></td></tr>
				<tr><td>Seed reads num</td><td></td><td><c:out value="${result.seed_reads_num}"/></td></tr>
				<tr><td>Spanning pairs num</td><td></td><td><c:out value="${result.spanning_pairs_num}"/></td></tr>
				<tr><td>Junction reads num</td><td></td><td><c:out value="${result.junction_reads_num}"/></td></tr>
				<tr><td>Frame</td><td></td><td><c:out value="${result.frame}"/></td></tr>
				<tr><td>Chromosome Information</td><td></td><td></td></tr>
				<tr><td>Supported</td><td></td><td><c:out value="${result.supported}"/></td></tr>
			</table>
		</div>
	</body>
</html>
