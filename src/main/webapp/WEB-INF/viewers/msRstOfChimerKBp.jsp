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
    
    .dataTables_length{
        margin-top: 10px;
    }
    .dataTables_info{
        text-align: center;
    }
</style>
<script type="text/javascript" src="resources/js/jq/jquery-1.11.2.min.js"></script>
<script type="text/javascript" src="resources/js/js/bootstrap.min.js"></script>
<script type="text/javascript" src="resources/js/dt/d3.min.js"></script>

<script type="text/javascript" src="resources/js/jqdt/jquery.dataTables.min.js"></script>
<script type="text/javascript" src="resources/js/jqdt/dataTables.tableTools.min.js"></script>

<script type="text/javascript" src="resources/js/templatemo_script.js"></script>
<script type="text/javascript" src="resources/js/hoy.js"></script>

<script type="text/javascript">
    var activatedTab = "<c:out value="${activated_tab}" />";
    var searchType = "<c:out value="${search_type}" />";
</script>

<script type="text/javascript" src="resources/js/msRstOfChimerKBp.js"></script>

</head>
<body>

    <%@include file="part/header.jsp" %>

    
<!-- content -->
<div class="container">
    
    
    <div class="row margin-bottom-30" style="margin-top: 30px; ">
                
                
            
        
            <div class="row margin-bottom-30">
                    <div class="templatemo-panels">

                            <div class="col-md-12">
                                <div class="panel panel-primary">
                                    <div class="panel-heading">
                                    </div>
                                    <div class="panel-body">
                                            <table id="chimerKbTbl" class="hover" style="margin: 0 auto; " >
                                                <thead>
                                                    <tr>
                                                        <th>Fusion Gene(5'_3')</th>
                                                        <th>5 Gene Junction</th>
                                                        <th>3 Gene Junction</th>
                                                        <th>Breakpoint Type</th>
                                                        <th>Disease</th>
                                                        <th>Frame</th>
                                                        <th>Chromosome Info.</th>
                                                        <th>Source</th>
                                                        <th>Supported</th>
                                                        <th>PMID</th>
                                                    </tr>
                                                </thead>

                                                <tbody>
                                                    <c:forEach var="chimerKbLst" items="${chimerKb_lst}">
                                                        <tr>
                                                            <td><c:out value="${chimerKbLst.getFusion_pair()}" /></td>
                                                            <td><c:out value="${chimerKbLst.getGene5Junc()}" /></td>
                                                            <td><c:out value="${chimerKbLst.getGene3Junc()}" /></td>
                                                            <td><c:out value="${chimerKbLst.getBreakpoint_Type()}" /></td>
                                                            <td><c:out value="${chimerKbLst.getDisease()}" /></td>
                                                            <td><c:out value="${chimerKbLst.getFrame()}" /></td>
                                                            <td><c:out value="${chimerKbLst.getChr_info()}" /></td>
                                                            <td><c:out value="${chimerKbLst.getSource()}" /></td>
                                                            <td style="text-align: center;">
                                                                <c:choose>
                                                                    <c:when test="${chimerKbLst.getChimerSeq() == 1}">
                                                                        <img alt="ChimerSeq" src="resources/images/icons/icseq.png" style="width: 16px; height: 16px;" />&nbsp;&nbsp;
                                                                    </c:when>
                                                                    <c:when test="${chimerKbLst.getChimerPub() == 1}">
                                                                        <img alt="ChimerSeq" src="resources/images/icons/icpub.png" style="width: 16px; height: 16px;" />
                                                                    </c:when>
                                                                </c:choose>
                                                            </td>
                                                            <td><c:out value="${chimerKbLst.getPMID()}" /></td>
                                                        </tr>
                                                    </c:forEach>
                                                </tbody>
                                        </table>
                                        
                                        
                                    </div>
                                </div>
                            </div>

                    </div>
            </div>
        
        
            <div class="templatemo-panels">
                    
                    <div class="col-md-12">
                        <div class="panel panel-primary">
                            <div class="panel-heading">
                                <span style="font-size: 20px; font-weight: bold;">Xxxx Xxxx XXX</span>
                            </div>
                            <div class="panel-body" style="text-align: center;">
                                
                            </div>
                        </div>
                    </div>

            </div>
        
        
        
        <div class="templatemo-panels">
                    
                    <div class="col-md-12">
                        <div class="panel panel-primary">
                            <div class="panel-heading">
                                <span style="font-size: 20px; font-weight: bold;">Query</span>
                            </div>
                            <div class="panel-body" style="text-align: left;">
                                <c:out value="${output_query_str}" />
                            </div>
                        </div>
                    </div>

            </div>
        
        
            
        
    </div>
    
    
    
            
            
            

    
    
    
</div>
<%@include file="part/footer.jsp" %>

</body>
</html>
