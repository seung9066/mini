package com.sgg.cmn.service;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public interface CmnService {

    List<Map<String, Object>> getCode(Map<String, Object> map) throws Exception;


}
