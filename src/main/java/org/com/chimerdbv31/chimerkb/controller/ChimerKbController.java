package org.com.chimerdbv31.chimerkb.controller;

import java.util.List;
import java.util.Locale;
import javax.annotation.Resource;
import javax.enterprise.inject.Model;
import javax.servlet.http.HttpServletRequest;
import net.sf.json.JSONObject;
import org.com.chimerdbv31.chimerkb.services.ChimerKbService;
import org.com.chimerdbv31.chimerkb.vo.ChimerKbVo;
import org.com.chimerdbv31.common.vo.ParamVo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class ChimerKbController {
	
	private static final Logger logger = LoggerFactory.getLogger(ChimerKbController.class);
	
	@Resource(name = "chimerKbService")
	private ChimerKbService chimerKbService;
	
	private ParamVo sParam;

	@RequestMapping(value="/mchimerkb", method = RequestMethod.GET)
	public ModelAndView chimerKbPage() throws RuntimeException{
		ModelAndView result = new ModelAndView("mchimerkbp");

		return result;
	}


	@RequestMapping(value="/msrstofchimerkb",method=RequestMethod.POST)
        public ModelAndView rstChimerKB( HttpServletRequest request ) throws RuntimeException{
            ModelAndView result = new ModelAndView("msRstOfChimerKBp");

            sParam = new ParamVo(true);
            
            String searchType = request.getParameter("key_a_search_type");
            String dataForsearchType = request.getParameter("key_data_for_search_type");

            
            result.addObject("search_type", searchType);

            
            sParam.setSearchType(searchType);
            sParam.setDataForSearchType(dataForsearchType);
            String data = "";
            StringBuffer queryStr = null;
            String[] dataArr = null;

            
            if(searchType.equals("by_gene")){
                data = dataForsearchType;

                if(data.indexOf(",") > -1){
                    dataArr = data.split(",");
                    for(int i = 0; i < dataArr.length; i++){
                        if(i==0){
                            sParam.setDataForSearchType( dataArr[i] );
                        }else{
                            if(dataArr[i].equals("5")){
                                sParam.setGene5(true);
                            }
                            if( dataArr[i].equals("3") ){
                                sParam.setGene3(true);
                            }
                        }
                    }
                }
                if(sParam.isGene5() && sParam.isGene3()){
                    sParam.setGene5(false);
                    sParam.setGene3(false);
                    sParam.setGene53(true);
                }
            }

                
                    data = "";
                    data = request.getParameter("key_selt_the_websource");
                    dataArr = null;
                    queryStr = new StringBuffer();
                    if(data.indexOf("all") > -1){                    

                    }else{
                        dataArr = data.split(",");
                        if(dataArr != null && dataArr.length > 0){
                            for(int i = 0; i < dataArr.length; i++){
                                switch( dataArr[i] ){
                                    case "litratr":{
                                        queryStr.append(" 'Literature_Curation' ");
                                        if( i < (dataArr.length -1) ){
                                            queryStr.append(",");
                                        }
                                    };break;
                                    case "cosmic":{
                                        queryStr.append(" 'Cosmic' ");
                                        if( i < (dataArr.length -1) ){
                                            queryStr.append(",");
                                        }
                                    };break;
                                    case "mrna":{
                                        queryStr.append(" 'mRNA_Sequence' ");
                                        if( i < (dataArr.length -1) ){
                                            queryStr.append(",");
                                        }
                                    };break;
                                    case "etc":{
                                        queryStr.append(" 'Mitelman,OMIM,GenBank' ");
                                        if( i < (dataArr.length -1) ){
                                            queryStr.append(",");
                                        }
                                    };break;
                                }
                            }

                            if(queryStr.length() > 0){
                                sParam.setQueryForWebSource(queryStr.toString());
                            }
                        }
                    }


                    data = "";
                    data = request.getParameter("key_kb_selt_the_breakpoint");
                    dataArr = null;
                    queryStr = new StringBuffer();

                    if(data.indexOf("all") > -1){                    
                        //sParam.setQueryForBreakPointType();
                    }else{
                        dataArr = data.split(",");
                        if(dataArr != null && dataArr.length > 0){
                            for(int i = 0; i < dataArr.length; i++){
                                switch( dataArr[i] ){
                                    case "genomic":{
                                        queryStr.append(" 'Genomic' ");
                                        if( i < (dataArr.length -1) ){
                                            queryStr.append(",");
                                        }
                                    };break;
                                    case "exon":{
                                        queryStr.append(" 'Exonic' ");
                                        if( i < (dataArr.length -1) ){
                                            queryStr.append(",");
                                        }
                                    };break;
                                }
                            }

                            if(queryStr.length() > 0){
                                sParam.setQueryForBreakPointType(queryStr.toString());
                            }

                        }
                    }


                    data = "";
                    data = request.getParameter("key_kb_selt_the_validtn_mtd");
                    dataArr = null;
                    queryStr = new StringBuffer();

                    if(data.indexOf("all") > -1){                    
                        //sParam.setQueryForValidationMtd();
                    }else{
                        dataArr = data.split(",");
                        if(dataArr != null && dataArr.length > 0){

                            for(int i = 0; i < dataArr.length; i++){
                                switch( dataArr[i] ){                                    
                                    case "sanger":{
                                        queryStr.append(" 'Sanger sequencing' ");
                                        if( i < (dataArr.length -1) ){
                                            queryStr.append(",");
                                        }
                                    };break;
                                    case "fish":{
                                        queryStr.append(" 'RT-PCR, Sanger sequencing' ");
                                        if( i < (dataArr.length -1) ){
                                            queryStr.append(",");
                                        }
                                    };break;
                                    case "rtpcr":{
                                        queryStr.append(" 'RT-PCR' ");
                                        if( i < (dataArr.length -1) ){
                                            queryStr.append(",");
                                        }
                                    };break;
                                    case "none":{
                                    };break;
                                }
                            }
                            if(queryStr.length() > 0){
                                sParam.setQueryForValidationMtd(queryStr.toString());
                            }
                        }
                    }



                    data = "";
                    data = request.getParameter("key_flt_by_func");
                    dataArr = null;
                    queryStr = new StringBuffer();
                    if( data.indexOf("none") > -1 ){
                        //sParam.setQueryForFilterByFunc();
                    }else{
                        dataArr = data.split(",");
                        if(dataArr != null && dataArr.length > 0){
                                for(int i = 0; i < dataArr.length; i++){
                                    if(i > 0){
                                        switch(dataArr[i]){
                                            case "kinase":{
                                                queryStr.append(" Kinase != 0 ");
                                                if( i < (dataArr.length -1) ){
                                                    queryStr.append("or");
                                                }
                                            };break;
                                            case "onco":{
                                                queryStr.append(" Oncogene != 0 ");
                                                if( i < (dataArr.length -1) ){
                                                    queryStr.append("or");
                                                }
                                            };break;
                                            case "tumor":{
                                                queryStr.append(" Tumor_suppressor != 0 ");
                                                if( i < (dataArr.length -1) ){
                                                    queryStr.append("or");
                                                }
                                            };break;
                                            case "recpt":{
                                                queryStr.append(" Receptor != 0 ");
                                                if( i < (dataArr.length -1) ){
                                                    queryStr.append("or");
                                                }
                                            };break;
                                            case "transcript":{
                                                queryStr.append(" Transcription_Factor != 0 ");
                                                if( i < (dataArr.length -1) ){
                                                    queryStr.append("or");
                                                }
                                            };break;
                                        }
                                    }
                                }
                            if(queryStr.length() > 0){
                                sParam.setQueryForFilterByFunc(queryStr.toString());
                            }
                        }
                    }
                    result.addObject("selected_function", data);
                    
                    
                    data = "";
                    data = request.getParameter("key_flt_by_fusn_type");
                    dataArr = null;
                    queryStr = new StringBuffer();
                    if( data.indexOf("all") > -1 ){
                        //sParam.setQueryForFusType();
                    }else{
                        dataArr = data.split(",");
                        if(dataArr != null && dataArr.length > 0){
                                for(int i = 0; i < dataArr.length; i++){
                                    if(i > 0){
                                        switch(dataArr[i]){
                                            case "inter_chr":{
                                                queryStr.append(" 'Inter-chr' ");
                                                if( i < (dataArr.length -1) ){
                                                    queryStr.append(",");
                                                }
                                            };break;
                                            case "intra_chr":{
                                                queryStr.append(" 'Intra-chr' ");
                                                if( i < (dataArr.length -1) ){
                                                    queryStr.append(",");
                                                }
                                            };break;
                                        }
                                    }
                                }
                            if(queryStr.length() > 0){
                                sParam.setQueryForFusType(queryStr.toString());
                            }
                        }
                    }

                    data = "";
                    data = request.getParameter("key_flt_by_supted_info");
                    dataArr = null;
                    queryStr = new StringBuffer();

                    if( data.indexOf("none") > -1 ){
                        //sParam.setQueryForSupInfo();
                    }else{
                        dataArr = data.split(",");
                        if(dataArr != null && dataArr.length > 0){
                                for(int i = 0; i < dataArr.length; i++){
                                    if(i > 0){
                                        switch(dataArr[i]){
                                            case "chimrSeq":{
                                                queryStr.append(" ChimerSeq != '0' ");
                                                if( i < (dataArr.length -1) ){
                                                    queryStr.append("or");
                                                }
                                            };break;
                                            case "chimrPub":{
                                                queryStr.append(" ChimerPub != '0' ");
                                                if( i < (dataArr.length -1) ){
                                                    queryStr.append("or");
                                                }
                                            };break;
                                        }
                                    }
                                }
                            if(queryStr.length() > 0){
                                sParam.setQueryForSupInfo(queryStr.toString());
                            }
                        }
                    }
                    List<ChimerKbVo> chimerKbLst = this.chimerKbService.getChimerKBResult(sParam);
                    result.addObject("chimerKb_lst", chimerKbLst);
                    // out query ////////////////////////////////////////////////////////////////////////////////////////////
                    String outPutQueryStr = "select distinct * from ChimerDB3.ChimerKB_ver5 where 1=1 ";
                    switch( sParam.getSearchType() ){
                        case "by_gene":{
                            if( sParam.isGene5() && sParam.isGene3() ){
                                outPutQueryStr += " and H_gene = '"+sParam.getDataForSearchType()+"' or T_gene = '"+sParam.getDataForSearchType()+"' ";
                            }else{
                                if( sParam.isGene5() ){
                                    outPutQueryStr += " and H_gene = '"+sParam.getDataForSearchType()+"' ";
                                }
                                if( sParam.isGene3() ){
                                    outPutQueryStr += " and T_gene = '"+sParam.getDataForSearchType()+"' ";
                                }
                            }
                        };break;
                        case "by_gene_pair":{
                            outPutQueryStr += " and Fusion_pair = '"+sParam.getDataForSearchType()+"' ";
                        };break;
                        case "by_chr_locus":{};break;
                    }
                    if( sParam.getQueryForWebSource() != null && sParam.getQueryForWebSource() != ""){
                        outPutQueryStr += " and webSource in ("+sParam.getQueryForWebSource()+") ";
                    }
                    if( sParam.getQueryForBreakPointType() != null && sParam.getQueryForBreakPointType() != ""){
                        outPutQueryStr += " and Breakpoint_Type in ("+sParam.getQueryForBreakPointType()+") ";
                    }
                    if( sParam.getQueryForValidationMtd() != null && sParam.getQueryForValidationMtd() != ""){
                        outPutQueryStr += " and Validation in ("+sParam.getQueryForValidationMtd()+") ";
                    }
                    if( sParam.getQueryForFilterByFunc() != null && sParam.getQueryForFilterByFunc() != ""){
                        outPutQueryStr += " and ("+sParam.getQueryForFilterByFunc()+") ";
                    }
                    if( sParam.getQueryForFusType() != null && sParam.getQueryForFusType() != ""){
                        outPutQueryStr += " and Chr_info in ("+sParam.getQueryForFusType()+") ";
                    }
                    if( sParam.getQueryForSupInfo() != null && sParam.getQueryForSupInfo() != ""){
                        outPutQueryStr += " and ("+sParam.getQueryForSupInfo()+"); ";
                    }

                    result.addObject("output_query_str", outPutQueryStr);
                    System.out.println("outPutQueryStr ---> "+outPutQueryStr);
                    // out query ////////////////////////////////////////////////////////////////////////////////////////////
            return result;
        }
        
        
        
        @RequestMapping(value = "/genedescpopup", method = RequestMethod.POST)
        public ModelAndView geneDescPopUp(HttpServletRequest request) throws Exception {
            ModelAndView result = new ModelAndView();
            
            return result;
        }
        
        @RequestMapping(value = "/genedesc", method = RequestMethod.POST)
        @ResponseBody
        public String geneDesc(HttpServletRequest request) throws Exception {
            JSONObject jsonData;
            ChimerKbVo param = new ChimerKbVo();
            
            param.setFusion_pair( request.getParameter("fuspair") );
            param.setGene5Junc( request.getParameter("gene5junc") );
            param.setGene3Junc( request.getParameter("gene3junc") );
            param.setBreakpoint_Type( request.getParameter("breaktype") );
            param.setSource( request.getParameter("source") );
            param.setPMID( request.getParameter("pmid") );
            
            ChimerKbVo data = this.chimerKbService.getSelectedFGeneData(param);
            
            
            
            jsonData = JSONObject.fromObject(data);
            System.out.println("=============="+data.getFusion_pair());
            return jsonData.toString();
        }
        
        
//	
//	@RequestMapping(value = "/interpro", method = RequestMethod.GET)
//	public String interproscan(Locale locale, Model model) {
//		
//		logger.debug("[interpro]");
//		
//		return "analysis/genome_analysis";
//	}
//	
//	@RequestMapping(value = "/geneGroupSearch", method = RequestMethod.GET)
//	public String geneGroupSearch(Locale locale, Model model) {
//		logger.info("Welcome home! The client locale is {}.", locale);
//		
//		return "viewer/geneGroupSearch";
//	}
//	
//
//	//all data
//	@RequestMapping(value = "/getPagedGeneGroupSearchDesyncResult", method = RequestMethod.POST, produces = "text/plain;charset=UTF-8")
//	@ResponseBody
//	public String getPagedGeneGroupSearchDesyncResult(HttpServletRequest request) throws Exception {
//		//예제 013783, 015129, 013098
//		//IPR002944,IPR000175	protein 20개
//		//IPR012284,IPR012473	ptotein 2개
//
//		String iprIds[] = request.getParameterValues("ipr_ids");
//		String iprFamilies[] = request.getParameterValues("ipr_families");
//		String iprSubTypes[] = request.getParameterValues("ipr_subtypes");
//		String radio = request.getParameter("radio");
//		String perfectMatch = request.getParameter("chkPerfectMatch");
//		String pagingSize = request.getParameter("pagingSize");
//		String pagingIndex = request.getParameter("pagingIndex");
//		String baseSubType = request.getParameter("baseSubType");
//		String kingdom = Utility.emptyToNull( request.getParameter("kingdom") );
//		
//		return this.getComparedGroupGeneSearch(request, iprIds, iprFamilies, iprSubTypes, radio, perfectMatch, pagingSize, pagingIndex, baseSubType, true, kingdom);
//	}
}
