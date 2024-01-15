package com.sgg.mypage.service.impl;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sgg.config.cmnUtil;
import com.sgg.mypage.mapper.MypageMapper;
import com.sgg.mypage.service.MypageService;

import jakarta.servlet.http.HttpSession;

@Service
public class MypageServiceImpl implements MypageService{

    @Autowired
    MypageMapper mypageMapper;
    
    /**
     * 내 정보 수정으로 가기 전 아이디 비밀번호 체크
     * @param map
     * @return boolean
     */
	@Override
	public boolean chkMypage(Map<String, String> map, HttpSession session) throws Exception {
		// 비밀번호 단방향 암호화
    	String result = "";
		result = cmnUtil.hashEncpt(map.get("userPw"));
    	map.put("userPw", result);
    	
    	// 세션에서 아이디 가져오기
    	map.put("userId", (String) session.getAttribute("userId"));
    	
		int chk = mypageMapper.chkMypage(map);
		if (chk > 0) {
			return true;
		} else {
			return false;
		}
	}

	/**
	 * 마이페이지 정보 수정
	 * @param map
	 * @return Map<String, Object>
	 */
	@Override
	public Map<String, Object> saveAccount(Map<String, String> map, HttpSession session) throws Exception{
		map.put("userId", (String) session.getAttribute("userId"));

		return mypageMapper.saveAccount(map);
	}

	/**
	 * 회원정보 불러오기
	 * @param map
	 * @return Map<String, Object>
	 */
	@Override
	public Map<String, Object> getAccount(Map<String, String> map, HttpSession session) throws Exception {
		map.put("userId", (String) session.getAttribute("userId"));

		return mypageMapper.getAccount(map);
	}

}
