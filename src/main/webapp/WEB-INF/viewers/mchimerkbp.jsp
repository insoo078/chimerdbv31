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
<link type="text/css" rel="stylesheet" href="resources/css/templatemo_main.css"/>

<link type="text/css" rel="stylesheet" href="resources/css/chimerdbv3.css"/>
<link type="text/css" rel="stylesheet" href="resources/css/index_main.css"/>

<script type="text/javascript" src="resources/js/jq/jquery-1.12.4.min.js"></script>
<script type="text/javascript" src="resources/js/jqui/jquery-ui.min.js"></script>
<script type="text/javascript" src="resources/js/bootstrap.min.js"></script>
<script type="text/javascript" src="resources/js/templatemo_script.js"></script>
<script type="text/javascript" src="resources/js/jqlib/jQuery.equalHeights.js"></script>
<script type="text/javascript" src="resources/js/hoy.js"></script>

<script type="text/javascript" src="resources/js/mchimerkbp.js"></script>

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
                        <span style="font-size: 30px; font-weight: bold; color: #428bca;">Search</span>
                    </div>
                    <div class="row" style="background: linear-gradient(#fdfdfd,#f3f3f3);">
                        
                        
                        <div class="chimerkbsearchdiv col-md-11 col-md-offset-1 margin-bottom-30">
                            
                                <div class="col-md-4" style="border-right: 2px #999999 dotted;">

                                    <div class="row margin-bottom-15">
                                        <div class="col-md-7">
                                            <label class="radio-inline" style="margin-right: 20px;">
                                                <input type="radio" name="search_type_rdo" id="search_type_rdo1" value="by_gene" >Gene
                                            </label>
                                            <label class="checkbox-inline">
                                                <input type="checkbox" id="by_gene_chk_5" value="5" >5'
                                            </label>
                                            <label class="checkbox-inline">
                                                <input type="checkbox" id="by_gene_chk_3" value="3" >3'
                                            </label>
                                        </div>
                                        <div class="col-md-5">
                                            <input id="by_gene_txt" class="form-control" title="type &quot;T&quot;" value="ALK" onfocus="clearText(this);" onblur="clearText(this);">
                                        </div>
                                    </div>

                                    <div class="row">
                                        <div class="col-md-6">
                                            <label class="radio-inline">
                                                <input type="radio" name="search_type_rdo" value="by_gene_pair">Gene pair
                                            </label>
                                        </div>
                                        <div class="col-md-6">
                                            <input id="by_gene_pair_txt" class="form-control" title="type &quot;T&quot;" value="EML4_ALK" onfocus="clearText(this);" onblur="clearText(this);">
                                        </div>
                                    </div>

                                </div>
                                <div class="col-md-4" style="border-right: 2px #999999 dotted;">
                                    <div class="row margin-bottom-15">
                                        <div class="col-md-4">
                                            <label class="radio-inline">
                                                <input type="radio" name="search_type_rdo" value="by_disease">Disease
                                            </label>
                                        </div>
                                        <div class="col-md-8">
                                            <input id="by_disease_txt" class="form-control" title="type &quot;T&quot;" style="width: 90%;" >
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4" style="text-align: center;">
                                    <label class="radio-inline">
                                        <input type="radio" name="search_type_rdo" value="all_genes" checked="checked">Show all entries
                                    </label>
                                </div>
                            
                        </div>
                        
                        
                        
                        
                    </div>
                    
                </div>
                <div class="col-md-1"></div>
            </div>
            
            <div class="row margin-bottom-30">
                <div class="col-md-1"></div>
                <div class="col-md-10" style="background-color: #fdfdfd;">
                    
                    <div class="row margin-bottom-30" style="margin-left: 5px; margin-top: 15px;">
                        <span style="font-size: 30px; font-weight: bold; color: #428bca;">Options</span>
                    </div>
                    <div class="row" style="background: linear-gradient(#fdfdfd,#f3f3f3);">
                        <div class="col-md-11 col-md-offset-1 margin-bottom-30">
                            <div class="row margin-bottom-15">
                                <span style="font-size: 15px;">&ndash;&nbsp;&nbsp;Data Source</span>
                            </div>
                            <div class="row margin-bottom-15">
                                <div class="col-md-11 col-md-offset-1">
                                    <label class="checkbox-inline" style="margin-right: 20px;"><input type="checkbox" id="chimrKb_1_litratr_chk" >Literature curation</label>
                                    <label class="checkbox-inline" style="margin-right: 20px;"><input type="checkbox" id="chimrKb_1_cosmic_chk" >COSMIC</label>
                                    <label class="checkbox-inline" style="margin-right: 20px;"><input type="checkbox" id="chimrKb_1_mrna_chk" >mRNA sequence</label>
                                    <label class="checkbox-inline"><input type="checkbox" id="chimrKb_1_etc_chk" checked="checked">Mitelman, OMIM, GenBank</label>
                                </div>
                            </div>
                            
                            
                            <div class="row margin-bottom-15">
                                <span style="font-size: 15px;">&ndash;&nbsp;&nbsp;Breakpoint Type</span>
                            </div>
                            <div class="row margin-bottom-15">
                                <div class="col-md-11 col-md-offset-1">
                                    <label class="checkbox-inline" style="margin-right: 20px;"><input type="checkbox" id="chimrKb_2_genomic_chk" onclick="chimerkb_breaktype_toggle('genomic');" >Genomic breakpoint</label>
                                    <label class="checkbox-inline" style="margin-right: 20px;"><input type="checkbox" id="chimrKb_2_exon_chk" onclick="chimerkb_breaktype_toggle('exon');" checked="checked">Exon breakpoint</label>
                                    <label class="checkbox-inline"><input type="checkbox" id="chimrKb_2_na_chk" onclick="chimerkb_breaktype_toggle('no');">No breakpoint information</label>
                                </div>
                            </div>
                            
                            <div class="row margin-bottom-15">
                                <span style="font-size: 15px;">&ndash;&nbsp;&nbsp;Validation Method</span>
                            </div>
                            <div class="row">
                                <div class="col-md-11 col-md-offset-1">
                                    <label class="checkbox-inline" style="margin-right: 20px;"><input type="checkbox" id="chimrKb_3_fish_chk" onclick="chimerkb_validatnmtd_toggle('fish');" >FISH</label>
                                    <label class="checkbox-inline" style="margin-right: 20px;"><input type="checkbox" id="chimrKb_3_sanger_chk" onclick="chimerkb_validatnmtd_toggle('sanger');" >SangerSeq</label>
                                    <label class="checkbox-inline" style="margin-right: 20px;"><input type="checkbox" id="chimrKb_3_rtpcr_chk" onclick="chimerkb_validatnmtd_toggle('pcr');" >RT-PCR</label>
                                    <label class="checkbox-inline"><input type="checkbox" id="chimrKb_3_none_chk" onclick="chimerkb_validatnmtd_toggle('no');" checked="checked">No evidence</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-1"></div>
            </div>
            
            <div class="row margin-bottom-30">
                <div class="col-md-1"></div>
                <div class="col-md-10" style="background-color: #fdfdfd;">
                    
                    <div class="row margin-bottom-30" style="margin-left: 5px; margin-top: 15px;">
                        <span style="font-size: 30px; font-weight: bold; color: #428bca;">Filter</span>
                    </div>
                    <div class="row" style="background: linear-gradient(#fdfdfd,#f3f3f3);">
                            <div class="col-md-11 col-md-offset-1 margin-bottom-30">
                                
                                <div class="row margin-bottom-15">
                                    <span style="font-size: 15px;">&ndash;&nbsp;&nbsp;Function</span>
                                </div>
                                <div class="row margin-bottom-15">
                                    <div class="col-md-11 col-md-offset-1">
                                        <label class="checkbox-inline" style="margin-right: 20px;"><input type="checkbox" id="chimrKb_fbyfunc_kinase_chk" >Kinase fusion</label>
                                        <label class="checkbox-inline" style="margin-right: 20px;"><input type="checkbox" id="chimrKb_fbyfunc_onco_chk" checked="checked">Oncogene</label>
                                        <label class="checkbox-inline" style="margin-right: 20px;"><input type="checkbox" id="chimrKb_fbyfunc_tumor_chk" >Tumor suppressor</label>
                                        <label class="checkbox-inline" style="margin-right: 20px;"><input type="checkbox" id="chimrKb_fbyfunc_recpt_chk" >Receptor</label>
                                        <label class="checkbox-inline"><input type="checkbox" id="chimrKb_fbyfunc_transcript_chk" checked="checked">Transcription factor</label>
                                    </div>
                                </div>

                                
                                <div class="row margin-bottom-15">
                                    <span style="font-size: 15px;">&ndash;&nbsp;&nbsp;Function Type</span>
                                </div>
                                <div class="row margin-bottom-15">
                                    <div class="col-md-11 col-md-offset-1">
                                        <label class="checkbox-inline" style="margin-right: 20px;"><input type="checkbox" id="chimrKb_fbyfusn_inter_chr_chk" value="inter_chr" checked="checked">Inter chromosomal</label>
                                        <label class="checkbox-inline"><input type="checkbox" id="chimrKb_fbyfusn_intra_chr_chk" value="intra_chr" >Intra chromosomal</label>
                                    </div>
                                </div>

                                
                                <div class="row margin-bottom-15">
                                    <span style="font-size: 15px;">&ndash;&nbsp;&nbsp;Supporting Information</span>
                                </div>
                                <div class="row">
                                    <div class="col-md-11 col-md-offset-1">
                                        <label class="checkbox-inline" id="chimrKb_fbySupot_chimrSeqS_lvl" style="margin-right: 20px;"><input type="checkbox" id="chimrKb_fbySupot_chimrSeqS_chk" >ChimerSeq supported</label>
                                        <label class="checkbox-inline" id="chimrKb_fbySupot_chimrPubS_lvl"><input type="checkbox" id="chimrKb_fbySupot_chimrPubS_chk" >ChimerPub supported</label>
                                    </div>
                                </div>
                            </div>
                    </div>
                </div>
                <div class="col-md-1"></div>
            </div>
            
        </div>
    </div>
