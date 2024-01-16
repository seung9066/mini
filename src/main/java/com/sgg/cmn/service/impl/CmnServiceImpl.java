package com.sgg.cmn.service.impl;

import com.sgg.cmn.mapper.CmnMapper;
import com.sgg.cmn.service.CmnService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.thymeleaf.util.ArrayUtils;

import java.util.List;
import java.util.Map;

@Service
public class CmnServiceImpl implements CmnService {

    @Autowired
    CmnMapper cmnMapper;

    /**
     * 공통코드 조회
     * @param map
     * @return List<Map<String, String>>
     */
    @Override
    public List<Map<String, Object>> getCode(Map<String, Object> map) throws Exception {
        List<Map<String, Object>> codeList = cmnMapper.getCode(map);

        if (!ArrayUtils.isEmpty(new Object[]{map.get("exCode")}) || !map.containsKey("exCode")) {

        }

        return codeList;
    }

}
