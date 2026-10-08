package config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import security.BoLocBaoMatJwt;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain cauHinhBaoMat(HttpSecurity tuyChinhHttp, BoLocBaoMatJwt boLoc) throws Exception {
        // Tắt chống tấn công CSRF (Vì API dùng JWT là đủ an toàn)
        tuyChinhHttp.csrf(c -> c.disable());

        // Không lưu phiên đăng nhập trên RAM server (STATELESS)
        tuyChinhHttp.sessionManagement(s -> s.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        // Thiết lập luồng đi (Cho phép api auth đi qua, còn lại bắt buộc phải có vé
        // JWT)
        tuyChinhHttp.authorizeHttpRequests(q -> {
            q.requestMatchers("/api/auth/**").permitAll();
            q.anyRequest().authenticated();
        });

        // Bố trí Trạm Kiểm Soát JWT đứng trước trạm kiểm soát Username/Password mặc
        // định của Spring
        tuyChinhHttp.addFilterBefore(boLoc, UsernamePasswordAuthenticationFilter.class);

        return tuyChinhHttp.build();
    }
}