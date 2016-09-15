package org.com.chimerdbv31.common.controller;

import javax.servlet.http.HttpServletRequest;
import net.sf.json.JSONObject;
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
public class CommonController {
	
	private static final Logger logger = LoggerFactory.getLogger(CommonController.class);
	
	private ParamVo sParam;
	
//	@Resource(name = "CoMapper")
//	private ChimerSeqMapper chimerSeqService;
//
        
	@RequestMapping(value="/mindex", method = RequestMethod.GET)
	public ModelAndView indexPage() throws RuntimeException{
		ModelAndView result = new ModelAndView("mindexp");
		return result;
	}

	@RequestMapping(value="/description_popup", method = RequestMethod.GET)
	public ModelAndView descPopup() throws RuntimeException{
		ModelAndView result = new ModelAndView("/popup/description");
		return result;
	}

	@RequestMapping(value="/mstatistic", method = RequestMethod.GET)
	public ModelAndView statisticPage() throws RuntimeException{
		ModelAndView result = new ModelAndView("mstatisticp");
		return result;
	}

	@RequestMapping(value="/mhelp", method = RequestMethod.GET)
	public ModelAndView helpPage() throws RuntimeException{
		ModelAndView result = new ModelAndView("mhelpp");
		return result;
	}

	@RequestMapping(value="/mdownload", method = RequestMethod.GET)
	public ModelAndView downloadPage() throws RuntimeException{
		ModelAndView result = new ModelAndView("mdownload");
		return result;
	}
    
    @RequestMapping(value="/descofgene",method=RequestMethod.POST)
    @ResponseBody
    public String showDescTheFGene( HttpServletRequest request )throws RuntimeException{
        
        JSONObject jsonData;
        ChimerKbVo row = new ChimerKbVo();
        row.setFusion_pair("PML_RARA");
        row.setH_gene("PML");
        row.setT_gene("RARA");
        row.setH_chr("H Chr.");
        row.setT_chr("T Chr.");
        row.setGene5Junc("5' Gene Junction");
        row.setGene3Junc("3' Gene Junction");
        row.setH_strand("H strand");
        row.setT_strand("T strand");
        //fusion
        //chimerdb type : chimerKB
        row.setSource("Source");
        row.setGenome_Build_Version("Genome ver.");
        row.setDisease("Disease");
        row.setValidation("Validation");
        row.setPMID("PMID");
        row.setFrame("Frame");
        row.setChr_info("Chromosome");
        //supported
        
        jsonData = JSONObject.fromObject(row);
        
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
