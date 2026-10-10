package com.example.backend.controller;

import com.example.backend.dto.ClassBookingRequest;
import com.example.backend.dto.ClassBookingResponse;
import com.example.backend.service.ClassBookingService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@RequiredArgsConstructor
public class ClassBookingController {

    private final ClassBookingService bookingService;

    // 1. Đặt lịch lớp học (Hội viên tự đặt hoặc Lễ tân đặt hộ)
    @PostMapping
    public ResponseEntity<ClassBookingResponse> bookClass(
            @Valid @RequestBody ClassBookingRequest request,
            Authentication authentication) {
        return ResponseEntity.ok(bookingService.bookClass(authentication.getName(), request));
    }

    // 2. Hủy đặt lịch lớp học
    @PutMapping("/{id}/cancel")
    public ResponseEntity<ClassBookingResponse> cancelBooking(
            @PathVariable Long id,
            Authentication authentication) {
        return ResponseEntity.ok(bookingService.cancelBooking(id, authentication.getName()));
    }

    // 3. Hội viên xem lịch sử đặt lớp của chính mình
    @GetMapping("/me")
    public ResponseEntity<List<ClassBookingResponse>> getMyBookings(Authentication authentication) {
        return ResponseEntity.ok(bookingService.getMyBookings(authentication.getName()));
    }

    // 4. Huấn luyện viên hoặc Quản lý xem danh sách học viên trong lớp
    @PreAuthorize("hasAnyRole('MANAGER', 'COACH', 'RECEPTIONIST')")
    @GetMapping("/class/{classId}")
    public ResponseEntity<List<ClassBookingResponse>> getRegistrationsByClass(@PathVariable Long classId) {
        return ResponseEntity.ok(bookingService.getRegistrationsByClass(classId));
    }
}