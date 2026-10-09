package com.example.backend.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.ArrayList;

@Component
public class BoLocBaoMatJwt extends OncePerRequestFilter {

    private final JwtTokenManager quanLyVe;

    public BoLocBaoMatJwt(JwtTokenManager quanLyVe) {
        this.quanLyVe = quanLyVe;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest yeuCauHttp, HttpServletResponse res, FilterChain chain)
            throws ServletException, IOException {
        try {
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
        } catch (Exception e) {
            System.out.println("Lỗi ở trạm kiểm soát: " + e.getMessage());
        }
        chain.doFilter(yeuCauHttp, res);
    }
}