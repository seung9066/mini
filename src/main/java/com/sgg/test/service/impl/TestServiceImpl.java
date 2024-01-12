package com.sgg.test.service.impl;

import com.sgg.test.mapper.TestMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sgg.test.service.TestService;

@Service
public class TestServiceImpl implements TestService{

    @Autowired
    TestMapper testMapper;
}