</div>


<div class="container">
    
    
<!--            <div class="row margin-bottom-30" style="margin-top: 30px; ">
                    

                            <div class="col-md-11 col-md-offset-1">
                                
                                <div>
                                    <div class="radio" style="float: left; width: 230px;">
                                        <label><input type="radio" name="search_type_rdo" value="by_chr_locus">by chromosome locus</label>
                                    </div>
                                    <div style="float: left; width: 280px;">
                                        <input id="by_chr_locus_txt" class="form-control" style="width: 250px;" title="type &quot;T&quot;" value="2p23" onfocus="clearText(this);" onblur="clearText(this);">
                                    </div>
                                </div>
                            </div>

                    
            </div>-->
    
    
    
            
    
        
            

            <div class="row margin-bottom-30" style="margin-top: 30px; ">

                <div class="col-md-12" style="text-align: right;">
                    <button class="btn btn-primary" type="button" style="width: 180px; height: 40px; font-size: 20px; font-weight: bold;" onclick="resetall();" >
                        <span class="fa fa-arrow-left"></span>&nbsp;&nbsp;Reset
                    </button>
                    <button class="btn btn-primary" type="button" style="width: 180px; height: 40px; font-size: 20px; font-weight: bold;" onclick="searching();">
                        Submit&nbsp;&nbsp;<span class="fa fa-arrow-right"></span>
                    </button>

                    <!-- Button trigger modal 
                    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#chimerdb_modal" style="width: 200px; height: 33px; font-size: 20px; font-weight: bold;">
                        Submit&nbsp;&nbsp;<span class="fa fa-arrow-right"></span>
                    </button>
                    -->
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
            
            


