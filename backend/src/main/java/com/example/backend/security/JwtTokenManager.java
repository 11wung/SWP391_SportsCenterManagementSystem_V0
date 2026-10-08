package com.example.backend.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Component
public class JwtTokenManager {

    // kéo khóa bí mật từ file properties
    @Value("${swp391.khoa.bimat}")
    private String khoaBiMat;

    // kéo thời hạn 30 ngày từ file properties
    @Value("${swp391.thoigian.song}")
    private long thoiGianSong;

    // 1.hàm Cấp Vé (Phát hành Token)
    public String capVeChoThanhVien(String email) {
        long thoiDiemHienTai = System.currentTimeMillis();

        // tạo lõi bảo mật thủ công thay vì dùng thư viện tự động
        byte[] mangDuLieuKhoa = khoaBiMat.getBytes(StandardCharsets.UTF_8);
        SecretKeySpec loiBaoMat = new SecretKeySpec(mangDuLieuKhoa, SignatureAlgorithm.HS256.getJcaName());

        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(new Date(thoiDiemHienTai))
                .setExpiration(new Date(thoiDiemHienTai + thoiGianSong))
                .signWith(loiBaoMat)
                .compact();
    }

    // 2.hàm Quét Vé (Lấy Email)
    public String quetEmailTuVe(String chuoiVe) {
        byte[] mangDuLieuKhoa = khoaBiMat.getBytes(StandardCharsets.UTF_8);
        SecretKeySpec loiBaoMat = new SecretKeySpec(mangDuLieuKhoa, SignatureAlgorithm.HS256.getJcaName());

        return Jwts.parserBuilder()
                .setSigningKey(loiBaoMat)
                .build()
                .parseClaimsJws(chuoiVe)
                .getBody()
                .getSubject();
    }

    // 3.h àm Soi Vé (Kiểm tra thật giả)
    public boolean soiVeCoHopLeKhong(String chuoiVe) {
        try {
            byte[] mangDuLieuKhoa = khoaBiMat.getBytes(StandardCharsets.UTF_8);
            SecretKeySpec loiBaoMat = new SecretKeySpec(mangDuLieuKhoa, SignatureAlgorithm.HS256.getJcaName());

            Jwts.parserBuilder().setSigningKey(loiBaoMat).build().parseClaimsJws(chuoiVe);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}