package com.sgg.login.service.impl;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sgg.config.cmnUtil;
import com.sgg.login.mapper.LoginMapper;
import com.sgg.login.service.LoginService;

import jakarta.servlet.http.HttpSession;
import org.thymeleaf.util.StringUtils;

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
    public boolean loginChk(Map<String, String> map, HttpSession session) throws Exception {
        // 비밀번호 단방향 암호화
        String result = "";
        if (!StringUtils.isEmpty(map.get("userPw"))) {
            result = cmnUtil.hashEncpt(map.get("userPw"));
            map.put("userPw", result);
        }

        if (!StringUtils.isEmpty(map.get("rePw"))) {
            result = cmnUtil.hashEncpt(map.get("rePw"));
            map.put("userPw", result);
            loginMapper.reAccount(map);
        }

        int cnt = loginMapper.loginChk(map);
        if (cnt > 0) {
            // 로그인성공
            Map<String, String> loginMap = loginMapper.getUser(map);

            session.setAttribute("userId", loginMap.get("userId"));
            session.setAttribute("userNm", loginMap.get("userNm"));
            session.setAttribute("userAuth", loginMap.get("userAuth"));
            return true;
        } else {
            return false;
        }
    }

    /**
     * 회원가입
     * @param map
     * @return int
     */
    @Override
    public boolean newAccount(Map<String, String> map, HttpSession session) throws Exception {
        // 비밀번호 단방향 암호화
        String result = "";
        result = cmnUtil.hashEncpt(map.get("userPw"));
        map.put("userPw", result);

        int chk = loginMapper.newAccount(map);
        if (chk > 0) {
            // 로그인성공
            session.setAttribute("userId", map.get("userId"));
            session.setAttribute("userNm", map.get("userNm"));
            session.setAttribute("userAuth", map.get("userAuth"));

            return true;
        } else {
            return false;
        }
    }

}
