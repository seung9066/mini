package com.sgg.program;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;


@Controller
public class ProgramController {
    @RequestMapping("/program/programDesign")
    public String programDesign() {
        return "program/sggProgramDesign";
    }
    
}
