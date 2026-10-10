package com.example.backend.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.dto.ClassRegistrationRequest;
import com.example.backend.dto.ClassRegistrationResponse;
import com.example.backend.service.ClassRegistrationService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/class-registrations")
@RequiredArgsConstructor
public class ClassRegistrationController {

    private final ClassRegistrationService classRegistrationService;

    // 1. Hội viên xem danh sách lớp đã đăng ký
    @PreAuthorize("hasRole('MEMBER')")
    @GetMapping("/my-bookings")
    public ResponseEntity<List<ClassRegistrationResponse>> getMyBookings(Authentication authentication) {
        return ResponseEntity.ok(classRegistrationService.getMyBookings(authentication.getName()));
    }

    // 2. Hội viên đăng ký lớp học
    @PreAuthorize("hasRole('MEMBER')")
    @PostMapping
    public ResponseEntity<ClassRegistrationResponse> registerClass(@Valid @RequestBody ClassRegistrationRequest request, Authentication authentication) {
        return ResponseEntity.status(HttpStatus.CREATED).body(classRegistrationService.registerClass(request.getClassId(), authentication.getName()));
    }

    // 3. Hội viên hủy đăng ký lớp học
    @PreAuthorize("hasRole('MEMBER')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> cancelBooking(@PathVariable Long id, Authentication authentication) {
        classRegistrationService.cancelBooking(id, authentication.getName());
        return ResponseEntity.noContent().build();
    }
}