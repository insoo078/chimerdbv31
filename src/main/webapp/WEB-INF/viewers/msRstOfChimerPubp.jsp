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
</style>
<script type="text/javascript" src="resources/js/jq/jquery-1.12.4.min.js"></script>
<script type="text/javascript" src="resources/js/bootstrap.min.js"></script>
<script type="text/javascript" src="resources/js/dt/d3.min.js"></script>

<script type="text/javascript" src="resources/js/jqdt/jquery.dataTables.min.js"></script>
<script type="text/javascript" src="resources/js/jqdt/dataTables.tableTools.min.js"></script>

<script type="text/javascript" src="resources/js/templatemo_script.js"></script>
<script type="text/javascript" src="resources/js/hoy.js"></script>

<script type="text/javascript">
    var activatedTab = "<c:out value="${activated_tab}" />";
    var searchType = "<c:out value="${search_type}" />";
</script>

<script type="text/javascript" src="resources/js/msRstOfChimerPubp.js"></script>

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
                                            <table id="chimerPubTbl" class="display compact hover" style="margin: 0 auto; " >
                                                <thead>
                                                    <tr>
                                                        <th>Fusion Gene(5'_3')</th>
                                                        <th>Translocation</th>
                                                        <th>Function</th>
                                                        <th>Disease</th>
                                                        <th>Supported</th>
                                                        <th>PMID</th>
                                                        <th>H_gene</th>
                                                        <th>T_gene</th>
                                                    </tr>
                                                </thead>

                                                <tbody>
                                                    <c:forEach var="chimerpubLst" items="${chimerpub_lst}">
                                                        <tr>
                                                            <td><c:out value="${chimerpubLst.getFusion_pair()}" /></td>
                                                            <td><c:out value="${chimerpubLst.getTranslocation()}" /></td>
                                                            <td></td>
                                                            <td><c:out value="${chimerpubLst.getDisease()}" /></td>
                                                            <td style="text-align: center;">
                                                                <c:choose>
                                                                    <c:when test="${chimerpubLst.getChimerKB() == 1}">
                                                                        <img alt="ChimerSeq" src="images/icons/icseq.png" style="width: 16px; height: 16px;" />&nbsp;&nbsp;
                                                                    </c:when>
                                                                    <c:when test="${chimerpubLst.getChimerSeq() == 1}">
                                                                        <img alt="ChimerSeq" src="images/icons/icpub.png" style="width: 16px; height: 16px;" />
                                                                    </c:when>
                                                                </c:choose>
                                                            </td>
                                                            <td><c:out value="${chimerpubLst.getPMID()}" /></td>
                                                            <td><c:out value="${chimerpubLst.getH_gene()}" /></td>
                                                            <td><c:out value="${chimerpubLst.getT_gene()}" /></td>
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
                                <span style="font-size: 20px; font-weight: bold;">Title : </span>
                                <span id="selectedfusiongene" style="font-size: 20px; font-weight: bold;"></span>
                            </div>
                            <div class="panel-body">
                                
                                <table class="table table-striped" style="width: 95%; margin: 0px auto;">
                                    <tr>
                                        <td style="width: 20%;"></td>
                                        <td style="width: 25%;"></td>
                                        <td style="width: 25%;"></td>
                                        <td style="width: 30%; text-align: right;">
                                            <span id="journaltxt"></span>&nbsp;&nbsp;&nbsp;
                                            <span id="dateofpublicationtxt"></span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colspan="4" style="text-align: center;">
                                            <div id="selectedrowtitle"></div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colspan="4">
                                            <div id="abstracttxt"></div>
                                        </td>
                                    </tr>
                                </table>
                                
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
