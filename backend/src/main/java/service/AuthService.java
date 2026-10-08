package service;

import ch.qos.logback.classic.encoder.JsonEncoder;
import config.SecurityConfig;
import dto.RegisterResponse;
import entity.MemberProfile;
import jakarta.transaction.Transactional;
import org.springframework.security.crypto.password.PasswordEncoder;
import dto.RegisterRequest;
import entity.Role;
import entity.RolePermission;
import entity.User;
import exception.BusinessRuleException;
import org.springframework.stereotype.Service;
import repository.RoleRepository;
import repository.UserRepository;

import java.time.LocalDate;
import java.time.OffsetDateTime;

@Service
public class AuthService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final SecurityConfig sercurityConfig;
    private final PasswordEncoder passwordEncoder;
    private RegisterRequest registerRequest;

    public AuthService(UserRepository userRepository, RoleRepository roleRepository, SecurityConfig sercurityConfig, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.sercurityConfig = sercurityConfig;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public RegisterResponse Register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new BusinessRuleException("Email already exists");
        }
        if (userRepository.existByPhone(request.getPhone())) {
            throw new BusinessRuleException("Phone already exists");
        }
        Role role = roleRepository.findByCode("MEMBER").orElseThrow(() -> new RuntimeException("Lỗi hệ thống: Không tìm thấy Role MEMBER"));

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
                "Đăng ký hội viên thành công!"
        );
    }


}