<!-- Modal -->
<div class="modal fade" id="chimerdb_modal" tabindex="-1" role="dialog">
<div class="modal-dialog" role="document">
<div class="modal-content">
<div class="modal-header">
<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
<h4 class="modal-title">ChimerDB 3.0</h4>
</div>
<div class="modal-body">
    <table style="width: 100%;">
        <tr>
            <td style="text-align: center;">
                <span style="font-size: 23px; font-weight: bold; color: #fbb450;">Under Construction.</span>
            </td>
        </tr>
    </table>
</div>
<div class="modal-footer">
<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
</div>
</div>
</div>
</div>


<!-- Modal -->
<div class="modal fade" id="chimerdb_empty_data" tabindex="-1" role="dialog">
<div class="modal-dialog" role="document">
<div class="modal-content">
<div class="modal-header">
<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
<h4 class="modal-title">ChimerDB 3.0</h4>
</div>
<div class="modal-body">
    <table style="width: 100%;">
        <tr>
            <td style="text-align: center;">
                <span style="font-size: 23px; font-weight: bold; color: #fbb450;">Please enter your data.</span>
            </td>
        </tr>
    </table>
</div>
<div class="modal-footer">
<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
</div>
</div>
</div>
</div>

    
    
</div>
<%@include file="part/footer.jsp" %>

</body>

</html>
