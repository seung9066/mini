package com.sgg.auth.service;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public interface AuthService {
    List<Map<String, Object>> getList(Map<String, String> map) throws Exception;

    int getListCnt(Map<String, String> map) throws Exception;
}
