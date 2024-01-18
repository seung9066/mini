package com.sgg.auth.service.impl;

import com.sgg.auth.mapper.AuthMapper;
import com.sgg.auth.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    AuthMapper authMapper;

    /**
     * 목록조회
     * @param map
     * @return List<Map<String, Object>>
     * @throws Exception
     */
    @Override
    public List<Map<String, Object>> getList(Map<String, String> map) throws Exception {
        return authMapper.getList(map);
    }

    /**
     * 목록조회 수
     * @param map
     * @return int
     * @throws Exception
     */
    @Override
    public int getListCnt(Map<String, String> map) throws Exception {
        return authMapper.getListCnt(map);
    }
}
