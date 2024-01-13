package com.sgg.menu.service.impl;

import com.sgg.menu.mapper.MenuMapper;
import com.sgg.menu.service.MenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class MenuServiceImpl implements MenuService{

    @Autowired
    MenuMapper menuMapper;

    /**
     * 메뉴목록 불러오기
     * @param map
     * @return List<Map<String, String>>
     */
    @Override
    public List<Map<String, Object>> getMenu(Map<String, String> map) throws Exception{

        return menuMapper.getMenu(map);
    }
}
