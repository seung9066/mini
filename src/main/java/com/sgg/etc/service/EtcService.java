package com.sgg.etc.service;

import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public interface EtcService {

    List<Map<String, Object>> diaryList(Map<String, Object> map, HttpSession session) throws Exception;

    int diaryListCnt(Map<String, Object> map, HttpSession session) throws Exception;
}
