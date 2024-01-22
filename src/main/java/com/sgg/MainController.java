package com.sgg;

import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
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

}
