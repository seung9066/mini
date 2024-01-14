package com.sgg.login.controller;

import com.sgg.index.service.IndexService;
import com.sgg.login.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.core.io.support.ResourcePatternResolver;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Controller
public class LoginController {

    @Autowired
    LoginService loginService;

    /**
     * 아이디 존재여부 체크
     * @param map
     * @return List<Map<String, String>>
     */
    @PostMapping("/login/getId")
    @ResponseBody
    public Map<String, Object> getLine(@RequestBody Map<String, String> map) throws Exception{

        return loginService.getId(map);
    }

    /**
     * 로그인
     * @param map
     * @return List<Map<String, String>>
     */
    @PostMapping("/login/loginChk")
    @ResponseBody
    public Map<String, Object> loginChk(@RequestBody Map<String, String> map) throws Exception{

        return loginService.loginChk(map);
    }

}
