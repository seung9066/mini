package com.sgg.menu.mapper;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface MenuMapper {
    public List<Map<String, Object>> getMenu(Map<String, String> map);

    public List<Map<String, Object>> getLine(Map<String, String> map);

    public List<Map<String, Object>> getPre(Map<String, String> map);
}
