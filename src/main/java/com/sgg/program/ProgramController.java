package com.sgg.program;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;


@Controller
public class ProgramController {

    /**
     * 프로그램 설계서 페이지 이동
     * @return
     */
    @RequestMapping("/program/programDesign")
    public String programDesign() {
        return "program/sggProgramDesign";
    }
    
}
