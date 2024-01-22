package com.sgg.cmn.service;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public interface CmnService {

    List<Map<String, Object>> getCode(Map<String, Object> map) throws Exception;

    List<Map<String, Object>> getList(Map<String, Object> map, Map<String, Object> param) throws Exception;

    Map<String, Object> getData(Map<String, Object> map, Map<String, Object> param) throws Exception;
}
