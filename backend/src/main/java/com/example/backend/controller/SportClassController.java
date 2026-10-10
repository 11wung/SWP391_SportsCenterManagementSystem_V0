package com.example.backend.controller;

import com.example.backend.dto.ClassScheduleRequest;
import com.example.backend.dto.ClassScheduleResponse;
import com.example.backend.dto.SportClassRequest;
import com.example.backend.dto.SportClassResponse;
import com.example.backend.service.SportClassService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/classes")
@RequiredArgsConstructor
public class SportClassController {

    private final SportClassService sportClassService;

    // 1. Xem danh sách tất cả các lớp đang mở (Ai đăng nhập rồi cũng xem được)
    @GetMapping
    public ResponseEntity<List<SportClassResponse>> getAllActiveClasses() {
        return ResponseEntity.ok(sportClassService.getAllActiveClasses());
    }

    // 2. Xem chi tiết 1 lớp học
    @GetMapping("/{id}")
    public ResponseEntity<SportClassResponse> getClassById(@PathVariable Long id) {
        return ResponseEntity.ok(sportClassService.getClassById(id));
    }

    // 3. Quản lý tạo lớp học mới
    @PreAuthorize("hasRole('MANAGER')")
    @PostMapping
    public ResponseEntity<SportClassResponse> createClass(@Valid @RequestBody SportClassRequest request) {
        return ResponseEntity.ok(sportClassService.createClass(request));
    }

    // 4. Quản lý sửa thông tin lớp học
    @PreAuthorize("hasRole('MANAGER')")
    @PutMapping("/{id}")
    public ResponseEntity<SportClassResponse> updateClass(
            @PathVariable Long id,
            @Valid @RequestBody SportClassRequest request) {
        return ResponseEntity.ok(sportClassService.updateClass(id, request));
    }

    // 5. Quản lý hủy/vô hiệu hóa lớp học
    @PreAuthorize("hasRole('MANAGER')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deactivateClass(@PathVariable Long id) {
        sportClassService.deactivateClass(id);
        return ResponseEntity.ok(Map.of("message", "Đã vô hiệu hóa lớp học thành công"));
    }

    // 6. Quản lý thêm lịch học vào lớp
    @PreAuthorize("hasRole('MANAGER')")
    @PostMapping("/{id}/schedules")
    public ResponseEntity<ClassScheduleResponse> addSchedule(
            @PathVariable Long id,
            @Valid @RequestBody ClassScheduleRequest request) {
        return ResponseEntity.ok(sportClassService.addScheduleToClass(id, request));
    }
}