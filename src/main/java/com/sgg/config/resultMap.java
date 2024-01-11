package com.sgg.config;

import java.util.HashMap;

import org.springframework.jdbc.support.JdbcUtils;

@SuppressWarnings("serial")
public class resultMap extends HashMap<String, Object> {

    @Override
    public Object put(String key, Object value) {
        return super.put(JdbcUtils.convertUnderscoreNameToPropertyName(key), value);
    }

}