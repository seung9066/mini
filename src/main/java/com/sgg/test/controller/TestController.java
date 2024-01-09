package com.sgg.test.controller;

import com.sgg.test.service.TestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;


@Controller
public class TestController {

    @Autowired
    TestService testService;

    @PostMapping("/test/dbTest")
    @ResponseBody
    public String dbTest(@RequestBody String a) {
        return "";
    }
    
}
