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
<script type="text/javascript" src="resources/js/mdownloadp.js"></script>
</head>
<body>
    
    <%@include file="part/header.jsp" %>
    

<!-- content -->

<div id="main-wrapper">
    <div class="template-page-wrapper">
        <div class="templatemo-content-wrapper">
            
            <div class="row margin-bottom-30" style="margin-top: 30px;">
                <div class="col-md-1"></div>
                <div class="col-md-10" style="background-color: #fdfdfd;">
                    
                    <div class="row margin-bottom-30" style="margin-left: 5px; margin-top: 15px;">
                        <span style="font-size: 30px; font-weight: bold; color: #428bca;">Download</span>
                    </div>
					<div class="row">
                        <div class="col-md-11 col-md-offset-1 margin-bottom-30">
							The whole content of the ChimerDB can be downloaded as : 
						</div>
					</div>
                    <div class="row" style="background: linear-gradient(#fdfdfd,#f3f3f3);">
                        <div class="col-md-11 col-md-offset-1 margin-bottom-30">
                            <div class="row margin-bottom-15">
									<span style="font-size: 15px; font-weight:bold;">&ndash;&nbsp;&nbsp;Database schema</span>
							</div>
							<div class="row margin-bottom-15">
								<div class="col-md-11 col-md-offset-1">
									<div><a href="resources/data/schema/chimerdb3.vpp">Entity Relational Diagram for Visual paradigm</a></div>
									<img alt="" src="resources/images/schema.png" style="width: 60%; height: 60%;" />
								</div>
							</div>

							<div class="row margin-bottom-15">
								<span style="font-size: 15px; font-weight:bold;">&ndash;&nbsp;&nbsp;MySQL database dumpfiles</span>
							</div>
							<div class="row margin-bottom-15">
								<div class="col-md-11 col-md-offset-1">
									<div><a href="resources/data/dump/ChimerDB3.0_ChimerKB.sql">ChimerDB : ChimerKB</a></div>
									<div><a href="resources/data/dump/ChimerDB3.0_ChimerPub.sql">ChimerDB : ChimerPub</a></div>
									<div><a href="resources/data/dump/ChimerDB3.0_ChimerSeq.sql">ChimerDB : ChimerSeq</a></div>
								</div>
							</div>
						</div>
				</div>
				<div class="col-md-1"></div>
			</div>            
        </div>
    </div>
</div>


<!-- content -->
<%@include file="part/footer.jsp" %>
</body>
</html>
