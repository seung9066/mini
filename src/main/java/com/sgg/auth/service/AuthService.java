package com.sgg.auth.service;

import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public interface AuthService {
    List<Map<String, Object>> getList(Map<String, String> map) throws Exception;

    int getListCnt(Map<String, String> map) throws Exception;

    int doSave(Map<String, String> map, HttpSession session) throws Exception;

    List<Map<String, Object>> logList(Map<String, String> map, HttpSession session) throws Exception;

    int logListCnt(Map<String, String> map) throws Exception;

    List<Map<String, Object>> menuList(Map<String, String> map, HttpSession session) throws Exception;
}
