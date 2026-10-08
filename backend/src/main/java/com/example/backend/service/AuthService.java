package com.example.backend.service; // Đảm bảo dòng này trỏ đúng đường dẫn thư mục của bạn, không để chữ 'service' cộc lốc


import com.example.backend.dto.RegisterRequest;
import com.example.backend.dto.RegisterResponse;
import com.example.backend.entity.MemberProfile;
import com.example.backend.entity.Role;
import com.example.backend.entity.User;
import com.example.backend.exception.BusinessRuleException;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.example.backend.repository.RoleRepository;
import com.example.backend.repository.UserRepository;
import org.springframework.web.bind.annotation.GetMapping;

import java.time.LocalDate;
import java.time.OffsetDateTime;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public RegisterResponse register(RegisterRequest request) { // Đổi void thành RegisterResponse, viết thường chữ 'r'

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
                savedUser.getPhone()
        );
    }

}