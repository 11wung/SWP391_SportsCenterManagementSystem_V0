package service;

import config.SecurityConfig;
import org.springframework.security.crypto.password.PasswordEncoder;
import dto.RegisterRequest;
import entity.Role;
import entity.User;
import exception.BusinessRuleException;
import org.springframework.stereotype.Service;
import repository.RoleRepository;
import repository.UserRepository;

import java.time.OffsetDateTime;

@Service
public class AuthService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final SecurityConfig sercurityConfig;
    private final PasswordEncoder passwordEncoder;

    public AuthService(UserRepository userRepository, RoleRepository roleRepository, SecurityConfig sercurityConfig,
            PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.sercurityConfig = sercurityConfig;
        this.passwordEncoder = passwordEncoder;
    }

    public void Register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new BusinessRuleException("Email already exists");
        }
        if (userRepository.existByPhone(request.getPhone())) {
            throw new BusinessRuleException("Phone already exists");
        }
        Role role = roleRepository.findByCode("MEMBER")
                .orElseThrow(() -> new RuntimeException("Lỗi hệ thống: Không tìm thấy Role MEMBER"));

        // Dùng new() và setter thay vì dùng Builder để không phụ thuộc Lombok
        User newUser = new User();
        newUser.setRole(role);
        newUser.setFullName(request.getFullName());
        newUser.setEmail(request.getEmail());
        newUser.setPhone(request.getPhone());
        newUser.setPasswordHash(passwordEncoder.encode(request.getPassword()));
        newUser.setIsActive(true);
        newUser.setCreatedAt(OffsetDateTime.now());

        // Lưu vào Database
        userRepository.save(newUser);
    }
}