package com.sgg.login.service;

import org.springframework.stereotype.Service;

import jakarta.servlet.http.HttpSession;

import java.util.List;
import java.util.Map;

@Service
public interface LoginService {

    Map<String, Object> getId(Map<String, String> map) throws Exception;

    boolean loginChk(Map<String, String> map, HttpSession session) throws Exception;

    boolean newAccount(Map<String, String> map, HttpSession session) throws Exception;

}
