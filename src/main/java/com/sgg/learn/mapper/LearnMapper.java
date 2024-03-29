package com.sgg.learn.mapper;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface LearnMapper {

    public List<Map<String, Object>> getList(Map<String, String> map);

    public int getListCnt(Map<String, String> map);

    List<Map<String, Object>> getDtl(Map<String, String> map);

    int doSave(Map<String, String> map);

    String getCodeNo();

    int doSaveDtl(Map<String, String> map);

    int delDtl(Map<String, String> map);

    int delNo(Map<String, String> map);
}
