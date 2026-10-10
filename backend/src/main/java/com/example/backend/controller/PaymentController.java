package com.example.backend.controller;

import com.example.backend.dto.PaymentRequest;
import com.example.backend.service.PaymentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;

    @PreAuthorize("hasAnyRole('MANAGER', 'RECEPTIONIST')")
    @PostMapping
    public ResponseEntity<?> processPayment(@Valid @RequestBody PaymentRequest request, Authentication authentication) {
        String email = authentication.getName();
        return ResponseEntity.ok(paymentService.processPayment(request, email));
    }
}
