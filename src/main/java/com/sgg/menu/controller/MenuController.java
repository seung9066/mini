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
    public List<Map<String, Object>> getMenu(@RequestBody Map<String, String> map) {

        return menuService.getMenu(map);
    }
    
}
