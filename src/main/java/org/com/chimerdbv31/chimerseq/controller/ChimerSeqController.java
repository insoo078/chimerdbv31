package org.com.chimerdbv31.chimerseq.controller;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import java.util.List;
import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import java.lang.reflect.Type;
import org.com.chimerdbv31.chimerseq.obj.ChimerSeqQueryForm;

import org.com.chimerdbv31.chimerseq.services.ChimerSeqService;
import org.com.chimerdbv31.chimerseq.vo.ChimerSeqVo;
import org.com.chimerdbv31.common.vo.ParamVo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class ChimerSeqController {
	
	private static final Logger logger = LoggerFactory.getLogger(ChimerSeqController.class);
	
	@Resource(name = "chimerSeqService")
	private ChimerSeqService chimerSeqService;

	private ParamVo sParam;

	@RequestMapping(value="/mchimerseq", method = RequestMethod.GET)
	public ModelAndView chimerseqPage(ChimerSeqQueryForm chimerSeqQueryForm) throws RuntimeException{
		ModelAndView result = new ModelAndView("mchimerseqp");

		result.addObject("cancer_type", this.chimerSeqService.getTcgaCancerTypes());

		return result;
	}

	@RequestMapping(value="autocomplete",method=RequestMethod.POST)
	@ResponseBody
	public String autocomplete(HttpServletRequest request) throws Exception{
		String service = request.getParameter("service");
		String type = request.getParameter("type");
		String text = request.getParameter("text");

		Gson gson = new Gson();

		String json = gson.toJson( this.chimerSeqService.getAutocompleteInfo(service, type, text ) );

		return json;
	}
	
	@RequestMapping(value="getGeneInfo",method=RequestMethod.POST)
	@ResponseBody
	public String getGeneInfo(HttpServletRequest request) throws Exception{
		String queryGenes = request.getParameter("genes");

		Gson gson = new Gson();
		Type type = new TypeToken<List<String>>() {}.getType();
                            
		List<String> geneList = gson.fromJson( queryGenes, type );
		String json = gson.toJson( this.chimerSeqService.getGeneInfo( geneList ) );

		return json;
	}
	
	
	@RequestMapping(value="msrstofchimerseq", method=RequestMethod.POST)
    public ModelAndView rstChimerSeq( HttpServletRequest request, @ModelAttribute("chimerSeqQueryForm") ChimerSeqQueryForm form ) throws RuntimeException{
        ModelAndView result = new ModelAndView("msRstOfChimerSeqp");

		this.chimerSeqService.getChimerSeqResult( form );
		
		return result;
	}
	
	@RequestMapping(value="msrstofchimerseq_test",method=RequestMethod.POST)
    public ModelAndView rstChimerSeq_test( HttpServletRequest request ) throws RuntimeException{
        ModelAndView result = new ModelAndView("msRstOfChimerSeqp");
        
        sParam = new ParamVo(true);
        String activatedTab = request.getParameter("key_activated_tab");
        String searchType = request.getParameter("key_a_search_type");
        String dataForsearchType = request.getParameter("key_data_for_search_type");
        
        result.addObject("activated_tab", activatedTab);
        result.addObject("search_type", searchType);
        
        sParam.setActivatedTab(activatedTab);
        sParam.setSearchType(searchType);
        sParam.setDataForSearchType(dataForsearchType);
        String data = "";
        StringBuffer queryStr = null;
        String[] dataArr = null;
        
        
            
                
            
                
                switch( searchType ){
                    case "all_genes":{
                        
                    };break;
                    case "by_gene":{
                        
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
                        
                    };break;
                    case "by_gene_pair":{
                        
                    };break;
                    case "by_chr_locus":{
                        
                    };break;
                }
                data = "";
                data = request.getParameter("key_selt_the_websource");
                dataArr = null;
                queryStr = new StringBuffer();
                int chkNumVal = 0;
                if(data.indexOf("all") > -1){                    
                    sParam.setQueryForWebSource("'TCGA_RNA-Seq','ChiTaRs','ChimerDB2_SRA'");
                }else{
                    dataArr = data.split(",");
                    if(dataArr != null && dataArr.length > 0){
                        
                        for(int i = 0; i < dataArr.length; i++){
                            switch( dataArr[i] ){
                                case "tcga":{
                                    queryStr.append("'TCGA_RNA-Seq' ");
                                    if( i < (dataArr.length -1) ){
                                        queryStr.append(",");
                                    }
                                    chkNumVal++;
                                };break;
                                case "chimr2":{
                                    queryStr.append("'ChimerDB2_SRA' ");
                                    if( i < (dataArr.length -1) ){
                                        queryStr.append(",");
                                    }
                                    chkNumVal++;
                                };break;
                                case "chitars":{
                                    queryStr.append("'ChiTaRs' ");
                                    if( i < (dataArr.length -1) ){
                                        queryStr.append(",");
                                    }
                                    chkNumVal++;
                                };break;
                            }
                        }
                        if(queryStr.length() > 0){
                            sParam.setQueryForWebSource(queryStr.toString());
                        }
                    }
                }
                
                data = "";
                dataArr = null;
                
                
                data = "";
                data = request.getParameter("key_seq_cancer_type");
                //dataArr = null;
                if(data.indexOf("all") > -1){
                    sParam.setQueryForCancerType("'HNSC','THYM','UCS','CESC','PRAD','LGG','MESO','BRCA','ESCA','UCEC','LUAD','LAML','DLBC','SARC','KIRC','COAD','OV','CHOL','LUSC','THCA','BLCA','GBM','SKCM','PCPG','UVM','STAD','ACC','READ'");
                }else{
                    String covtStr = "'"+data.replaceAll(",", "','")+"'";
                    sParam.setQueryForCancerType(covtStr);
                }
                
                //source
                data = "";
                data = request.getParameter("key_seq_selt_the_source");
                dataArr = null;
                queryStr = new StringBuffer();
                String numVal = "";
                if(data.indexOf("all") > -1){
                    
                }else{
                    dataArr = data.split(",");
                    if(dataArr != null && dataArr.length > 0){
                        for(int i = 0; i < dataArr.length; i++){
                            switch( dataArr[i] ){
                                case "fusnscan":{
                                    numVal = request.getParameter("key_seq_num_of_seed_reads");
                                    queryStr.append("(Source = 'FusionScan' and Seed_reads_num >= ").append(numVal).append(")");
                                    if( i < (dataArr.length -1) ){
                                        queryStr.append(" or ");
                                    }
                                    chkNumVal++;
                                };break;
                                case "tophat":{
                                    numVal = request.getParameter("key_seq_num_of_s_pairs");
                                    queryStr.append("(Source = 'TopHat-Fusion' and Spanning_pairs_num >= ").append(numVal).append(")");
                                    if( i < (dataArr.length -1) ){
                                        queryStr.append(" or ");
                                    }
                                    chkNumVal++;
                                };break;
                                case "prada":{
                                    numVal = request.getParameter("key_seq_num_of_junc_reads");
                                    queryStr.append("(Source = 'PRADA' and Junction_reads_num >= ").append(numVal).append(")");
                                    if( i < (dataArr.length -1) ){
                                        queryStr.append(" or ");
                                    }
                                    chkNumVal++;
                                };break;
                            }
                        }
                        if(queryStr.length() > 0){
                            sParam.setQueryForSource(queryStr.toString());
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
                                        case "chimrKB":{
                                            queryStr.append(" ChimerKB != '0' ");
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
                
                
                // out query ////////////////////////////////////////////////////////////////////////////////////////////
                String outPutQueryStr = "select distinct * from ChimerDB3.ChimerSeq_ver5 where 1=1 ";
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
                    case "by_chr_locus":{
                        outPutQueryStr += " and (H_locus LIKE '"+sParam.getDataForSearchType()+"%' or T_locus LIKE '" +sParam.getDataForSearchType() + "%') ";
                    };break;
                }
                if( sParam.getQueryForWebSource() != null && sParam.getQueryForWebSource() != ""){
                    outPutQueryStr += " and webSource in ("+sParam.getQueryForWebSource()+") ";
                }
                if( sParam.getQueryForCancerType() != null && sParam.getQueryForCancerType() != ""){
                    outPutQueryStr += " and Cancertype in ("+sParam.getQueryForCancerType()+") ";
                }
                if( sParam.getQueryForSource() != null && sParam.getQueryForSource() != ""){
                    outPutQueryStr += " and ("+sParam.getQueryForSource()+") ";
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
                // out query ////////////////////////////////////////////////////////////////////////////////////////////

        return result;
    }
	
		@RequestMapping(value="nextp",method=RequestMethod.POST)
		@ResponseBody
		public String getTheRowLeft( HttpServletRequest request, @ModelAttribute("chimerSeqQueryForm") ChimerSeqQueryForm form )throws RuntimeException{
//		sParam.setStrtn( Integer.parseInt( request.getParameter("start") ) );
//		sParam.setLntn( Integer.parseInt( request.getParameter("length") ) );
//		String sortedKey = request.getParameter("order[0][column]");
//		if(sortedKey.equals("0")){
//		 sortedKey = "1";
//		}
//		sParam.setSortedKeyword( sortedKey );
//		sParam.setSortType( request.getParameter("order[0][dir]") );
//
//		JSONObject jsonData = new JSONObject();
//
//		JSONArray jsonArray = null;
//
//
//		int totalNum = 0;
//		totalNum = this.chimerSeqService.getChimerSeqTotalNumber(sParam);
//		sParam.setTotaln(totalNum);
//		List<ChimerSeqVo> mainList = this.chimerSeqService.getChimerSeqResult(sParam);
//		jsonArray = JSONArray.fromObject(mainList);
//
//
//		jsonData.put("iTotalRecords", totalNum);
//		jsonData.put("iTotalDisplayRecords", totalNum);
//		jsonData.put("aaData", jsonArray.toString() );
//
//		return jsonData.toString();
return "";
    }
}
