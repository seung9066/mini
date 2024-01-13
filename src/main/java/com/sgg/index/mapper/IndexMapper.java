package com.sgg.index.mapper;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface IndexMapper {

    public List<Map<String, Object>> getLine(Map<String, String> map);

    public List<Map<String, Object>> getPre(Map<String, String> map);

    Map<String, Object> getContact(Map<String, String> map);
}
