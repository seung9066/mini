package com.sgg;

import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.thymeleaf.util.MapUtils;
import org.thymeleaf.util.StringUtils;

import java.util.HashMap;
import java.util.Map;


@Controller
public class MainController {
    @RequestMapping("/")
    public String index() {
        return "index";
    }

    /**
     * 페이지 이동
     */
    @PostMapping("/page")
    public String page(@RequestParam Map<String, String> formData, HttpSession session) {
        // 로그인 관련 페이지만 허용
        if (!formData.get("pagePath").contains("login")) {
            if (session.getAttribute("userId") == null) {
                return "/index";
            }
        }
        return formData.get("pagePath");
    }

    /**
     * 데이터 가지고 페이지 이동
     * @param formData
     * @param session
     * @return
     */
    @PostMapping("/pageMap")
    public String pageMap(@RequestParam Map<String, String> formData, HttpSession session, Model model) {
        // 로그인 관련 페이지만 허용
        if (!formData.get("pagePath").contains("login")) {
            if (session.getAttribute("userId") == null) {
                return "/index";
            }
        }

        model.addAttribute("data", formData);
        return formData.get("pagePath");
    }

    @PostMapping("/getSession")
    @ResponseBody
    public Map<String, Object> getSession(@RequestBody Map<String, String> map, HttpSession session) {
        Map<String, Object> returnMap = new HashMap<>();
        if (!StringUtils.isEmpty(map.get("sessionId"))) {
            if (map.get("sessionId").equals("userInfo")) {
                returnMap.put("userId", session.getAttribute("userId"));
                returnMap.put("userNm", session.getAttribute("userNm"));
                returnMap.put("userAuth", session.getAttribute("userAuth"));
            } else {
                returnMap.put(map.get("sessionId"), session.getAttribute(map.get("sessionId")));
            }
        }

        return returnMap;
    }

}
