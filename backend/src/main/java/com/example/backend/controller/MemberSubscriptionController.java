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

    // 3.1 Hội viên xem CÁC GÓI TẬP ĐANG ACTIVE CỦA MÌNH
    @GetMapping("/me/active")
    public ResponseEntity<List<MemberSubscriptionResponse>> getMyActiveSubscriptions(Authentication authentication) {
        String email = authentication.getName();
        User user = userRepository.findByEmail(email).orElseThrow();
        return ResponseEntity.ok(subscriptionService.getActiveSubscriptionsByUserId(user.getId()));
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

    // 4.1 Hội viên TỰ ĐĂNG KÝ / GIA HẠN GÓI TẬP
    @PostMapping("/me")
    public ResponseEntity<MemberSubscriptionResponse> subscribeMe(
            @RequestParam Long packageId,
            Authentication authentication) {
        String email = authentication.getName();
        User user = userRepository.findByEmail(email).orElseThrow();
        
        MemberSubscriptionRequest request = new MemberSubscriptionRequest();
        request.setUserId(user.getId());
        request.setPackageId(packageId);
        
        return ResponseEntity.ok(subscriptionService.createSubscription(request, email));
    }
    // 5. Manager / Lễ tân Kích hoạt gói tập (sau khi thanh toán)
    @PreAuthorize("hasAnyRole('MANAGER', 'RECEPTIONIST')")
    @PutMapping("/{id}/activate")
    public ResponseEntity<MemberSubscriptionResponse> activateSubscription(@PathVariable Long id) {
        return ResponseEntity.ok(subscriptionService.activateSubscription(id));
    }
}
