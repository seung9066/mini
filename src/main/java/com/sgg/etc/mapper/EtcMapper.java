package com.sgg.etc.mapper;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface EtcMapper {

    List<Map<String, Object>> diaryList(Map<String, Object> map);
}
