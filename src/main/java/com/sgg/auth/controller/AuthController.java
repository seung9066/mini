package com.sgg.auth.controller;

import com.sgg.auth.service.AuthService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;
import java.util.Map;

@Controller
public class AuthController {
    @Autowired
    AuthService authservice;

    /**
     * 목록조회
     * @param map
     * @return List<Map<String, String>>
     */
    @PostMapping("/auth/getList")
    @ResponseBody
    public List<Map<String, Object>> getList(@RequestParam Map<String, String> map) throws Exception{

        return authservice.getList(map);
    }

    /**
     * 목록조회 수
     * @param map
     * @return int
     */
    @PostMapping("/auth/getListCnt")
    @ResponseBody
    public int getListCnt(@RequestParam Map<String, String> map) throws Exception{

        return authservice.getListCnt(map);
    }

    /**
     * 저장
     * @param map
     * @return int
     * @throws Exception
     */
    @PostMapping("/auth/doSave")
    @ResponseBody
    public int doSave(@RequestParam Map<String, String> map, HttpSession session) throws Exception{

        return authservice.doSave(map, session);
    }

    /**
     * 접속 기록 조회
     * @param map
     * @param session
     * @return
     * @throws Exception
     */
    @PostMapping("/auth/logList")
    @ResponseBody
    public List<Map<String, Object>> logList(@RequestParam Map<String, String> map, HttpSession session) throws Exception{

        return authservice.logList(map, session);
    }

    /**
     * 접속 기록 수
     * @param map
     * @param session
     * @return
     * @throws Exception
     */
    @PostMapping("/auth/logListCnt")
    @ResponseBody
    public int logListCnt(@RequestParam Map<String, String> map, HttpSession session) throws Exception{

        return authservice.logListCnt(map);
    }

    /**
     * 메뉴 조회
     * @param map
     * @param session
     * @return
     * @throws Exception
     */
    @PostMapping("/auth/menuList")
    @ResponseBody
    public List<Map<String, Object>> menuList(@RequestParam Map<String, String> map, HttpSession session) throws Exception{

        return authservice.menuList(map, session);
    }

    /**
     * 메뉴 수정
     * @param map
     * @param session
     * @return
     * @throws Exception
     */
    @PostMapping("/auth/menuSave")
    @ResponseBody
    public int menuSave(@RequestBody Map<String, String> map, HttpSession session) throws Exception{

        return authservice.menuSave(map, session);
    }

    /**
     * 소개 목록
     * @param map
     * @param session
     * @return
     * @throws Exception
     */
    @PostMapping("/auth/indexList")
    @ResponseBody
    public List<Map<String, Object>> indexList(@RequestParam Map<String, String> map, HttpSession session) throws Exception{

        return authservice.indexList(map, session);
    }

    /**
     * 소개 목록 수
     * @param map
     * @return
     * @throws Exception
     */
    @PostMapping("/auth/indexListCnt")
    @ResponseBody
    public int indexListCnt(@RequestParam Map<String, String> map) throws Exception{

        return authservice.indexListCnt(map);
    }

    /**
     * 소개 저장
     * @param map
     * @return
     * @throws Exception
     */
    @PostMapping("/auth/saveIndex")
    @ResponseBody
    public int saveIndex(@RequestBody Map<String, String> map, HttpSession session) throws Exception{

        return authservice.saveIndex(map, session);
    }
}
