package com.example.backend.security;

import com.example.backend.entity.User;
import com.example.backend.repository.UserRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;

@Component
public class BoLocBaoMatJwt extends OncePerRequestFilter {

    private final JwtTokenManager quanLyVe;
    private final UserRepository userRepository;

    public BoLocBaoMatJwt(JwtTokenManager quanLyVe, UserRepository userRepository) {
        this.quanLyVe = quanLyVe;
        this.userRepository = userRepository;
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
                        User dbUser = userRepository.findByEmail(emailNguoiDung).orElse(null);
                        
                        if (dbUser != null && dbUser.getIsActive()) {
                            java.util.List<org.springframework.security.core.authority.SimpleGrantedAuthority> authorities = new java.util.ArrayList<>();
                            authorities.add(new org.springframework.security.core.authority.SimpleGrantedAuthority("ROLE_" + dbUser.getRole().getCode()));
                            
                            if (dbUser.getRole().getRolePermissions() != null) {
                                for (com.example.backend.entity.RolePermission rp : dbUser.getRole().getRolePermissions()) {
                                    authorities.add(new org.springframework.security.core.authority.SimpleGrantedAuthority(rp.getPermission().getCode()));
                                }
                            }
                            
                            UsernamePasswordAuthenticationToken theHanhKhach = new UsernamePasswordAuthenticationToken(
                                    emailNguoiDung, null, authorities);
                            SecurityContextHolder.getContext().setAuthentication(theHanhKhach);
                        }
                    }
                }
            }
        } catch (Exception e) {
            System.out.println("Lỗi JWT Filter: " + e.getMessage());
        }
        chain.doFilter(yeuCauHttp, res);
    }
}