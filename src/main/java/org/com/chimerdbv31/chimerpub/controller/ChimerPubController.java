package org.com.chimerdbv31.chimerpub.controller;

import com.google.gson.Gson;
import java.util.List;
import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.com.chimerdbv31.chimerpub.newpackage.obj.DistObj;
import org.com.chimerdbv31.chimerpub.services.ChimerPubService;
import org.com.chimerdbv31.chimerpub.vo.ChimerPubVo;
import org.com.chimerdbv31.chimerpub.vo.DistributionVo;
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

	@RequestMapping(value="chimerpub_from_others",method=RequestMethod.GET)
	public ModelAndView rstChimerPubFromOthers( HttpServletRequest request ) throws RuntimeException{
		ModelAndView result = new ModelAndView("msRstOfChimerPubp");

		String searchType = "by_gene_pair";
		sParam = new ParamVo(true);

		String dataForsearchType = request.getParameter("key_data_for_search_type");

		result.addObject("search_type", searchType);
		result.addObject("selected_function", "");

		sParam.setSearchType(searchType);
		sParam.setDataForSearchType(dataForsearchType);
		
		sParam.setNumOfPub(1);
		sParam.setTxtMiningScore(10);
		
		StringBuffer queryStr = new StringBuffer();
		queryStr.append(" 'Sanger sequencing', 'RT-PCR, Sanger sequencing', 'RT-PCR', 'NA' ");
		sParam.setQueryForValidationMtd(queryStr.toString());
		
		List<ChimerPubVo> chimerpublst = this.chimerPubService.getChimerPubResult(sParam);
		result.addObject("chimerpub_lst", chimerpublst);

		return result;
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
                
                int txtMiningScore = Integer.valueOf( request.getParameter("key_txt_mining_score") );
                sParam.setTxtMiningScore(txtMiningScore);
                
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
                                    queryStr.append(" 'FISH;PCR;RT-PCR ', 'FISH ', 'FISH;PCR', 'PCR;ISH', 'FISH;RT-PCR ', 'ISH' ");
                                    if( i < (dataArr.length -1) ){
                                        queryStr.append(",");
                                    }
                                };break;
                                case "rtpcr":{
                                    queryStr.append(" 'FISH;PCR;RT-PCR ', 'FISH;PCR', 'PCR', 'PCR;RT-PCR', 'PCR;ISH', 'RT-PCR', 'FISH;RT-PCR ' ");
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
                                            queryStr.append(" t1.Kinase != 0 ");
                                            if( i < (dataArr.length -1) ){
                                                queryStr.append("or");
                                            }
                                        };break;
                                        case "onco":{
                                            queryStr.append(" t1.Oncogene != 0 ");
                                            if( i < (dataArr.length -1) ){
                                                queryStr.append("or");
                                            }
                                        };break;
                                        case "tumor":{
                                            queryStr.append(" t1.Tumor_suppressor != 0 ");
                                            if( i < (dataArr.length -1) ){
                                                queryStr.append("or");
                                            }
                                        };break;
                                        case "recpt":{
                                            queryStr.append(" t1.Receptor != 0 ");
                                            if( i < (dataArr.length -1) ){
                                                queryStr.append("or");
                                            }
                                        };break;
                                        case "transcript":{
                                            queryStr.append(" t1.Transcription_Factor != 0 ");
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


//                data = "";
//                data = request.getParameter("key_flt_by_fusn_type");
//                dataArr = null;
//                queryStr = new StringBuffer();
//                if( data != "each" && data != ""){
//                
//                    dataArr = data.split(",");
//                    if(dataArr != null && dataArr.length > 0){
//                            for(int i = 0; i < dataArr.length; i++){
//                                if(i > 0){
//                                    switch(dataArr[i]){
//                                        case "inter_chr":{
//                                            queryStr.append(" 'Inter-chr' ");
//                                            if( i < (dataArr.length -1) ){
//                                                queryStr.append(",");
//                                            }
//                                        };break;
//                                        case "intra_chr":{
//                                            queryStr.append(" 'Intra-chr' ");
//                                            if( i < (dataArr.length -1) ){
//                                                queryStr.append(",");
//                                            }
//                                        };break;
//                                    }
//                                }
//                            }
//                        if(queryStr.length() > 0){
//                            sParam.setQueryForFusType(queryStr.toString());
//                        }
//                    }
//                }

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
                                            queryStr.append(" t1.ChimerSeq != '0' ");
                                            if( i < (dataArr.length -1) ){
                                                queryStr.append("or");
                                            }
                                        };break;
                                        case "chimrKb":{
                                            queryStr.append(" t1.ChimerKb != '0' ");
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
                
                List<ChimerPubVo> chimerpublst = this.chimerPubService.getChimerPubResult(sParam);
                result.addObject("chimerpub_lst", chimerpublst);
		return result;
	}
        
        
        @RequestMapping(value="getjournaldata",method=RequestMethod.POST)
        @ResponseBody
        public String getJournalData( HttpServletRequest request )throws RuntimeException{
            
            ChimerPubVo param = new ChimerPubVo();
            param.setFusion_pair( request.getParameter("fuspair") );
            //param.setGene5Junc( request.getParameter("gene5junc") );
            //param.setGene3Junc( request.getParameter("gene3junc") );
            //param.setBreakpoint_Type( request.getParameter("breaktype") );
            param.setDisease( request.getParameter("disease") );
            param.setPMID( request.getParameter("pmid") );
            
            param.setH_gene( request.getParameter("hgene") );
            param.setT_gene( request.getParameter("tgene") );
            
            JSONObject jsonData = null;
            ChimerPubVo rowdata = this.chimerPubService.getJournal(param);
            
//            String replace_title1 = rowdata.getTitle().replaceAll(param.getH_gene(), "<span style='color:#990033;font-size:15px;font-weight:bold;'>"+param.getH_gene()+"</span>");
//            String replace_title2 = replace_title1.replaceAll(param.getT_gene(), "<span style='color:#3300cc;font-size:15px;font-weight:bold;'>"+param.getT_gene()+"</span>");
//            rowdata.setTitle(replace_title2);
//            
//            String[] sliceTxt = rowdata.getAbstractText().split("\\.{2}",2);
//            String replace_txt1 = null;
//            String replace_txt2 = null;
//            if( sliceTxt.length > 1){
//                replace_txt1 = sliceTxt[1].replaceAll(param.getH_gene(), "<span style='color:#990033;font-size:15px;font-weight:bold;'>"+param.getH_gene()+"</span>");
//            }else{
//                replace_txt1 = rowdata.getAbstractText().replaceAll(param.getH_gene(), "<span style='color:#990033;font-size:15px;font-weight:bold;'>"+param.getH_gene()+"</span>");
//            }
//            replace_txt2 = replace_txt1.replaceAll(param.getT_gene(), "<span style='color:#3300cc;font-size:15px;font-weight:bold;'>"+param.getT_gene()+"</span>");
//            rowdata.setAbstractText(replace_txt2);
            
            jsonData = JSONObject.fromObject(rowdata);
            
            return jsonData.toString();
        }
        
        
        
