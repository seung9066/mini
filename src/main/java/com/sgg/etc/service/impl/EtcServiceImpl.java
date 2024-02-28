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
import org.thymeleaf.util.StringUtils;

import java.util.List;
import java.util.Map;

@Service
public class EtcServiceImpl implements EtcService {

    @Autowired
    EtcMapper etcMapper;

    /**
     * 일기 목록
     * @param map
     * @param session
     * @return
     * @throws Exception
     */
    @Override
    public List<Map<String, Object>> diaryList(Map<String, Object> map, HttpSession session) throws Exception {
        if (!StringUtils.isEmpty((String) session.getAttribute("userId"))) {
            map.put("userId", session.getAttribute("userId"));
            map.put("userAuth", session.getAttribute("userAuth"));
        }

        return etcMapper.diaryList(map);
    }

    /**
     * 일기 목록 수
     * @param map
     * @param session
     * @return
     * @throws Exception
     */
    @Override
    public int diaryListCnt(Map<String, Object> map, HttpSession session) throws Exception {
        if (!StringUtils.isEmpty((String) session.getAttribute("userId"))) {
            map.put("userId", session.getAttribute("userId"));
            map.put("userAuth", session.getAttribute("userAuth"));
        }

        return etcMapper.diaryListCnt(map);
    }
}
