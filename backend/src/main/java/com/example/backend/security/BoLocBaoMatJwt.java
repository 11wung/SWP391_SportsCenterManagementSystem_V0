package com.example.backend.security;

import com.example.backend.security.JwtTokenManager;
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
            // Ép kiểu để lấy Header
            HttpServletRequest yeuCauHttp = (HttpServletRequest) req;
            String dauVaoHeader = yeuCauHttp.getHeader("Authorization");

            // Kiểm tra xem có vé (Bearer token) không
            if (dauVaoHeader != null && dauVaoHeader.startsWith("Bearer ")) {
                String chuoiVeHienTai = dauVaoHeader.substring(7);
                String emailNguoiDung = quanLyVe.quetEmailTuVe(chuoiVeHienTai);

                // Nếu vé hợp lệ và hệ thống chưa ghi nhận người này
                if (emailNguoiDung != null && quanLyVe.soiVeCoHopLeKhong(chuoiVeHienTai)) {
                    if (SecurityContextHolder.getContext().getAuthentication() == null) {

                        // Đóng dấu xác nhận cho phép đi qua
                        UsernamePasswordAuthenticationToken theHanhKhach = new UsernamePasswordAuthenticationToken(
                                emailNguoiDung, null, new ArrayList<>());

                        SecurityContextHolder.getContext().setAuthentication(theHanhKhach);
                    }
                }
            }
            // Mời đi tiếp vào bên trong (Controller)
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