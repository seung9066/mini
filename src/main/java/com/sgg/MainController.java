package com.sgg;

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
    public String page(@RequestParam Map<String, String> formData) {

        return formData.get("pagePath");
    }
    
}
