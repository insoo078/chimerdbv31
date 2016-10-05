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

<link type="text/css" rel="stylesheet" href="resources/css/templatemo_main.css"/>
<link type="text/css" rel="stylesheet" href="resources/css/chimerdbv3.css"/>
<link type="text/css" rel="stylesheet" href="resources/css/index_main.css"/>

<script type="text/javascript" src="resources/js/jq/jquery-1.12.4.min.js"></script>
<script type="text/javascript" src="resources/js/bootstrap.min.js"></script>
<script type="text/javascript" src="resources/js/templatemo_script.js"></script>
<script type="text/javascript" src="resources/js/hoy.js"></script>
<script type="text/javascript" src="resources/js/mhelpp.js"></script>
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
                                <span style="font-size: 20px; font-weight: bold;">Help</span>
                            </div>
                            <div class="panel-body">
								<ol class="help_main_menu">
									<li>
										<span class='menu_btn' id='btn_1'>1. DataSet of ChimerDB 3.0</span>
										<ol class="help_main_menu">
											<li><span class='menu_btn' id='btn_1_1'>1.1 ChimerKB</span></li>
											<li><span class='menu_btn' id='btn_1_2'>1.2 ChimerPub</span></li>
											<li><span class='menu_btn' id='btn_1_3'>1.3 ChimerSeq</span>
												<ol class="help_main_menu">
													<li><span class='menu_btn' id='btn_1_3_1'>1.3.1 Data processing</span></li>
													<li><span class='menu_btn' id='btn_1_3_1'>1.3.2 FusionScan</span></li>
												</ol>
											</li>
										</ol>
									</li>
									<li>
										<span class='menu_btn' id='btn_2'>2. ChimerKB Menu</span> 
										<ol class="help_main_menu">
											<li><span class='menu_btn' id='btn_2_1'>2.1 How-to search</span></li>
											<li><span class='menu_btn' id='btn_2_2'>2.2 Search result: Brief information & detailed information</span></li>
										</ol>
									</li>
									<li>
										<span class='menu_btn' id='btn_3'>3. ChimerPub Menu</span>
										<ol class="help_main_menu">
											<li><span class='menu_btn' id='btn_3_1'>3.1 How-to search</span></li>
											<li><span class='menu_btn' id='btn_3_2'>3.2 Search result: Brief information & detailed information</span></li>
										</ol>
									</li>
									<li>
										<span class='menu_btn' id='btn_4'>4. ChimerSeq Menu</span>
										<ol class="help_main_menu">
											<li><span class='menu_btn' id='btn_4_1'>4.1 How-to search</span></li>
											<li><span class='menu_btn' id='btn_4_2'>4.2 Search result: Brief information & detailed information</span></li>
											<li><span class='menu_btn' id='btn_4_3'>4.3 Search result: Fusion Structure</span></li>
										</ol>
									</li>
								</ol>

								
								
								<table id='help_main_table'>
									<tr>
										<td id='top_1' class='title-header'>1. Dataset of ChimerDB 3.0</td>
									</tr>
									<tr>
										<td id='top_1_1' class='first-sub-title-header'>1.1 ChimerKB</td>
									</tr>
									<tr>
										<td class='first-sub-content'>
