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

<script type="text/javascript" src="resources/js/msRstOfChimerKBp.js"></script>

</head>
<body>

    <%@include file="part/header.jsp" %>

    
<!-- content -->

<div id="main-wrapper">
    <div class="template-page-wrapper">
        <div class="templatemo-content-wrapper">
            
            <div class="row margin-bottom-30" style="margin-top: 30px;">
                <div class="col-md-1"></div>
                <div class="col-md-10">
                    
                    
                    <div class="templatemo-panels">

                            
                                <div class="panel panel-primary">
                                    <div class="panel-heading">
                                        <span style="font-size: 20px; font-weight: bold;">Result</span>
                                    </div>
                                    <div class="panel-body">
                                            <table id="chimerKbTbl" class="display compact hover" style="margin: 0 auto; " >
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
                                                        <th>ChimerDB_Type</th>
                                                        <th>webSource</th>
                                                        <th>H_gene</th>
                                                        <th>H_chr</th>
                                                        <th>H_position</th>
                                                        <th>H_strand</th>
                                                        <th>T_gene</th>
                                                        <th>T_chr</th>
                                                        <th>T_position</th>
                                                        <th>T_strand</th>
                                                        <th>Genomic_breakpoint</th>
                                                        <th>Exon_breakpoint</th>
                                                        <th>Genome_Build_Version</th>
                                                        <th>H_tanscript</th>
                                                        <th>H_exon</th>
                                                        <th>T_tanscript</th>
                                                        <th>T_exon</th>
                                                        <th>Validation</th>
                                                        <th>H_locus</th>
                                                        <th>T_locus</th>
                                                        <th>Kinase</th>
                                                        <th>Oncogene</th>
                                                        <th>Tumor_suppressor</th>
                                                        <th>Receptor</th>
                                                        <th>Transcription_Factor</th>
                                                        <th>ChimerSeq</th>
                                                        <th>ChimerPub</th>
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
                                                            
                                                            <td><c:out value="${chimerKbLst.getChimerDB_Type()}" /></td>
                                                            <td><c:out value="${chimerKbLst.getWebSource()}" /></td>
                                                            <td><c:out value="${chimerKbLst.getH_gene()}" /></td>
                                                            <td><c:out value="${chimerKbLst.getH_chr()}" /></td>
                                                            <td><c:out value="${chimerKbLst.getH_position()}" /></td>
                                                            <td><c:out value="${chimerKbLst.getH_strand()}" /></td>
                                                            <td><c:out value="${chimerKbLst.getT_gene()}" /></td>
                                                            <td><c:out value="${chimerKbLst.getT_chr()}" /></td>
                                                            <td><c:out value="${chimerKbLst.getT_position()}" /></td>
                                                            <td><c:out value="${chimerKbLst.getT_strand()}" /></td>
                                                            <td><c:out value="${chimerKbLst.getGenomic_breakpoint()}" /></td>
                                                            <td><c:out value="${chimerKbLst.getExon_breakpoint()}" /></td>
                                                            <td><c:out value="${chimerKbLst.getGenome_Build_Version()}" /></td>
                                                            <td><c:out value="${chimerKbLst.getH_tanscript()}" /></td>
                                                            <td><c:out value="${chimerKbLst.getH_exon()}" /></td>
                                                            <td><c:out value="${chimerKbLst.getT_tanscript()}" /></td>
                                                            <td><c:out value="${chimerKbLst.getT_exon()}" /></td>
                                                            <td><c:out value="${chimerKbLst.getValidation()}" /></td>
                                                            <td><c:out value="${chimerKbLst.getH_locus()}" /></td>
                                                            <td><c:out value="${chimerKbLst.getT_locus()}" /></td>
                                                            <td><c:out value="${chimerKbLst.getKinase()}" /></td>
                                                            <td><c:out value="${chimerKbLst.getOncogene()}" /></td>
                                                            <td><c:out value="${chimerKbLst.getTumor_suppressor()}" /></td>
                                                            <td><c:out value="${chimerKbLst.getReceptor()}" /></td>
                                                            <td><c:out value="${chimerKbLst.getTranscription_Factor()}" /></td>
                                                            <td><c:out value="${chimerKbLst.getChimerSeq()}" /></td>
                                                            <td><c:out value="${chimerKbLst.getChimerPub()}" /></td>
                                                        </tr>
                                                    </c:forEach>
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
                <div class="col-md-10">
                    
                    <div class="templatemo-panels">
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
                                            <td>Validation Method</td>
                                            <td colspan="2" id="srt_td_validation_mtd" style="text-align: center;"></td>
                                        </tr>
                                        <tr>
                                            <td>PMID</td>
                                            <td colspan="2" id="srt_td_pmid" style="text-align: center;"></td>
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
                <div class="col-md-1"></div>
            </div>
            
            <div class="row margin-bottom-30">
                <div class="col-md-1"></div>
                <div class="col-md-10">
                    
                    <div class="templatemo-panels">
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
                <div class="col-md-1"></div>
            </div>
            
        </div>
    </div>
