package com.sgg.mypage.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.sgg.mypage.service.MypageService;

import jakarta.servlet.http.HttpSession;


@Controller
public class MypageController {

    @Autowired
    MypageService mypageService;

    /**
     * 메뉴목록 불러오기
     * @param map
     * @return boolean
     */
    @PostMapping("/mypage/chkMypage")
    @ResponseBody
    public boolean chkMypage(@RequestParam Map<String, String> map, HttpSession session) throws Exception{
    	
        return mypageService.chkMypage(map, session);
    }

    /**
     * 회원정보 불러오기
     * @param map
     * @return Map<String, Object>
     */
    @PostMapping("/mypage/getAccount")
    @ResponseBody
    public Map<String, Object> getAccount(@RequestParam Map<String, String> map, HttpSession session) throws Exception{

        return mypageService.getAccount(map, session);
    }

    /**
     * 회원정보 저장
     * @param map
     * @return Map<String, Object>
     */
    @PostMapping("/mypage/saveAccount")
    @ResponseBody
    public Map<String, Object> saveAccount(@RequestParam Map<String, String> map, HttpSession session) throws Exception{

        return mypageService.saveAccount(map, session);
    }

}
