package com.sgg.etc.service.impl;

import com.sgg.cmn.mapper.CmnMapper;
import com.sgg.cmn.service.CmnService;
import com.sgg.etc.mapper.EtcMapper;
import com.sgg.etc.service.EtcService;
import jakarta.servlet.http.HttpSession;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;
import org.thymeleaf.util.ArrayUtils;
import org.thymeleaf.util.MapUtils;

import java.util.List;
import java.util.Map;

@Service
public class EtcServiceImpl implements EtcService {

    @Autowired
    EtcMapper etcMapper;

    @Override
    public List<Map<String, Object>> diaryList(Map<String, Object> map, HttpSession session) throws Exception {

        return etcMapper.diaryList(map);
    }
}
