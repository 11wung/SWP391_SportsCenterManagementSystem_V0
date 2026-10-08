package com.example.backend.controller;

import com.example.backend.dto.MemberSummaryResponse;
import com.example.backend.dto.ProfileResponse;
import com.example.backend.dto.UpdateProfileRequest;
import com.example.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    // authentication.getName() chính là email mà BoLocBaoMatJwt đã nhét vào

    @GetMapping("/profile")
    public ResponseEntity<ProfileResponse> getProfile(Authentication authentication) {
        return ResponseEntity.ok(userService.getProfile(authentication.getName()));
    }

    @PutMapping("/profile")
    public ResponseEntity<ProfileResponse> updateProfile(Authentication authentication,
            @RequestBody UpdateProfileRequest request) {
        return ResponseEntity.ok(userService.updateProfile(authentication.getName(), request));
    }

    @GetMapping("/members")
    public ResponseEntity<List<MemberSummaryResponse>> getMembers(
            Authentication authentication,
            @RequestParam(required = false) String keyword) {
        return ResponseEntity.ok(userService.getMembers(authentication.getName(), keyword));
    }
}