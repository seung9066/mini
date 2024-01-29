package com.sgg.etc.controller;

import com.sgg.cmn.service.CmnService;
import com.sgg.etc.service.EtcService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.thymeleaf.util.StringUtils;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;


@Controller
public class EtcController {

    @Autowired
    EtcService etcService;

    /**
     * 일기 목록
     * @param map
     * @return List<Map<String, String>>
     */
    @PostMapping("/etc/diaryList")
    @ResponseBody
    public List<Map<String, Object>> diaryList(@RequestParam Map<String, Object> map, HttpSession session) throws Exception{

        return etcService.diaryList(map, session);
    }


}
