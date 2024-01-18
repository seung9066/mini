package com.sgg.config;

import java.util.HashMap;
import java.util.LinkedHashMap;

import org.springframework.jdbc.support.JdbcUtils;

@SuppressWarnings("serial")
public class resultMap extends LinkedHashMap<String, Object> {

    @Override
    public Object put(String key, Object value) {
        return super.put(JdbcUtils.convertUnderscoreNameToPropertyName(key), value);
    }

}