//        public String getEutil() {
////			https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&id=10702393
//		}
		
		
	@RequestMapping(value="chimerpub_dist",method=RequestMethod.POST)
	@ResponseBody
	public String  chimerPubDistribution( HttpServletRequest request ) throws RuntimeException{
		List<DistributionVo> scoreList = this.chimerPubService.getChimerPubScoreDistribution();
		
//		int minScore = Integer.MAX_VALUE;
//		int maxScore = Integer.MIN_VALUE;
//		int minFreq = Integer.MAX_VALUE;
//		int maxFreq = Integer.MIN_VALUE;
//
//		for(DistributionVo vo:scoreList) {
//			int score = vo.getScore();
//			int frequency = vo.getFrequency();
//			
//			if( score > minScore ) minScore = score;
//			if( score < maxScore ) maxScore = score;
//			if( frequency > minFreq ) minFreq = frequency;
//			if( frequency < maxFreq ) maxFreq = frequency;
//		}
//
//		
//		DistObj obj = new DistObj();
//		obj.setList(scoreList);
//		obj.setMinScore(minScore);
//		obj.setMaxScore(maxScore);
//		obj.setMinFreq(minFreq);
//		obj.setMaxFreq(maxFreq);

		Gson gson = new Gson();

		return gson.toJson(scoreList);
	}
}