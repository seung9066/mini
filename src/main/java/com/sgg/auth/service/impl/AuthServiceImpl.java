package com.sgg.auth.service.impl;

import com.sgg.auth.mapper.AuthMapper;
import com.sgg.auth.service.AuthService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.thymeleaf.util.StringUtils;

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

    /**
     * 정보 수정
     * @param map
     * @param session
     * @return int
     * @throws Exception
     */
    @Override
    public int doSave(Map<String, String> map, HttpSession session) throws Exception {
        int chk = -1;
        if (session.getAttribute("userAuth").equals("999")) {
            if (StringUtils.isEmpty(map.get("delYn"))) {
                map.put("delYn", "N");
            }
            if (map.get("userAuth").equals("000")) {
                map.put("delYn", "Y");
                chk = authMapper.delInfo(map);
            } else  {
                chk = authMapper.doSaveInfo(map);
            }
            chk += authMapper.doSave(map);
        }
        return chk;
    }

    /**
     * 접속 기록 조회
     * @param map
     * @param session
     * @return
     * @throws Exception
     */
    @Override
    public List<Map<String, Object>> logList(Map<String, String> map, HttpSession session) throws Exception {

        return authMapper.logList(map);
    }

    /**
     * 접속 기록 수
     * @param map
     * @return
     * @throws Exception
     */
    @Override
    public int logListCnt(Map<String, String> map) throws Exception {

        return authMapper.logListCnt(map);
    }

    /**
     * 메뉴 조회
     * @param map
     * @param session
     * @return
     * @throws Exception
     */
    @Override
    public List<Map<String, Object>> menuList(Map<String, String> map, HttpSession session) throws Exception {
        return authMapper.menuList(map);
    }

    @Override
    public int menuSave(Map<String, String> map, HttpSession session) throws Exception {
        int chk = 0;
        if (session.getAttribute("userAuth").equals("999")) {
            chk = authMapper.menuSave(map);
        }

        return chk;
    }
}
