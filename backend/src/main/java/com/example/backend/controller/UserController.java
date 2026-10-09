package com.example.backend.controller;

import com.example.backend.dto.UpdateProfileRequest;
import com.example.backend.dto.UserResponse;
import com.example.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    // 1. Xem hồ sơ cá nhân
    @GetMapping("/me")
    public ResponseEntity<UserResponse> getMyProfile(Authentication authentication) {
        // authentication.getName() sẽ trả về email do JwtFilter đã set
        String email = authentication.getName();
        return ResponseEntity.ok(userService.getMyProfile(email));
    }

    // 2. Cập nhật hồ sơ cá nhân
    @PutMapping("/me")
    public ResponseEntity<UserResponse> updateMyProfile(
            Authentication authentication,
            @RequestBody UpdateProfileRequest request) {
        String email = authentication.getName();
        return ResponseEntity.ok(userService.updateMyProfile(email, request));
    }

    // 3. Xem danh sách tất cả người dùng (Dành cho Manager / Receptionist)
    @org.springframework.security.access.prepost.PreAuthorize("hasAnyRole('MANAGER', 'RECEPTIONIST')")
    @GetMapping
    public ResponseEntity<List<UserResponse>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    // 4. Xem chi tiết 1 người dùng bằng ID
    @org.springframework.security.access.prepost.PreAuthorize("hasAnyRole('MANAGER', 'RECEPTIONIST')")
    @GetMapping("/{id}")
    public ResponseEntity<UserResponse> getUserById(@PathVariable Long id) {
        return ResponseEntity.ok(userService.getUserById(id));
    }

    // 5. Khóa/Mở khóa tài khoản (Dành cho Manager)
    @org.springframework.security.access.prepost.PreAuthorize("hasRole('MANAGER')")
    @PutMapping("/{id}/status")
    public ResponseEntity<Map<String, String>> updateUserStatus(
            @PathVariable Long id,
            @RequestParam boolean isActive) {
        userService.updateUserStatus(id, isActive);
        return ResponseEntity.ok(Map.of("message", isActive ? "Đã mở khóa tài khoản thành công" : "Đã khóa tài khoản thành công"));
    }
}
