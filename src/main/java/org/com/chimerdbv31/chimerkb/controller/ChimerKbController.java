package org.com.chimerdbv31.chimerkb.controller;

import java.util.List;
import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import net.sf.json.JSONArray;
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
	
	@RequestMapping(value="/chimerkb_from_others",method=RequestMethod.GET)
        public ModelAndView rstChimerKBfromOthers( HttpServletRequest request ) throws RuntimeException{
			ModelAndView result = new ModelAndView("msRstOfChimerKBp");

			String searchType = "by_gene_pair";
            sParam = new ParamVo(true);
			
			String dataForsearchType = request.getParameter("key_data_for_search_type");
			
			result.addObject("search_type", searchType);
			result.addObject("selected_function", "");
			
			sParam.setSearchType(searchType);
            sParam.setDataForSearchType(dataForsearchType);
			
			StringBuffer queryStr = new StringBuffer();
			queryStr.append(" 'Literature_Curation','Cosmic','mRNA_Sequence','Mitelman,OMIM,GenBank' ");
			
			sParam.setQueryForWebSource(queryStr.toString());
			
			queryStr = new StringBuffer();
			queryStr.append(" 'Genomic', 'Exonic', 'NA' ");
			
			sParam.setQueryForBreakPointType(queryStr.toString());

			queryStr = new StringBuffer();
			queryStr.append(" 'Sanger sequencing', 'RT-PCR, Sanger sequencing', 'RT-PCR', 'NA' ");
			sParam.setQueryForValidationMtd(queryStr.toString());
			
			List<ChimerKbVo> chimerKbLst = this.chimerKbService.getChimerKBResult(sParam);
			result.addObject("chimerKb_lst", chimerKbLst);
			
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

                    if(data.indexOf("none") > -1){                    
//                        sParam.setQueryForBreakPointType(" 'NA' ");
						sParam.setQueryForBreakPointType(null);
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

                    if(data.indexOf("none") > -1){                    
//                        sParam.setQueryForValidationMtd(" 'NA' ");
						sParam.setQueryForValidationMtd(null);
                    }else{
                        dataArr = data.split(",");
                        if(dataArr != null && dataArr.length > 0){

                            for(int i = 0; i < dataArr.length; i++){
                                switch( dataArr[i] ){                                    
                                    case "sanger":{
                                        queryStr.append(" 'Sanger sequencing', 'RT-PCR;Sanger sequencing' ");
                                        if( i < (dataArr.length -1) ){
                                            queryStr.append(",");
                                        }
                                    };break;
                                    case "fish":{
                                        queryStr.append(" 'FISH' ");
                                        if( i < (dataArr.length -1) ){
                                            queryStr.append(",");
                                        }
                                    };break;
                                    case "rtpcr":{
                                        queryStr.append(" 'RT-PCR', 'RT-PCR;Sanger sequencing' ");
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
        
        
        @RequestMapping(value="chimerkbdiseaselst",method=RequestMethod.GET)
        @ResponseBody
        public String getDiseaseList( HttpServletRequest request )throws RuntimeException{
            String keyStr = request.getParameter("term");
            List<String> mainList = this.chimerKbService.getDiseaseList(keyStr);
            JSONArray jsonArray = null;
            jsonArray = JSONArray.fromObject(mainList);
            return jsonArray.toString();
        }
}
