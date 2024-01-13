package com.sgg.index.service;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public interface IndexService {

    List<Map<String, Object>> getLine(Map<String, String> map) throws Exception;

    List<Map<String, Object>> getPre(Map<String, String> map) throws Exception;

    Map<String, Object> getContact(Map<String, String> map) throws Exception;
}
