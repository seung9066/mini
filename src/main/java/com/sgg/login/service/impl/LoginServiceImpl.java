package com.sgg.login.service.impl;

import com.sgg.index.mapper.IndexMapper;
import com.sgg.index.service.IndexService;
import com.sgg.login.mapper.LoginMapper;
import com.sgg.login.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class LoginServiceImpl implements LoginService {

    @Autowired
    LoginMapper loginMapper;

    /**
     * 아이디 존재여부 체크
     * @param map
     * @return Map<String, String>
     */
    @Override
    public Map<String, Object> getId(Map<String, String> map) throws Exception {
        return loginMapper.getId(map);
    }

    /**
     * 로그인
     * @param map
     * @return Map<String, String>
     */
    @Override
    public Map<String, Object> loginChk(Map<String, String> map) throws Exception {
        return loginMapper.loginChk(map);
    }
}
