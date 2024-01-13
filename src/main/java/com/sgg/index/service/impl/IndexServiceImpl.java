package com.sgg.index.service.impl;

import com.sgg.index.mapper.IndexMapper;
import com.sgg.index.service.IndexService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class IndexServiceImpl implements IndexService {

    @Autowired
    IndexMapper indexMapper;

    /**
     * 소개목록 불러오기
     * @param map
     * @return List<Map<String, String>>
     */
    @Override
    public List<Map<String, Object>> getLine(Map<String, String> map) throws Exception {

        return indexMapper.getLine(map);
    }

    /**
     * 소개내용 불러오기
     * @param map
     * @return List<Map<String, String>>
     */
    @Override
    public List<Map<String, Object>> getPre(Map<String, String> map) throws Exception {

        return indexMapper.getPre(map);
    }
}
