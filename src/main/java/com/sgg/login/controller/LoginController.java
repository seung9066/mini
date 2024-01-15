package com.sgg.login.controller;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.sgg.login.service.LoginService;

import jakarta.servlet.http.HttpSession;


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
     * @return boolean
     */
    @PostMapping("/login/loginChk")
    @ResponseBody
    public boolean loginChk(@RequestBody Map<String, String> map, HttpSession session) throws Exception{

        return loginService.loginChk(map, session);
    }

    /**
     * 로그아웃
     * @param map
     * @return boolean
     */
    @PostMapping("/login/logout")
    @ResponseBody
    public boolean logout(@RequestBody Map<String, String> map, HttpSession session) throws Exception{
        session.removeAttribute("userId");
        session.removeAttribute("userNm");
        session.removeAttribute("userAuth");

        return true;
    }

    /**
     * 회원가입
     * @param map
     * @return boolean
     */
    @PostMapping("/login/newAccount")
    @ResponseBody
    public boolean newAccount(@RequestParam Map<String, String> map, HttpSession session) throws Exception{

        return loginService.newAccount(map, session);
    }

}
