package com.sgg.mypage.mapper;

import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface MypageMapper {

	public int chkMypage(Map<String, String> map);

    public int saveAccount(Map<String, String> map);

    public Map<String, Object> getAccount(Map<String, String> map);

    public int upAccountAuth(Map<String, String> map);
}
