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

	@RequestMapping(value="/mchimerpub", method = RequestMethod.GET)
	public ModelAndView chimerseqPage() throws RuntimeException{
		ModelAndView result = new ModelAndView("mchimerpubp");

		return result;
	}

	@RequestMapping(value="msrstofchimerpub",method=RequestMethod.POST)
	public ModelAndView rstChimerPub( HttpServletRequest request ) throws RuntimeException{
		ModelAndView result = new ModelAndView("msRstOfChimerPubp");
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
        
        
        
        
}
