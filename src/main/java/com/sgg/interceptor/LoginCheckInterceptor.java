package com.sgg.interceptor;

import groovy.util.logging.Slf4j;
import org.springframework.web.servlet.HandlerInterceptor;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

@Slf4j
public class LoginCheckInterceptor implements HandlerInterceptor {
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {

		String requestURI = request.getRequestURI();
		HttpSession session = request.getSession(false);
		
		if(session == null || session.getAttribute("userId") == null) {
       		// 로그인 되지 않음
			System.out.println("[미인증 사용자 요청]");
			
			//로그인으로 redirect
			// response.sendRedirect("/?redirectURL=" + requestURI);
			return false;
		}
        // 로그인 되어있을 떄
		return true;
	}
}
