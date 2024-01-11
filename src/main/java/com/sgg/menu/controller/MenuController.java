package com.sgg.menu.controller;

import com.sgg.menu.service.MenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;
import java.util.Map;


@Controller
public class MenuController {

    @Autowired
    MenuService menuService;

    /**
     * 메뉴목록 불러오기
     * @param map
     * @return List<Map<String, String>>
     */
    @PostMapping("/menu/getMenu")
    @ResponseBody
    public List<Map<String, Object>> getMenu(@RequestBody Map<String, String> map) throws Exception{

        return menuService.getMenu(map);
    }

    /**
     * 소개 목록
     * @param map
     * @return List<Map<String, String>>
     */
    @PostMapping("/menu/getLine")
    @ResponseBody
    public List<Map<String, Object>> getLine(@RequestBody Map<String, String> map) throws Exception{

        return menuService.getLine(map);
    }

    /**
     * 소개내용
     * @param map
     * @return List<Map<String, String>>
     */
    @PostMapping("/menu/getPre")
    @ResponseBody
    public List<Map<String, Object>> getPre(@RequestBody Map<String, String> map) throws Exception{

        return menuService.getPre(map);
    }
    
}