ChimerKB represents a knowledgebase including 1,066 fusion genes with manual curation that were compiled from 
public resources of fusion genes with experimental evidences. Fusion genes were compiled from well-known 
public resources such as GenBank, Mitelman, OMIM, COSMIC, TICdb and PubMed articles. 
All entries were manually curated for disease, sequences, break points, and experimental evidences.
										</td>
									</tr>
									<tr>
										<td>
											<img alt="" class='help-image chimer-image' src="resources/images/help/chimerkb1.png" style="width: 80%; height: 80%;margin-left:10%;" />
										</td>
									</tr>
									<tr>
										<td class='paper-ref'>Kim, P., Yoon, S., Kim, N., Lee, S., Ko, M., Lee, H., ... & Lee, S. (2010). 
											ChimerDB 2.0—a knowledgebase for fusion genes updated. Nucleic acids research, 38(suppl 1), D81-D85.</td>
									</tr>
										<td class='paper-ref'>Benson, D. A., Cavanaugh, M., Clark, K., Karsch-Mizrachi, I., Lipman, D. J., Ostell, J., & Sayers, E. W. (2013). 
											GenBank. Nucleic acids research, 41(D1), D36-D42. <a href='http://www.ncbi.nlm.nih.gov/genbank/'>http://www.ncbi.nlm.nih.gov/genbank/</a></td>
									</tr>
									<tr>
										<td class='paper-ref'>Mitelman, F., Johansson, B., & Mertens, F. (2007). Mitelman database of chromosome aberrations in cancer. 
											Cancer Genome Anatomy Project. <a href='http://cgap.nci.nih.gov/Chromosomes/Mitelman'>http://cgap.nci.nih.gov/Chromosomes/Mitelman</a></td>
									</tr>
									<tr>
										<td class='paper-ref'>Hamosh, A., Scott, A. F., Amberger, J. S., Bocchini, C. A., & McKusick, V. A. (2005). 
											Online Mendelian Inheritance in Man (OMIM), a knowledgebase of human genes and genetic disorders. Nucleic acids research, 33(suppl 1), D514-D517. <a href='http://www.omim.org/'>http://www.omim.org/</a></td>
									</tr>
									<tr>
										<td class='paper-ref'>Novo, F. J., de Mendíbil, I. O., & Vizmanos, J. L. (2007). 
											TICdb: a collection of gene-mapped translocation breakpoints in cancer. BMC genomics, 8(1), 1. <a href='http://www.unav.es/genetica/TICdb/'>http://www.unav.es/genetica/TICdb/</a></td>
									</tr>

									<tr class='blank' style="height:50px;"><td></td></tr>
									<tr>
										<td  id='top_1_2'class='first-sub-title-header'>1.2 ChimerPub</td>
									</tr>
									<tr>
										<td class='first-sub-content'>
											<div>To obtain fusion gene information from PubMed articles, we first searched for all the sentences 
											that contained at least two co-occurring genes using BEST entity extractor (BEST EE) [BEST Citation]. 
											We collected a total of 302,615 sentences in 156,228 abstracts that were published before June 2016.</div>
											
											<div style='margin-top:10px;'>Through manual curation, we made a gold-standard fusion gene sentence set of 1,549 sentences. 
											We extracted features from the sentences including the differentially distributed words for machine learning 
											and score and rank all the target sentences with logistic regression. Among the top 10,000 scored sentences, 
											2,563 unique fusion genes were found, and 2,067 of them were novel. </div>
										</td>
									</tr>
									<tr class='blank' style="height:20px;"><td></td></tr>
									<tr>
										<td style='text-align:center;'>Workflow of ChimerPub</td>
									</tr>
									<tr>
										<td>
											<img alt="" class='help-image chimer-image' src="resources/images/help/chimerpub1.png" style="width: 80%; height: 80%; margin-left:10%;" />
										</td>
									</tr>
									<tr class='blank' style="height:40px;"><td></td></tr>
									<tr>
										<td style='text-align:center;'>Reliability of ChimerPub text-mining result</td>
									</tr>
									<tr>
										<td>
											<img alt="" class='help-image chimer-image' src="resources/images/help/chimerpub2.png" style="width: 80%; height: 80%; margin-left:10%;" />
										</td>
									</tr>
									<tr class='blank' style="height:50px;"><td></td></tr>
									<tr>
										<td  id='top_1_3' class='first-sub-title-header'>1.3 ChimerSeq</td>
									</tr>
									<tr>
										<td class='first-sub-content'>The raw RNA-seq data were downloaded from the TCGA data portal with the dbGAP permission. 
											We have analyzed the TCGA RNA-seq data using FusionScan and TopHat-Fusion. 
											Fusion gene list of TCGA samples from PRADA pipeline is also included in our database(<a href='http://www.tumorfusions.org'>http://www.tumorfusions.org</a>).
											
											Fusion transcripts from analyzing Human ESTs and mRNAs were curated from ChiTaRS-2.1 and 
											Sequence Read Archive(SRA) predictions of confidence Class A from ChimerDB 2.0.
										</td>
									</tr>
									<tr>
										<td class='paper-ref'>Kim, D., & Salzberg, S. L. (2011). TopHat-Fusion: an algorithm for discovery of novel fusion transcripts. Genome Biol, 12(8), R72.</td>
									</tr>
										<td class='paper-ref'>Yoshihara, K., Wang, Q., Torres-Garcia, W., Zheng, S., Vegesna, R., Kim, H., & Verhaak, R. G. W. (2014). 
											The landscape and therapeutic relevance of cancer-associated transcript fusions. Oncogene. <a href='http://www.tumorfusions.org'>http://www.tumorfusions.org.</a></td>
									</tr>
									<tr>
										<td class='paper-ref'>Frenkel-Morgenstern, M., Gorohovski, A., Lacroix, V., Rogers, M., Ibanez, K., Boullosa, C., ... & Valencia, A. (2013). 
											ChiTaRS: a database of human, mouse and fruit fly chimeric transcripts and RNA-sequencing data. Nucleic acids research, 41(D1), D142-D151. <a href='http://chitars.bioinfo.cnio.es/'>http://chitars.bioinfo.cnio.es/</a></td>
									</tr>
									<tr class='blank' style="height:50px;"><td></td></tr>
									<tr>
										<td id='top_1_3_1' class='second-sub-title-header'>1.3.1 Data processings</td>
									</tr>
									<tr>
										<td class='second-sub-title-header'>TopHat-Fusion</td>
									</tr>
									<tr>
										<td class='first-sub-content'>TCGA RNA-seq data reads were aligned to the genome reference UCSC hg19 refGene and ensGene with Bowtie1.</td>
									</tr>
										<td class='first-sub-content'>tophat -p 8 --fusion-search --keep-fasta-order --bowtie1 --no-coverage-search -r 0 --mate-std-dev 80 --max-intron-length 100000 --fusion-min-dist 100000 --fusion-anchor-length 13 --fusion-ignore-chromosomes chrM</td>
									</tr>
									<tr>
										<td class='second-sub-title-header'>FusionScan</td>
									</tr>
									<tr>
										<td class='first-sub-content'>SSAHA2 was used to map TCGA RNA-Seq reads to the human transcriptome of refGene from the UCSC genome annotation database for the hg19 (GRCh37).</td>
									</tr>
									<tr>
										<td class='first-sub-content'>python Run_FusionScan.py TCGA-PK-A5HB-01A_1.fastq,TCGA-PK-A5HB-01A_2.fastq TCGA-PK-A5HB-01A 48 10.10.20.106:8652 --phred33 -P 8 -ms 2</td>
									</tr>
									<tr>
										<td><img alt="" class='help-image chimer-image' src="resources/images/help/chimerseq1.png" style="width: 80%; height: 80%; margin-left:10%;" /></td>
									</tr>
									<tr class='blank' style="height:50px;"><td></td></tr>
									<tr>
										<td id='top_1_3_2' class='second-sub-title-header'>1.3.2 FusionScan</td>
									</tr>
									<tr>
										<td class='second-sub-title-header'>TopHat-Fusion</td>
									</tr>
									<tr>
										<td class='first-sub-content'>FusionScan, a highly optimized tool for predicting fusion transcripts from RNA-Seq data. 
											We specifically search for split reads composed of intact exons at the fusion boundaries. 
											We have implemented various mapping and filtering strategies to remove false positives without discarding genuine cases. 
											FusionScan outperformed other existing programs by a considerable margin, achieving the precision and recall rates of 60% and 79%, respectively.
										</td>
									</tr>
									<tr>
										<td><img alt="" class='help-image chimer-image' src="resources/images/help/chimerseq2.png"  style="width: 80%; height: 80%; margin-left:10%;" /></td>
									</tr>
									
									<tr class='blank' style="height:50px;"><td></td></tr>
									
									<tr>
										<td style='text-align:center;'>Summary of known fusion genes detected by each tool and the comparison statistics.</td>
									</tr>
									<tr>
										<td><img alt="" class='help-image chimer-image' src="resources/images/help/chimerseq3.png" style="width: 80%; height: 80%; margin-left:10%;" /></td>
									</tr>
									<tr>
										<td style='padding:10px;text-indent:90px;'><a href='resources/data/documents/FusionScan.pdf'>FusionScan Documentation</a></td>
									</tr>
									<tr>
										<td style='padding:10px;text-indent:90px;'><a href='http://fusionscan.ewha.ac.kr'>Go to FusionScan Web page</a></td>
									</tr>

									
									
									
									<tr class='blank' style="height:50px;"><td></td></tr>
									<tr>
										<td id='top_2' class='title-header'>2. ChimerKB Menu</td>
									</tr>
									<tr>
										<td id='top_2_1' class='first-sub-title-header'>2.1 How-to search</td>
									</tr>
									<tr>
										<td class='first-sub-content'>
											<div>Please select at least a feature (search type: Gene, Gene-pair, Disease, show all entries) first. When selected,</div>
											<div class='sep-bar'>-Gene : Input keyword of search bar. The keyword is allowed official gene name.</div>
											<div class='sep-bar'>-Gene-pair : Input keyword of search bar. The keyword is gene pair. (At this time, the connection is underbar ‘_’)</div>
											<div class='sep-bar'>-Disease : Please be careful to use our auto complete function. After typing disease keyword, select one disease name of drop down box that you want.</div>
											<div class='sep-bar'>-Show all entries</div>
										</td>
									</tr>
									<tr>
										<td><img alt="" class='help-image chimer-image' src="resources/images/help/chimerkb2-1.png" style="width: 80%; height: 80%; margin-left:10%;" /></td>
									</tr>
									<tr>
										<td class='first-sub-content'>Select the filter conditions. (Data Source, Breakpoint Type, Validation Method, Function, Chromosome Type, Supporting Information) 
											Specify the criteria to use to filter the displayed data.</td>
									<tr>
										<td id='top_2_2' class='first-sub-title-header'>2.2 Search result: Brief information & detailed information</td>
									</tr>
									<tr>
										<td class='first-sub-content'>Output GUI consists of a table of summary with search hits, detailed information on a specific fusion event. 
											The output table supports many features of searching, sorting, exporting, and link outs to external resources. 
											There were ten data fields as fusion gene, 5’gene junction, 3’gene junction, breakpoint type, disease, frame, 
											chromosome information, data source, supporting Information, PubMed ID. 
											Click a row to show the detailed information about interested fusion gene. 
											The table below describes the selected fusion gene. 
											The PubMed Id links is connected and go to the ChimerSeq, ChimerPub that the supporting Information link is connected to.</td>
									</tr>
									<tr>
										<td><img alt="" class='help-image chimer-image' src="resources/images/help/chimerkb2-2.png" style="width: 80%; height: 80%; margin-left:10%;" /></td>
									</tr>
									
									<tr class='blank' style="height:50px;"><td></td></tr>
									<tr>
										<td id='top_3' class='title-header'>3. ChimerPub Menu</td>
									</tr>
									<tr>
										<td id='top_3_1' class='first-sub-title-header'>3.1 How-to search</td>
									</tr>
									<tr>
										<td class='first-sub-content'>The ChimerPub search is taken in the same manner as mentioned above. Characteristically, the number of publications and text mining score were added to the filters.</td>
									</tr>
									<tr>
										<td><img alt="" class='help-image' src="resources/images/help/chimerkb2-1.png" style="width: 80%; height: 80%; margin-left:10%;" /></td>
									</tr>
									<tr>
										<td class='first-sub-content'>Select the filter conditions. (Data Source, Breakpoint Type, Validation Method, Function, Chromosome Type, Supporting Information) 
											Specify the criteria to use to filter the displayed data.
										</td>
									</tr>
									<tr>
										<td id='top_3_2' class='first-sub-title-header'>3.2 Search result: Brief information and Abstract highlights</td>
									</tr>
									<tr>
										<td class='first-sub-content'>There were six data fields as fusion gene, translocation, function, disease, supporting Information, 
											PubMed ID. Click a row to show the abstract information about interested fusion gene. 
											The table below describes the extracted fusion gene using text mining from literature.</td>
									</tr>
									<tr>
										<td><img alt="" class='help-image chimer-image' src="resources/images/help/chimerpub3-2.png" style="width: 80%; height: 80%; margin-left:10%;" /></td>
									</tr>
									
									<tr class='blank' style="height:50px;"><td></td></tr>
									<tr>
										<td id='top_4' class='title-header'>4. ChimerSeq Menu</td>
									</tr>
									<tr>
										<td id='top_4_1' class='first-sub-title-header'>4.1 How-to search</td>
									</tr>
									<tr>
										<td class='first-sub-content'>We support diverse types of search including gene, gene pair, chromosome locus, and disease types. 
											In ChimerSeq search, users may select the data source, cancer type, and prediction tools with optional parameters. 
											With ample annotations, we support diverse filtering options such as function filter for kinase, oncogene, tumor suppressor, receptor, transcription factor genes.</td>
									</tr>
									<tr>
										<td><img alt="" class='help-image chimer-image' src="resources/images/help/chimerseq4-1.png" style="width: 80%; height: 80%; margin-left:10%;" /></td>
									</tr>
									<tr class='blank' style="height:20px;"><td></td></tr>
									<tr>
										<td id='top_4_2' class='first-sub-title-header'>4.2 Search result: Brief information & detailed information</td>
									</tr>
									<tr>
										<td>Output GUI consists of a table of summary with search hits, a graphic illustration of fusion structure, 
											and detailed information on a specific fusion event. 
											The output table supports many features of searching, sorting, exporting, and link outs to external resources. 
											There were nine data fields as fusion gene, 5’gene junction, 3’gene junction, breakpoint type, cancer type, 
											frame, chromosome information, data source, supporting Information. 
											Click on each entry activates the detailed information table.</td>
									</tr>
									<tr>
										<td><img alt="" class='help-image chimer-image' src="resources/images/help/chimerseq4-2.png" style="width: 80%; height: 80%; margin-left:10%;" /></td>
									</tr>
									<tr class='blank' style="height:20px;"><td></td></tr>
									<tr>
										<td id='top_4_3' class='first-sub-title-header'>4.3 Search result: Fusion Structure</td>
									</tr>
									<tr>
										<td class='first-sub-content'>Click on each entry activates the graphic window of fusion gene structure. 
											The fusion gene graphic window shows readily the exons, domains, and the break point before 
											and after the fusion event. 
											This should be the most insightful picture for deducing functional significance of fusion event. 
											If available, we show the alignment of short reads (seed/junction read only).
											We support zooming and panning for user convenience. 
											The detailed information table provides all relevant information on the fusion transcript. 
											Of note, the UCSC links guide users to the UCSC genome browser with short read alignment as a custom track 
											so that they can examine the detailed gene structure and alignment.</td>
									</tr>
									<tr>
										<td><img alt="" class='help-image chimer-image' src="resources/images/help/chimerseq4-3.png" style="width: 80%; height: 80%; margin-left:10%;" /></td>
									</tr>
								</table>
								
                            </div>
                        </div>
                    </div>
                    
                </div>
                <div class="col-md-1"></div>
            </div>
            
            
        </div>
    </div>
</div>


<div class='top_pop_scroll'>
	<span>Top</span>	
</div>

<!-- content -->
<%@include file="part/footer.jsp" %>
</body>
</html>
