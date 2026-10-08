package service;

import config.SecurityConfig;
import org.springframework.security.crypto.password.PasswordEncoder;

import dto.LoginRequest;
import dto.LoginResponse;
import dto.RegisterRequest;
import entity.Role;
import entity.User;
import exception.BusinessRuleException;
import org.springframework.stereotype.Service;
import repository.RoleRepository;
import repository.UserRepository;
import security.JwtTokenManager;

import java.time.OffsetDateTime;

@Service
public class AuthService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final SecurityConfig sercurityConfig;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenManager jwtTokenManager;

    public AuthService(UserRepository userRepository, RoleRepository roleRepository, SecurityConfig sercurityConfig,
            PasswordEncoder passwordEncoder, JwtTokenManager jwtTokenManager) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.sercurityConfig = sercurityConfig;
        this.passwordEncoder = passwordEncoder;
        this.jwtTokenManager = jwtTokenManager;
    }

    public void Register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new BusinessRuleException("Email already exists");
        }
        if (userRepository.existsByPhone(request.getPhone())) {
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

    public LoginResponse login(LoginRequest request) {
        // 1.tìm user theo email
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new BusinessRuleException("Sai email hoặc mật khẩu!"));
        // 2.kiểm tra mật khẩu
        if (!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
            throw new BusinessRuleException("Sai email hoặc mật khẩu!");
        }
        // 3.iểm tra xem tài khoản có đang hoạt động không
        if (!user.getIsActive()) {
            throw new BusinessRuleException("Tài khoản của bạn đã bị khóa!");
        }
        // 4.cấp JWT token
        String token = jwtTokenManager.capVeChoThanhVien(user.getEmail()); // hoặc truyền thêm tham số role nếu hàm của
                                                                           // bạn yêu cầu
        // 5.đóng gói kết quả trả về
        LoginResponse response = new LoginResponse();
        response.setToken(token);
        response.setEmail(user.getEmail());
        response.setFullName(user.getFullName());
        response.setRole(user.getRole().getCode());

        return response;
    }
}