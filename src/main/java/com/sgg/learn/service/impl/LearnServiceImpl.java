package com.sgg.learn.service.impl;

import com.sgg.config.cmnUtil;
import com.sgg.learn.mapper.LearnMapper;
import com.sgg.learn.service.LearnService;
import com.sgg.login.mapper.LoginMapper;
import com.sgg.login.service.LoginService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class LearnServiceImpl implements LearnService {

    @Autowired
    LearnMapper learnMapper;

    /**
     * 목록 조회
     * @param map
     * @return List<Map<String, String>>
     */
    @Override
    public List<Map<String, Object>> getList(Map<String, String> map) throws Exception {
        return learnMapper.getList(map);
    }

    /**
     * 목록 수
     * @param map
     * @return int
     */
    @Override
    public int getListCnt(Map<String, String> map) throws Exception {
        return learnMapper.getListCnt(map);
    }

    /**
     * 상세조회
     * @param map
     * @return List<Map<String, String>>
     */
    @Override
    public List<Map<String, Object>> getDtl(Map<String, String> map) throws Exception {

        return learnMapper.getDtl(map);
    }

}
