package com.sgg.learn.service.impl;

import com.sgg.config.cmnUtil;
import com.sgg.learn.mapper.LearnMapper;
import com.sgg.learn.service.LearnService;
import com.sgg.login.mapper.LoginMapper;
import com.sgg.login.service.LoginService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.thymeleaf.util.StringUtils;

import java.util.ArrayList;
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

    /**
     * 등록
     * @param map, session
     * @return int
     */
    @Override
    public int doSave(Map<String, Object> map, HttpSession session) throws Exception {
        int cnt = 0;
        
        // Map에서 Map 가져오기
        Object mapVal = map.get("code");

        String codeNo = "";

        // Map로 형변환
        if (mapVal instanceof Map) {
            Map<String, String> newMap = (Map<String, String>) mapVal;
            
            // 신규, 수정 체크
            if (StringUtils.isEmpty(newMap.get("codeNo"))) {
                codeNo = learnMapper.getCodeNo();
            } else {
                codeNo = newMap.get("codeNo");

                // 기존 코드 제거
                cnt += learnMapper.delDtl(newMap);
            }

            if (StringUtils.isEmpty(newMap.get("delYn"))) {
                newMap.put("delYn", "N");
            }
            
            // 코드 타이틀 등록
            newMap.put("codeNo", codeNo);
            newMap.put("userId", (String) session.getAttribute("userId"));
            cnt += learnMapper.doSave(newMap);
        }

        // Map에서 List 가져오기
        Object value = map.get("dtl");

        // List로 형변환
        if (value instanceof List<?>) {
            List<Map<String, String>> list = (List<Map<String, String>>) value;
            
            // 코드 등록
            for (int i = 0; i < list.size(); i++) {
                list.get(i).put("codeNo", codeNo);
                cnt += learnMapper.doSaveDtl(list.get(i));
            }
        }

        return cnt;
    }

}
