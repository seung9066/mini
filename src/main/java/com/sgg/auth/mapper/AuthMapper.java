package com.sgg.auth.mapper;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface AuthMapper {

    List<Map<String, Object>> getList(Map<String, String> map);

    int getListCnt(Map<String, String> map);

    int doSave(Map<String, String> map);

    int doSaveInfo(Map<String, String> map);

    int delInfo(Map<String, String> map);
}
