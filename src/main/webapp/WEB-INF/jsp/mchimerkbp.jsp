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


<link type="text/css" rel="stylesheet" href="css/templatemo_main.css"/>
<link type="text/css" rel="stylesheet" href="css/chimerdbv3.css"/>
<link type="text/css" rel="stylesheet" href="css/index_main.css"/>

<script type="text/javascript" src="jq/jquery-1.11.2.min.js"></script>
<script type="text/javascript" src="js/bootstrap.min.js"></script>
<script type="text/javascript" src="js/templatemo_script.js"></script>

<script type="text/javascript" src="js/hoy.js"></script>
<script type="text/javascript" src="js/mchimerkbp.js"></script>

</head>
<body>

    <%@include file="part/h.jsp" %>
    
<!-- content -->
<div class="container">
        
    
    
            <div class="row margin-bottom-30" style="margin-top: 30px; ">
                    <div class="templatemo-panels">

                            <div class="col-md-12">
                                
                                
                                <div class="panel panel-primary">
                                    <div class="panel-heading"></div>
                                    <div class="panel-body" style="background-color: #dcdcdc;">
                                        
                                        
                                        
                                    
                                
                                
                                            <!-- ----------------- Top Component -----------------  -->
                                            <div style="padding: 30px 0px 30px 0px; margin-bottom: 10px; background-color: #fdfdfd;">

                                                <ul style="list-style: none;">
                                                    <li>
                                                        <span style="font-size: 20px; font-weight: bold;">&#9658;&nbsp;&nbsp;Search</span>
                                                        <ul style="list-style: none;">
                                                            <li>
                                                                <div class="radio">
                                                                    <label><input type="radio" name="search_type_rdo" value="all_genes" checked="checked">All genes</label>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div style="clear: both;">
                                                                    <div class="radio" style="float: left; width: 230px;">
                                                                        <label><input type="radio" name="search_type_rdo" value="by_gene">by gene</label>
                                                                    </div>
                                                                    <div style="float: left; width: 280px;">
                                                                        <input id="by_gene_txt" class="form-control" style="width: 250px;" title="type &quot;T&quot;" value="ALK" onfocus="clearText(this);" onblur="clearText(this);">
                                                                    </div>
                                                                    <div  style="float: left;">
                                                                        <label class="checkbox-inline"><input type="checkbox" id="by_gene_chk_5" value="5" >5'</label>&nbsp;&nbsp;
                                                                        <label class="checkbox-inline"><input type="checkbox" id="by_gene_chk_3" value="3" >3'</label>
                                                                    </div>
                                                                </div>
                                                            </li>

                                                            <li>
                                                                <div style="clear: both;">
                                                                    <div class="radio" style="float: left; width: 230px;">
                                                                        <label><input type="radio" name="search_type_rdo" value="by_gene_pair">by gene pair</label>
                                                                    </div>
                                                                    <div style="float: left; width: 280px;">
                                                                        <input id="by_gene_pair_txt" class="form-control" style="width: 250px;" title="type &quot;T&quot;" value="EML4_ALK" onfocus="clearText(this);" onblur="clearText(this);">
                                                                    </div>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div style="clear: both;">
                                                                    <div class="radio" style="float: left; width: 230px;">
                                                                        <label><input type="radio" name="search_type_rdo" value="by_chr_locus">by chromosome locus</label>
                                                                    </div>
                                                                    <div style="float: left; width: 280px;">
                                                                        <input id="by_chr_locus_txt" class="form-control" style="width: 250px;" title="type &quot;T&quot;" value="2p23" onfocus="clearText(this);" onblur="clearText(this);">
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </li>
                                                </ul>

                                            </div>


                                            <div id="chimer_kb" style="background-color: #fdfdfd;">

                                                <ul style="list-style: none;">
                                                    <li>
                                                        <span style="font-size: 20px; font-weight: bold;">&#9658;&nbsp;&nbsp;Options</span>
                                                        <ul style="list-style: none;">
                                                            <li style="margin-top: 10px;">
                                                                <span>&ndash;&nbsp;&nbsp;Data Source</span>
                                                                <ul style="list-style: none;">
                                                                    <li>
                                                                        <label class="checkbox-inline"><input type="checkbox" id="chimrKb_1_litratr_chk" >Literature Curation</label>
                                                                        <label class="checkbox-inline"><input type="checkbox" id="chimrKb_1_cosmic_chk" >COSMIC</label>
                                                                        <label class="checkbox-inline"><input type="checkbox" id="chimrKb_1_mrna_chk" >mRNA Sequence</label>
                                                                        <label class="checkbox-inline"><input type="checkbox" id="chimrKb_1_etc_chk" checked="checked">Mitelman, OMIM, GenBank</label>
                                                                    </li>
                                                                </ul>
                                                            </li>
                                                            <li style="margin-top: 10px;">
                                                                <span>&ndash;&nbsp;&nbsp;Breakpoint type</span>
                                                                <ul style="list-style: none;">
                                                                    <li>
                                                                        <label class="checkbox-inline"><input type="checkbox" id="chimrKb_2_genomic_chk" >Genomic breakpoint</label>
                                                                        <label class="checkbox-inline"><input type="checkbox" id="chimrKb_2_exon_chk" checked="checked">Exon breakpoint</label>
                                                                        <label class="checkbox-inline"><input type="checkbox" id="chimrKb_2_na_chk" onclick="chimerkb_no_breakpoint_toggle();">No Breakpoint Information</label>
                                                                    </li>
                                                                </ul>
                                                            </li>
                                                            <li style="margin-top: 10px;">
                                                                <span>&ndash;&nbsp;&nbsp;Validation method</span>
                                                                <ul style="list-style: none;">
                                                                    <li>
                                                                        <label class="checkbox-inline"><input type="checkbox" id="chimrKb_3_fish_chk" >FISH</label>
                                                                        <label class="checkbox-inline"><input type="checkbox" id="chimrKb_3_sanger_chk" >SangerSeq</label>
                                                                        <label class="checkbox-inline"><input type="checkbox" id="chimrKb_3_rtpcr_chk" >RT-PCR</label>
                                                                        <label class="checkbox-inline"><input type="checkbox" id="chimrKb_3_none_chk" onclick="chimerkb_no_evidence_toggle();" checked="checked">No Evidence</label>
                                                                    </li>
                                                                </ul>
                                                            </li>
                                                        </ul>
                                                    </li>
                                                </ul>

                                            </div>


                                            <!-- ----------------- Footer -----------------  -->
                                            <div style="padding: 30px 0px 30px 0px; border: 0px; background-color: #fdfdfd;">

                                                <ul style="list-style: none;">
                                                    <li>
                                                        <span style="font-size: 20px; font-weight: bold;">&#9658;&nbsp;&nbsp;Filter</span>
                                                        <ul style="list-style: none;">
                                                            <li style="margin-top: 10px;">
                                                                <span>&ndash;&nbsp;&nbsp;Function</span>
                                                                <ul style="list-style: none;">
                                                                    <li>
                                                                        <label class="checkbox-inline"><input type="checkbox" id="chimrKb_fbyfunc_kinase_chk" >Kinase fusion</label>
                                                                        <label class="checkbox-inline"><input type="checkbox" id="chimrKb_fbyfunc_onco_chk" checked="checked">Oncogene</label>
                                                                        <label class="checkbox-inline"><input type="checkbox" id="chimrKb_fbyfunc_tumor_chk" >Tumor suppressor</label>
                                                                        <label class="checkbox-inline"><input type="checkbox" id="chimrKb_fbyfunc_recpt_chk" >Receptor</label>
                                                                        <label class="checkbox-inline"><input type="checkbox" id="chimrKb_fbyfunc_transcript_chk" checked="checked">Transcription Factor</label>
                                                                    </li>
                                                                </ul>
                                                            </li>
                                                            <li style="margin-top: 10px;">
                                                                <span>&ndash;&nbsp;&nbsp;Function type</span>
                                                                <ul style="list-style: none;">
                                                                    <li>
                                                                        <label class="checkbox-inline"><input type="checkbox" id="chimrKb_fbyfusn_inter_chr_chk" value="inter_chr" checked="checked">Inter chromosomal</label>
                                                                        <label class="checkbox-inline"><input type="checkbox" id="chimrKb_fbyfusn_intra_chr_chk" value="intra_chr" >Intra chromosomal</label>
                                                                    </li>
                                                                </ul>
                                                            </li>
                                                            <li style="margin-top: 10px;">
                                                                <span>&ndash;&nbsp;&nbsp;Supporting information</span>
                                                                <ul style="list-style: none;">
                                                                    <li>
                                                                        <label class="checkbox-inline" id="chimrKb_fbySupot_chimrSeqS_lvl"><input type="checkbox" id="chimrKb_fbySupot_chimrSeqS_chk" >ChimerSeq supported</label>
                                                                        <label class="checkbox-inline" id="chimrKb_fbySupot_chimrPubS_lvl"><input type="checkbox" id="chimrKb_fbySupot_chimrPubS_chk" >ChimerPub supported</label>
                                                                    </li>
                                                                </ul>
                                                            </li>
                                                        </ul>
                                                    </li>
                                                </ul>

                                            </div>
                                
                                    </div>
                                </div>
                                
                                
                            </div>

                    </div>
            </div>
    
    
    
            
    
        
            

            <div class="row margin-bottom-30" style="margin-top: 30px; ">

                <div class="col-md-12" style="text-align: right;">
                    <button class="btn btn-primary" type="button" style="width: 180px; height: 40px; font-size: 20px; font-weight: bold;" >
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
        
        <input id="key_activated_tab" type="hidden" name="key_activated_tab" /> <!-- chimerKB, chimerSeq, chimerPub -->
        <input id="key_a_search_type" type="hidden" name="key_a_search_type" />
        <input id="key_data_for_search_type" type="hidden" name="key_data_for_search_type" />
        
        <input id="key_selt_the_websource" type="hidden" name="key_selt_the_websource" />
        
        <input id="key_kb_selt_the_source" type="hidden" name="key_kb_selt_the_source" />
        <input id="key_kb_selt_the_breakpoint" type="hidden" name="key_kb_selt_the_breakpoint" />
        <input id="key_kb_selt_the_validtn_mtd" type="hidden" name="key_kb_selt_the_validtn_mtd" />
        
        <input id="key_seq_selt_the_source" type="hidden" name="key_seq_selt_the_source" />
        <input id="key_seq_cancer_type" type="hidden" name="key_seq_cancer_type" />
        <input id="key_seq_val_of_number" type="hidden" name="key_seq_val_of_number" />
        
        <input id="key_seq_num_of_seed_reads" type="hidden" name="key_seq_num_of_seed_reads" />
        <input id="key_seq_num_of_s_pairs" type="hidden" name="key_seq_num_of_s_pairs" />
        <input id="key_seq_num_of_junc_reads" type="hidden" name="key_seq_num_of_junc_reads" />
        

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
<%@include file="part/f.jsp" %>

</body>

</html>
