package com.sgg.menu.service;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public interface MenuService {

    List<Map<String, Object>> getMenu(Map<String, String> map);
}
