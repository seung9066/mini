package com.sgg.cmn.controller;

import com.sgg.cmn.service.CmnService;
import com.sgg.learn.service.LearnService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;
import java.util.Map;


@Controller
public class CmnController {

    @Autowired
    CmnService cmnService;

    /**
     * 공통코드 조회
     * @param map
     * @return List<Map<String, String>>
     */
    @PostMapping("/cmn/getCode")
    @ResponseBody
    public List<Map<String, Object>> getCode(@RequestBody Map<String, Object> map) throws Exception{

        return cmnService.getCode(map);
    }


}
