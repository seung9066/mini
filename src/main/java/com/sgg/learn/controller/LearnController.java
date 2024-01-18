package com.sgg.learn.controller;

import com.sgg.learn.service.LearnService;
import com.sgg.login.service.LoginService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;
import java.util.Map;


@Controller
public class LearnController {

    @Autowired
    LearnService learnService;

    /**
     * 목록조회
     * @param map
     * @return List<Map<String, String>>
     */
    @PostMapping("/learn/getList")
    @ResponseBody
    public List<Map<String, Object>> getList(@RequestParam Map<String, String> map) throws Exception{

        return learnService.getList(map);
    }

    /**
     * 목록 수
     * @param map
     * @return List<Map<String, String>>
     */
    @PostMapping("/learn/getListCnt")
    @ResponseBody
    public int getListCnt(@RequestParam Map<String, String> map) throws Exception{

        return learnService.getListCnt(map);
    }

    /**
     * 상세페이지
     * @param map
     * @return String
     */
    @PostMapping("/learn/goDtl")
    public String goDtl(@RequestParam Map<String, String> map, Model model) throws Exception{
        model.addAttribute("codeNo", map.get("codeNo"));

        return "learn/cmnDtlCode";
    }

    /**
     * 상세정보
     * @param map
     * @return List<Map<String, String>>
     */
    @PostMapping("/learn/getDtl")
    @ResponseBody
    public List<Map<String, Object>> getDtl(@RequestBody Map<String, String> map) throws Exception{

        return learnService.getDtl(map);
    }

    /**
     * 등록
     * @param map
     * @return int
     */
    @PostMapping("/learn/doSave")
    @ResponseBody
    public int doSave(@RequestBody Map<String, Object> map, HttpSession session) throws Exception{

        return learnService.doSave(map, session);
    }

}
