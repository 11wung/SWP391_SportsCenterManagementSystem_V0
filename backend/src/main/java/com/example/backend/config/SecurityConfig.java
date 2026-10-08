package com.example.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration; // Bắt buộc phải import
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity// <--- Đã bổ sung nhãn quan trọng này
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                // 1. Tắt CSRF vì đây là REST API (dùng Postman/React/Angular gọi lên)
                .csrf(csrf -> csrf.disable())

                // 2. Cấu hình phân quyền đường dẫn
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/auth/**").permitAll() // Cho phép tất cả gọi vào các API /api/auth (đăng ký, đăng nhập...) mà không cần token
                        .anyRequest().authenticated() // Các request khác bắt buộc phải xác thực
                );

        return http.build();
    }
}