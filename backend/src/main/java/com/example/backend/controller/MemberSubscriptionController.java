package com.example.backend.controller;

import com.example.backend.dto.MemberSubscriptionRequest;
import com.example.backend.dto.MemberSubscriptionResponse;
import com.example.backend.entity.User;
import com.example.backend.repository.UserRepository;
import com.example.backend.service.MemberSubscriptionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/subscriptions")
@RequiredArgsConstructor
public class MemberSubscriptionController {

    private final MemberSubscriptionService subscriptionService;
    private final UserRepository userRepository;

    // 1. Xem danh sách tất cả hóa đơn / đăng ký gói tập (Manager / Receptionist)
    @PreAuthorize("hasAnyRole('MANAGER', 'RECEPTIONIST')")
    @GetMapping
    public ResponseEntity<List<MemberSubscriptionResponse>> getAllSubscriptions() {
        return ResponseEntity.ok(subscriptionService.getAllSubscriptions());
    }

    // 2. Hội viên xem lịch sử đăng ký gói tập của chính mình
    @GetMapping("/me")
    public ResponseEntity<List<MemberSubscriptionResponse>> getMySubscriptions(Authentication authentication) {
        String email = authentication.getName();
        User user = userRepository.findByEmail(email).orElseThrow();
        return ResponseEntity.ok(subscriptionService.getSubscriptionsByUserId(user.getId()));
    }

    // 3. Manager/Receptionist xem các gói tập của 1 hội viên cụ thể
    @PreAuthorize("hasAnyRole('MANAGER', 'RECEPTIONIST')")
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<MemberSubscriptionResponse>> getUserSubscriptions(@PathVariable Long userId) {
        return ResponseEntity.ok(subscriptionService.getSubscriptionsByUserId(userId));
    }

    // 4. Lễ tân / Manager đăng ký gói tập cho hội viên tại quầy
    @PreAuthorize("hasAnyRole('MANAGER', 'RECEPTIONIST')")
    @PostMapping
    public ResponseEntity<MemberSubscriptionResponse> createSubscription(
            @Valid @RequestBody MemberSubscriptionRequest request,
            Authentication authentication) {
        String createdByEmail = authentication.getName();
        return ResponseEntity.ok(subscriptionService.createSubscription(request, createdByEmail));
    }
}
