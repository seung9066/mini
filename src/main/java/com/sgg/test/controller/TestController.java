package com.sgg.test.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;


@Controller
public class TestController {
    @PostMapping("/test/dbChk")
    @ResponseBody
    public String programDesign(@RequestBody String a) {
        return "";
    }
    
}
