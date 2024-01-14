package com.sgg.login.service;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public interface LoginService {

    Map<String, Object> getId(Map<String, String> map) throws Exception;

    Map<String, Object> loginChk(Map<String, String> map) throws Exception;
}
