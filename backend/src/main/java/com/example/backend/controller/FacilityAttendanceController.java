package com.example.backend.controller;

import com.example.backend.dto.FacilityAttendanceRequest;
import com.example.backend.dto.FacilityAttendanceResponse;
import com.example.backend.service.FacilityAttendanceService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/attendances")
@RequiredArgsConstructor
public class FacilityAttendanceController {

    private final FacilityAttendanceService attendanceService;

    // 1. Lấy danh sách điểm danh gần đây (Lễ tân / Manager)
    @PreAuthorize("hasAnyRole('MANAGER', 'RECEPTIONIST')")
    @GetMapping
    public ResponseEntity<List<FacilityAttendanceResponse>> getRecentAttendances() {
        return ResponseEntity.ok(attendanceService.getRecentAttendances());
    }

    // 2. Hội viên xem lịch sử điểm danh của mình
    // Note: Cần lấy userId từ JWT để gọi, hoặc tạo 1 API riêng /api/attendances/me. Để đơn giản ta dùng API này và authorize kĩ hơn nếu cần.
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<FacilityAttendanceResponse>> getUserAttendances(@PathVariable Long userId) {
        return ResponseEntity.ok(attendanceService.getUserAttendances(userId));
    }

    // 3. Check-in hội viên vào cửa (Lễ tân thực hiện)
    @PreAuthorize("hasAnyRole('MANAGER', 'RECEPTIONIST')")
    @PostMapping("/check-in")
    public ResponseEntity<FacilityAttendanceResponse> checkIn(
            @Valid @RequestBody FacilityAttendanceRequest request,
            Authentication authentication) {
        String recordedByEmail = authentication.getName();
        return ResponseEntity.ok(attendanceService.checkIn(request, recordedByEmail));
    }

    // 4. Check-out hội viên (Tùy chọn)
    @PreAuthorize("hasAnyRole('MANAGER', 'RECEPTIONIST')")
    @PutMapping("/check-out/{id}")
    public ResponseEntity<FacilityAttendanceResponse> checkOut(@PathVariable Long id) {
        return ResponseEntity.ok(attendanceService.checkOut(id));
    }
}
