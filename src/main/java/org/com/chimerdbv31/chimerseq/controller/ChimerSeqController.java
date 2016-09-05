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

	/**
	 * ChimerSeq 검색을 위한 조건 화면
	 * 
	 * @param chimerSeqQueryForm
	 * @return
	 * @throws RuntimeException 
	 */
	@RequestMapping(value="/mchimerseq", method = RequestMethod.GET)
	public ModelAndView chimerseqPage(ChimerSeqQueryForm chimerSeqQueryForm) throws RuntimeException{
		ModelAndView result = new ModelAndView("mchimerseqp");

		// 처음 페이지를 열때 TCGA cancer type을 DB로 부터 조회해
		// 화면에 세팅하기 위해 DB 조회
		result.addObject("cancer_type", this.chimerSeqService.getTcgaCancerTypes());

		return result;
	}

	/**
	 * ChimerSeq에서 검색방법을 By_gene, by_gene_pair, by_chromosome, by_disease 등
	 * 키워드를 넣을 경우 사용자가 입력한 텍스를 이용하여 데이터베이스 내에서
	 * 자동으로 키워드 추천을 해주기 위한 기능
	 * 
	 * @param request
	 * @return
	 * @throws Exception 
	 */
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

	/**
	 * ChimerSeq 조회 완료 페이지로 이동한 후
	 * 사용자가 테이블의 Record를 클릭하면 해당하는 Piar 유전자 두개를
	 * DB로 부터 정보 조회해오는 메소드
	 * 이를 이용해서 Fusion gene 정보를 팝업으로도 보여주며 Fusition structure를 그려줌
	 * 
	 * @param request
	 * @return
	 * @throws Exception 
	 */
	@RequestMapping(value="getGeneInfo",method=RequestMethod.POST)
	@ResponseBody
	public String getGeneInfo(HttpServletRequest request) throws Exception{
		Gson gson = new Gson();
		
		String queryGenes = request.getParameter("data");
		
		ChimerSeqVo chimerSeqRecord = gson.fromJson(queryGenes, ChimerSeqVo.class);

		String json = gson.toJson( this.chimerSeqService.getGeneInfo( chimerSeqRecord ) );

		return json;
	}
	
	/**
	 * ChimerSeq 조회 결과 페이지로 이동하는 메소드 
	 * 
	 * @param request
	 * @param form
	 * @return
	 * @throws RuntimeException 
	 */
	@RequestMapping(value="msrstofchimerseq", method=RequestMethod.POST)
    public ModelAndView rstChimerSeq( HttpServletRequest request, @ModelAttribute("chimerSeqQueryForm") ChimerSeqQueryForm form ) throws RuntimeException{
        ModelAndView result = new ModelAndView("msRstOfChimerSeqp");

		Gson gson = new Gson();

		// 사용자가 입력한 조회 조건값을 조회 완료 페이지로 첨부한 뒤
		// jQuery를 이용해 DB를 다시 조회해야 하므로
		// 입력 Form 데이터를 그대로 전달함
		String json = gson.toJson( form );

		result.addObject("queryForm", json );
		return result;
	}

	/**
	 * jQuery datatables에서 Paging후 페이지 번호를 클릭할때 마다
	 * 데이터를 재 조회해오는 메소드
	 * 
	 * @param request
	 * @return
	 * @throws Exception 
	 */
	@RequestMapping(value="nextp",method=RequestMethod.POST)
	@ResponseBody
	public String getTheRowLeft( HttpServletRequest request) throws Exception{
		Gson gson = new Gson();
		
		com.google.gson.JsonObject obj = new com.google.gson.JsonObject();

		ChimerSeqQueryForm model = gson.fromJson(request.getParameter("formData"), ChimerSeqQueryForm.class);		// 사용자가 입력한 query form
		String searchKeyword = request.getParameter("search[value]");												// jQuery datatable에서 입력받은 search keyword
		String sortOrderDir = request.getParameter("order[0][dir]");												// jQuery datatable에서 얻어온 정렬 방향 (ASC or DESC)
		int pagingStart = Integer.parseInt( request.getParameter("start") );										// jQuery datatable에서 얻어온 페이지 시작 번호 (1)
		int displaySize = Integer.parseInt( request.getParameter("length") );										// jQuery datatable에서 얻어온 한 테이블에서 보여질 데이터 size
		String sortedKey = request.getParameter("order[0][column]");												// jQuery datatable에서 얻어온 정렬 필드 번호

		model.setStart( pagingStart );
		model.setLength( displaySize );
		model.setSortKey( Integer.parseInt( sortedKey ) );
		model.setSearchKeyword( Strings.emptyToNull(searchKeyword) );
		model.setSortOrderDir(sortOrderDir);

		// 조회 조건값을 이용해 조회될 전체 데이터의 size를 얻어옴
		int totalNum = this.chimerSeqService.getChimerSeqTotalNumber(model);
		
		// 페이징 기능을 이용해 실제 화면에 보여줄 만큼의 데이터를 DB로 부터 얻어옴
		List<ChimerSeqVo> dataList = this.chimerSeqService.getChimerSeqResult(model);
		
		obj.addProperty("iTotalRecords", totalNum);
		obj.addProperty("iTotalDisplayRecords", totalNum);
		obj.add("aaData", gson.toJsonTree(dataList));
		
		String resultJson = obj.toString();
		
		System.out.println( resultJson );
		return resultJson;
    }

	/**
	 * jQuery datatables의 record를 클릭할 경우 fusion structure 및 
	 * fusion gene정보를 Popup으로 보여줄 정보를 조회해 오는 메소드
	 * 
	 * @param request
	 * @return
	 * @throws RuntimeException 
	 */
	@RequestMapping(value="/getFusionDetailInfo", method = RequestMethod.POST)
	@ResponseBody
	public String getFusionGeneDetailInfo(HttpServletRequest request) throws RuntimeException{
		String id = request.getParameter("id");
		ChimerSeqDetailVo vo = this.chimerSeqService.getFusionGeneDetailInfo( id );
		
		Gson gson = new Gson();
		return gson.toJson(vo);
	}

	/**
	 * Fusion gene 정보를 보여줄 Popup 화면으로 이동하는 메소드
	 * 
	 * @param request
	 * @return
	 * @throws RuntimeException 
	 */
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
