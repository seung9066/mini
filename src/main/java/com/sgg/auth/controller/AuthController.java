package com.sgg.auth.controller;

import com.sgg.auth.service.AuthService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;
import java.util.Map;

@Controller
public class AuthController {
    @Autowired
    AuthService authservice;

    /**
     * 목록조회
     * @param map
     * @return List<Map<String, String>>
     */
    @PostMapping("/auth/getList")
    @ResponseBody
    public List<Map<String, Object>> getList(@RequestParam Map<String, String> map) throws Exception{

        return authservice.getList(map);
    }

    /**
     * 목록조회 수
     * @param map
     * @return int
     */
    @PostMapping("/auth/getListCnt")
    @ResponseBody
    public int getListCnt(@RequestParam Map<String, String> map) throws Exception{

        return authservice.getListCnt(map);
    }

    /**
     * 저장
     * @param map
     * @return int
     * @throws Exception
     */
    @PostMapping("/auth/doSave")
    @ResponseBody
    public int doSave(@RequestParam Map<String, String> map, HttpSession session) throws Exception{

        return authservice.doSave(map, session);
    }
}
