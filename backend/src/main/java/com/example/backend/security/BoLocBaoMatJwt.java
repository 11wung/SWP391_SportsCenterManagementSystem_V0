package com.example.backend.security;

import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.util.ArrayList;

@Component
public class BoLocBaoMatJwt implements Filter {

    private final JwtTokenManager quanLyVe;

    public BoLocBaoMatJwt(JwtTokenManager quanLyVe) {
        this.quanLyVe = quanLyVe;
    }

    @Override
    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) {
        try {
            HttpServletRequest yeuCauHttp = (HttpServletRequest) req;
            String dauVaoHeader = yeuCauHttp.getHeader("Authorization");

            if (dauVaoHeader != null && dauVaoHeader.startsWith("Bearer ")) {
                String chuoiVeHienTai = dauVaoHeader.substring(7);
                String emailNguoiDung = quanLyVe.quetEmailTuVe(chuoiVeHienTai);

                if (emailNguoiDung != null && quanLyVe.soiVeCoHopLeKhong(chuoiVeHienTai)) {
                    if (SecurityContextHolder.getContext().getAuthentication() == null) {
                        UsernamePasswordAuthenticationToken theHanhKhach = new UsernamePasswordAuthenticationToken(
                                emailNguoiDung, null, new ArrayList<>());
                        SecurityContextHolder.getContext().setAuthentication(theHanhKhach);
                    }
                }
            }
            chain.doFilter(req, res);
        } catch (Exception e) {
            System.out.println("Lỗi ở trạm kiểm soát: " + e.getMessage());
            try {
                chain.doFilter(req, res);
            } catch (Exception ignore) {
            }
        }
    }
}