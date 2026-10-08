package com.example.backend.service;

import com.example.backend.dto.LoginRequest;
import com.example.backend.dto.LoginResponse;
import com.example.backend.dto.RegisterRequest;
import com.example.backend.dto.RegisterResponse;
import com.example.backend.entity.MemberProfile;
import com.example.backend.entity.Role;
import com.example.backend.entity.User;
import com.example.backend.exception.BusinessRuleException;
import com.example.backend.repository.RoleRepository;
import com.example.backend.repository.UserRepository;
import com.example.backend.security.JwtTokenManager;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.OffsetDateTime;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenManager jwtTokenManager;

    @Transactional
    public RegisterResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new BusinessRuleException("Email already exists");
        }
        if (userRepository.existsByPhone(request.getPhone())) {
            throw new BusinessRuleException("Phone already exists");
        }

        Role role = roleRepository.findByCode("MEMBER")
                .orElseThrow(() -> new RuntimeException("Lỗi hệ thống: Không tìm thấy Role MEMBER"));

        User newUser = User.builder()
                .role(role)
                .fullName(request.getFullName())
                .email(request.getEmail())
                .phone(request.getPhone())
                .passwordHash(passwordEncoder.encode(request.getPassword()))
                .isActive(true)
                .createdAt(OffsetDateTime.now())
                .build();

        MemberProfile profile = MemberProfile.builder()
                .joinDate(LocalDate.now())
                .build();
        newUser.setMemberProfile(profile);

        User savedUser = userRepository.save(newUser);

        return new RegisterResponse(
                savedUser.getId(),
                savedUser.getFullName(),
                savedUser.getEmail(),
                savedUser.getPhone());
    }

    public LoginResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new BusinessRuleException("Sai email hoặc mật khẩu!"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
            throw new BusinessRuleException("Sai email hoặc mật khẩu!");
        }

        if (!user.getIsActive()) {
            throw new BusinessRuleException("Tài khoản của bạn đã bị khóa!");
        }

        String token = jwtTokenManager.capVeChoThanhVien(user.getEmail());

        LoginResponse response = new LoginResponse();
        response.setToken(token);
        response.setEmail(user.getEmail());
        response.setFullName(user.getFullName());
        response.setRole(user.getRole().getCode());

        return response;
    }
}