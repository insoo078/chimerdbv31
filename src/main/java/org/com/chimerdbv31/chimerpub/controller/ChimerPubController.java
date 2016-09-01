package org.com.chimerdbv31.chimerpub.controller;

import java.util.List;
import java.util.Locale;
import javax.annotation.Resource;
import javax.enterprise.inject.Model;
import javax.servlet.http.HttpServletRequest;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.com.chimerdbv31.chimerpub.services.ChimerPubService;
import org.com.chimerdbv31.chimerseq.vo.ChimerSeqVo;
import org.com.chimerdbv31.common.vo.ParamVo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class ChimerPubController {
	
	private static final Logger logger = LoggerFactory.getLogger(ChimerPubController.class);
	
	@Resource(name = "chimerPubService")
	private ChimerPubService chimerPubService;

        private ParamVo sParam;
        
	@RequestMapping(value="/mchimerpub", method = RequestMethod.GET)
	public ModelAndView chimerseqPage() throws RuntimeException{
		ModelAndView result = new ModelAndView("mchimerpubp");

		return result;
	}

        
        
        @RequestMapping(value="chimerpubdiseaselst",method=RequestMethod.GET)
        @ResponseBody
        public String getDiseaseList( HttpServletRequest request )throws RuntimeException{
            String keyStr = request.getParameter("term");
            //JSONObject jsonData = new JSONObject();
            List<String> mainList = this.chimerPubService.getDiseaseList(keyStr);
            JSONArray jsonArray = null;
            jsonArray = JSONArray.fromObject(mainList);
            return jsonArray.toString();
        }
        
        
	@RequestMapping(value="msrstofchimerpub",method=RequestMethod.POST)
	public ModelAndView rstChimerPub( HttpServletRequest request ) throws RuntimeException{
		ModelAndView result = new ModelAndView("msRstOfChimerPubp");
                
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
                
                int numOfPub = Integer.valueOf( request.getParameter("key_num_of_pub") );
                sParam.setNumOfPub(numOfPub);
                
                
                
                data = "";
                data = request.getParameter("key_pub_selt_the_validtn_mtd");
                dataArr = null;
                queryStr = new StringBuffer();

                if(data.indexOf("none") <= -1){
                    
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
                if( data != "each" && data != ""){
                
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
                if( data != "each" && data != ""){
                
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

                if( data != "each" && data != ""){
                
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
                
                
		return result;
	}
        
        
        
        
        
        
}
