package com.sgg;

import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

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
    
}
