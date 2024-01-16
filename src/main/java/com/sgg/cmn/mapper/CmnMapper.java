package com.sgg.cmn.mapper;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface CmnMapper {

    public List<Map<String, Object>> getCode(Map<String, Object> map);

}
