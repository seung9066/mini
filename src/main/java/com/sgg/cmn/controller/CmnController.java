package com.sgg.cmn.controller;

import com.sgg.cmn.service.CmnService;
import jakarta.servlet.http.HttpServletRequest;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.thymeleaf.util.MapUtils;

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

    /**
     * 목록 조회
     * @param map
     * @return List<Map<String, Object>>
     * @throws Exception
     */
    @PostMapping("/cmn/getList")
    @ResponseBody
    public List<Map<String, Object>> getList(@RequestBody Map<String, Object> map, @RequestParam Map<String, Object> param) throws Exception{

        return cmnService.getList(map, param);
    }

    /**
     * 단건조회
     * @param map
     * @param param
     * @return
     * @throws Exception
     */
    @PostMapping("/cmn/getData")
    @ResponseBody
    public Map<String, Object> getData(@RequestBody Map<String, Object> map, @RequestParam Map<String, Object> param) throws Exception{

        return cmnService.getData(map, param);
    }

}
