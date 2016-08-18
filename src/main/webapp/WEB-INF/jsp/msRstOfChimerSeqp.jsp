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

<link type="text/css" rel="stylesheet" href="css/bootstrap.min.css"/>
<link type="text/css" rel="stylesheet" href="css/jquery.dataTables.min.css"/>
<link type="text/css" rel="stylesheet" href="css/dataTables.tableTools.min.css"/>


<link type="text/css" rel="stylesheet" href="css/templatemo_main.css"/>

<link type="text/css" rel="stylesheet" href="css/chimerdbv3.css"/>
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
<script type="text/javascript" src="jq/jquery-1.11.2.min.js"></script>
<script type="text/javascript" src="js/bootstrap.min.js"></script>
<script type="text/javascript" src="dt/d3.min.js"></script>

<script type="text/javascript" src="jqdt/jquery.dataTables.min.js"></script>
<script type="text/javascript" src="jqdt/dataTables.tableTools.min.js"></script>

<script type="text/javascript" src="js/templatemo_script.js"></script>
<script type="text/javascript" src="js/hoy.js"></script>

<script type="text/javascript">
    var activatedTab = "<c:out value="${activated_tab}" />";
    var searchType = "<c:out value="${search_type}" />";
</script>

<script type="text/javascript" src="js/msRstOfChimerSeqp.js"></script>

</head>
<body>

    <%@include file="part/h.jsp" %>

    
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
                                                </tr>
                                            </thead>
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
                                <span style="font-size: 20px; font-weight: bold;">Fusion Structure</span>
                            </div>
                            <div class="panel-body" style="text-align: center;">
                                <img alt="" src="images/exon_img.png" style="width: 95%; height: 95%;" />
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
    
    
    
            
            
            

    
    <%@include file="part/f.jsp" %>
    
</div>


</body>
</html>