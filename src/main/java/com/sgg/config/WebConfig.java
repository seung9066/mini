package com.sgg.config;

import com.sgg.cmn.service.CmnService;
import com.sgg.interceptor.LogInterceptor;
import com.sgg.interceptor.LoginCheckInterceptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
	@Autowired
	CmnService cmnService;

	@Override
	public void addInterceptors(InterceptorRegistry registry) {
		registry.addInterceptor(new LogInterceptor(cmnService)) // LogInterceptor 등록
				.order(1)	// 적용할 필터 순서 설정
				.addPathPatterns("/page", "/pageMap", "/")
				.excludePathPatterns("/error"); // 인터셉터에서 제외할 패턴

		registry.addInterceptor(new LoginCheckInterceptor()) //LoginCheckInterceptor 등록
				.order(2)
				.addPathPatterns("/**")
				.excludePathPatterns("/", "/menu/**", "/login/**", "/index/**", "/page"
										, "/js/**", "/style/**", "/forms/**", "/assets/**"
										, "/favicon.ico");
		//
	}
}
