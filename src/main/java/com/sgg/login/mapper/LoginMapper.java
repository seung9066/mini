package com.sgg.login.mapper;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface LoginMapper {

    public Map<String, Object> getId(Map<String, String> map);

    public Map<String, Object> loginChk(Map<String, String> map);
}
