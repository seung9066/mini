package com.sgg.index.controller;

import com.sgg.index.service.IndexService;
import org.apache.coyote.Request;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.core.io.support.ResourcePatternResolver;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import java.io.IOException;
import java.net.URL;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Controller
public class IndexController {

    @Autowired
    IndexService indexService;

    /**
     * 소개 목록
     * @param map
     * @return List<Map<String, String>>
     */
    @PostMapping("/index/getLine")
    @ResponseBody
    public List<Map<String, Object>> getLine(@RequestBody Map<String, String> map) throws Exception{

        return indexService.getLine(map);
    }

    /**
     * 소개내용
     * @param map
     * @return List<Map<String, String>>
     */
    @PostMapping("/index/getPre")
    @ResponseBody
    public List<Map<String, Object>> getPre(@RequestBody Map<String, String> map) throws Exception{

        return indexService.getPre(map);
    }

    /**
     * 확장자별 파일 수
     * @param map
     * @return List<Map<String, String>>
     */
    @PostMapping("/index/getCntFile")
    @ResponseBody
    public Map<String, Object> getCntFile(@RequestBody Map<String, String> map) throws Exception{

        Map<String, Object> cntMap = new HashMap<>();

        int cntHtml = 0;
        int cntCss = 0;
        int cntJs = 0;

        try {
            ResourcePatternResolver resolver = new PathMatchingResourcePatternResolver();
            Resource[] resourcesHtml = resolver.getResources("classpath:/templates/**/*.html");
            Resource[] resourcesCss = resolver.getResources("classpath:/static/**/*.css");
            Resource[] resourcesJs = resolver.getResources("classpath:/static/**/*.js");

            cntHtml = resourcesHtml.length;
            cntCss = resourcesCss.length;
            cntJs = resourcesJs.length;
        } catch (IOException e) {
            e.printStackTrace();
        }

        cntMap.put("HTML", cntHtml);
        cntMap.put("CSS", cntCss);
        cntMap.put("JAVASCRIPT", cntJs);

        return cntMap;
    }
}