</div>



    
    


<!-- Modal -->
<div class="modal fade" id="genedescmodal" tabindex="-1" role="dialog">
<div class="modal-dialog" role="document">
<div class="modal-content">
<div class="modal-header">
<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
<h4 class="modal-title">ChimerKB</h4>
</div>
<div class="modal-body">
    
    <div class="templatemo-panels">
        <div class="panel panel-primary">
            <div class="panel-heading"></div>
            <div class="panel-body" style="text-align: center;">
                
                <table class="table table-striped table-bordered table-hover" style="width: 100%;">
                    <tr>
                        <td rowspan="2">Fusion Gene(5'_3')</td>
                        <td colspan="2" id="td_fusion_gene"></td>
                    </tr>
                    <tr>
                        <td>5' Gene</td>
                        <td>3' Gene</td>
                    </tr>
                    <tr>
                        <td>Gene Name</td>
                        <td id="td_5gene_nm"></td>
                        <td id="td_3gene_nm"></td>
                    </tr>
                    <tr>
                        <td>Chromosome</td>
                        <td id="td_5g_chr_nm"></td>
                        <td id="td_3g_chr_nm"></td>
                    </tr>
                    <tr>
                        <td>Junction(Exon BreakPoint)</td>
                        <td id="td_5g_junc_point"></td>
                        <td id="td_3g_junc_point"></td>
                    </tr>
                    <tr>
                        <td>Strand</td>
                        <td id="td_5g_strand"></td>
                        <td id="td_3g_strand"></td>
                    </tr>
                    <tr>
                        <td>Function</td>
                        <td colspan="2" id="td_5g_3g_func"></td>
                    </tr>
                    <tr>
                        <td>ChimerDB Type</td>
                        <td colspan="2" id="td_chimerdb_type"></td>
                    </tr>
                    <tr>
                        <td>Source</td>
                        <td colspan="2" id="td_source"></td>
                    </tr>
                    <tr>
                        <td>Genome Build Version</td>
                        <td colspan="2" id="td_genome_build_ver"></td>
                    </tr>
                    <tr>
                        <td>Disease</td>
                        <td colspan="2" id="td_disease"></td>
                    </tr>
                    <tr>
                        <td>Validation Method</td>
                        <td colspan="2" id="td_validation_mtd"></td>
                    </tr>
                    <tr>
                        <td>PMID</td>
                        <td colspan="2" id="td_pmid"></td>
                    </tr>
                    <tr>
                        <td>Frame</td>
                        <td colspan="2" id="td_frame"></td>
                    </tr>
                    <tr>
                        <td>Chromosome Information</td>
                        <td colspan="2" id="td_chr_info"></td>
                    </tr>
                    <tr>
                        <td>Supported</td>
                        <td colspan="2" id="td_supported"></td>
                    </tr>

                </table>
                
                
            </div>
        </div>
    </div>
    
    
</div>
<div class="modal-footer">
<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
</div>
</div>
</div>
</div>
                            



<form id="resultmain_form" method="POST" action="msrstofchimerkb.cdb">
        
        
    <input id="key_a_search_type" type="hidden" name="key_a_search_type" />
    <input id="key_data_for_search_type" type="hidden" name="key_data_for_search_type" />

    <input id="key_selt_the_websource" type="hidden" name="key_selt_the_websource" />

    <input id="key_kb_selt_the_source" type="hidden" name="key_kb_selt_the_source" />
    <input id="key_kb_selt_the_breakpoint" type="hidden" name="key_kb_selt_the_breakpoint" />
    <input id="key_kb_selt_the_validtn_mtd" type="hidden" name="key_kb_selt_the_validtn_mtd" />

    <input id="key_flt_by_func" type="hidden" name="key_flt_by_func" />
    <input id="key_flt_by_fusn_type" type="hidden" name="key_flt_by_fusn_type" />
    <input id="key_flt_by_supted_info" type="hidden" name="key_flt_by_supted_info" />

</form>
                                
                                
<%@include file="part/footer.jsp" %>

</body>
</html>
