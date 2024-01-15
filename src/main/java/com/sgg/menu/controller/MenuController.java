package com.sgg.menu.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.thymeleaf.util.StringUtils;

import com.sgg.menu.service.MenuService;

import jakarta.servlet.http.HttpSession;


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
    public List<Map<String, Object>> getMenu(@RequestBody Map<String, String> map, HttpSession session) throws Exception{

        if (!StringUtils.isEmpty((String) session.getAttribute("userAuth"))) {
            map.put("userAuth", (String) session.getAttribute("userAuth"));
        } else {
            map.put("userAuth", "000");
        }
        return menuService.getMenu(map);
    }

}
