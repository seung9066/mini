package com.sgg.cmn.service.impl;

import com.sgg.cmn.mapper.CmnMapper;
import com.sgg.cmn.service.CmnService;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;
import org.thymeleaf.util.ArrayUtils;
import org.thymeleaf.util.MapUtils;

import java.util.List;
import java.util.Map;

@Service
public class CmnServiceImpl implements CmnService {

    @Autowired
    private SqlSession sqlSession;

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

    /**
     * 목록 조회
     * @param map
     * @param param
     * @return
     * @throws Exception
     */
    @Override
    public List<Map<String, Object>> getList(Map<String, Object> map, Map<String, Object> param) throws Exception {
        if (MapUtils.isEmpty(map)) {
            return sqlSession.selectList(String.valueOf(param.get("path")), param.get("data"));
        } else {
            return sqlSession.selectList(String.valueOf(map.get("path")), map.get("data"));
        }
    }

    /**
     * 단건 조회
     * @param map
     * @param param
     * @return
     * @throws Exception
     */
    @Override
    public Map<String, Object> getData(Map<String, Object> map, Map<String, Object> param) throws Exception {
        if (MapUtils.isEmpty(map)) {
            return sqlSession.selectOne(String.valueOf(param.get("path")), param.get("data"));
        } else {
            return sqlSession.selectOne(String.valueOf(map.get("path")), map.get("data"));
        }
    }

    /**
     * 업데이트
     * @param map
     * @return
     * @throws Exception
     */
    public int upData(Map<String, Object> map) throws Exception{
        int chk = 0;

        if (!ObjectUtils.isEmpty(map.get("data"))) {
            if (map.get("data") instanceof java.util.Map) {
                chk = sqlSession.update(String.valueOf(map.get("path")), map.get("data"));
            }
            if (map.get("data").getClass().isArray()) {
                Object[] arr = (Object[]) map.get("data");
                for (int i = 0; i < arr.length; i++) {
                    chk += sqlSession.update(String.valueOf(map.get("path")), arr[i]);
                }
            }
        }

        return chk;
    }

}
