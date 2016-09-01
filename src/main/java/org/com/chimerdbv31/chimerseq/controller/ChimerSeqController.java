package org.com.chimerdbv31.chimerseq.controller;

import com.google.common.base.Strings;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import java.util.List;
import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.lang.reflect.Type;
import org.com.chimerdbv31.chimerseq.obj.ChimerSeqQueryForm;

import org.com.chimerdbv31.chimerseq.services.ChimerSeqService;
import org.com.chimerdbv31.chimerseq.vo.ChimerSeqVo;
import org.com.chimerdbv31.chimerseq.vo.ChimerSeqDetailVo;
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

		Gson gson = new Gson();
//		this.chimerSeqService.getChimerSeqResult( form );

		String json = gson.toJson( form );

		result.addObject("queryForm", json );
		return result;
	}

	@RequestMapping(value="nextp",method=RequestMethod.POST)
	@ResponseBody
	public String getTheRowLeft( HttpServletRequest request) throws RuntimeException{
		Gson gson = new Gson();
		
		com.google.gson.JsonObject obj = new com.google.gson.JsonObject();
		
		ChimerSeqQueryForm model = gson.fromJson(request.getParameter("formData"), ChimerSeqQueryForm.class);
		String searchKeyword = request.getParameter("search[value]");
		String sortOrderDir = request.getParameter("order[0][dir]");
		int pagingStart = Integer.parseInt( request.getParameter("start") );
		int displaySize = Integer.parseInt( request.getParameter("length") );
		String sortedKey = request.getParameter("order[0][column]");

		model.setStart( pagingStart );
		model.setLength( displaySize );
		model.setSortKey( Integer.parseInt( sortedKey ) );
		model.setSearchKeyword( Strings.emptyToNull(searchKeyword) );
		model.setSortOrderDir(sortOrderDir);

		int totalNum = this.chimerSeqService.getChimerSeqTotalNumber(model);
		List<ChimerSeqVo> dataList = this.chimerSeqService.getChimerSeqResult(model);
		
		obj.addProperty("iTotalRecords", totalNum);
		obj.addProperty("iTotalDisplayRecords", totalNum);
		obj.add("aaData", gson.toJsonTree(dataList));
		
		String resultJson = obj.toString();
		return resultJson;
    }
	
	@RequestMapping(value="/getFusionDetailInfo", method = RequestMethod.POST)
	@ResponseBody
	public String getFusionGeneDetailInfo(HttpServletRequest request) throws RuntimeException{
		String id = request.getParameter("id");
		ChimerSeqDetailVo vo = this.chimerSeqService.getFusionGeneDetailInfo( id );
		
		Gson gson = new Gson();
		return gson.toJson(vo);
	}

	@RequestMapping(value="/chimerseq_popup", method = RequestMethod.GET)
	public ModelAndView descChimerSeqDeatailPopup(HttpServletRequest request) throws RuntimeException{
		String json = request.getParameter("detailInfo");

		Gson gson = new Gson();
		ChimerSeqDetailVo vo = gson.fromJson(json, ChimerSeqDetailVo.class);
		
		ModelAndView result = new ModelAndView("/popup/chimerseq_popup");
		result.addObject("result", vo);

		return result;
	}
}
