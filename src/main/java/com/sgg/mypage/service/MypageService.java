package com.sgg.mypage.service;

import java.util.Map;

import org.springframework.stereotype.Service;

import jakarta.servlet.http.HttpSession;

@Service
public interface MypageService {

	boolean chkMypage(Map<String, String> map, HttpSession session) throws Exception;


    Map<String, Object> saveAccount(Map<String, String> map, HttpSession session) throws Exception;

    Map<String, Object> getAccount(Map<String, String> map, HttpSession session) throws Exception;
}
