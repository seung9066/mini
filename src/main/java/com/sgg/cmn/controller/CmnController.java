package com.sgg.cmn.controller;

import com.sgg.cmn.service.CmnService;
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
public class CmnController {

    @Autowired
    CmnService cmnService;

    /**
     * 공통코드 조회
     * @param map
     * @return List<Map<String, String>>
     */
    @PostMapping("/cmn/getCode")
    @ResponseBody
    public List<Map<String, Object>> getCode(@RequestBody Map<String, Object> map) throws Exception{

        return cmnService.getCode(map);
    }

    /**
     * 목록 조회
     * @param map
     * @return List<Map<String, Object>>
     * @throws Exception
     */
    @PostMapping("/cmn/getList")
    @ResponseBody
    public List<Map<String, Object>> getList(@RequestBody Map<String, Object> map, @RequestParam Map<String, Object> param) throws Exception{

        return cmnService.getList(map, param);
    }

    /**
     * 단건조회
     * @param map
     * @param param
     * @return
     * @throws Exception
     */
    @PostMapping("/cmn/getData")
    @ResponseBody
    public Map<String, Object> getData(@RequestBody Map<String, Object> map, @RequestParam Map<String, Object> param) throws Exception{

        return cmnService.getData(map, param);
    }

    /**
     * 단건, 다건 업데이트
     * @param map
     * @return
     * @throws Exception
     */
    @PostMapping("/cmn/upData")
    @ResponseBody
    public int upData(@RequestBody Map<String, Object> map) throws Exception{

        return cmnService.upData(map);
    }

    /**
     * 세션 정보 가져오기
     * @param map
     * @param session
     * @return
     */
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

    /**
     * 파일 업로드
     * @param files
     * @return
     * @throws IOException
     */
    @PostMapping("/upLoadFile")
    @ResponseBody
    public int upLoadFile(MultipartHttpServletRequest files) throws IOException {
        int cnt = 0;
        List<MultipartFile> fileList = files.getFiles("files");

        Path currentPath = Paths.get("").toAbsolutePath();
        String uploadFolder = currentPath + "/src/main/resources/file";

        for (int i = 0; i < fileList.size(); i++) {
            long size = fileList.get(i).getSize();
            if (size > 0) {
                UUID uuid = UUID.randomUUID();
                String fileUuid = uuid.toString().replaceAll("-", "");
                String fileRealName = fileList.get(i).getOriginalFilename();
                String fileType = fileList.get(i).getContentType();

                File saveFile = new File(uploadFolder + "\\" + fileUuid + fileRealName);
                try {
                    fileList.get(i).transferTo(saveFile);
                    cnt++;
                } catch (IllegalStateException | IOException e) {
                    // TODO Auto-generated catch block
                    e.printStackTrace();
                }
            }
        }

        return cnt;
    }

}
