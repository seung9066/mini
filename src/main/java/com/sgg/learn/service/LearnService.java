package com.sgg.learn.service;

import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public interface LearnService {

    List<Map<String, Object>> getList(Map<String, String> map) throws Exception;

    int getListCnt(Map<String, String> map) throws Exception;

    List<Map<String, Object>> getDtl(Map<String, String> map) throws Exception;
}
