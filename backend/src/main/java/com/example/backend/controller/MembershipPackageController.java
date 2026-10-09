package com.example.backend.controller;

import com.example.backend.dto.MembershipPackageRequest;
import com.example.backend.dto.MembershipPackageResponse;
import com.example.backend.service.MembershipPackageService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/packages")
@RequiredArgsConstructor
public class MembershipPackageController {

    private final MembershipPackageService packageService;

    // 1. Lấy danh sách tất cả các gói tập (Ai cũng xem được, kể cả chưa đăng nhập nếu cần, nhưng hiện tại bắt buộc auth)
    @GetMapping
    public ResponseEntity<List<MembershipPackageResponse>> getAllPackages() {
        return ResponseEntity.ok(packageService.getAllPackages());
    }

    // 2. Lấy thông tin 1 gói tập
    @GetMapping("/{id}")
    public ResponseEntity<MembershipPackageResponse> getPackageById(@PathVariable Long id) {
        return ResponseEntity.ok(packageService.getPackageById(id));
    }

    // 3. Thêm gói tập mới (Chỉ Manager)
    @PreAuthorize("hasRole('MANAGER')")
    @PostMapping
    public ResponseEntity<MembershipPackageResponse> createPackage(@Valid @RequestBody MembershipPackageRequest request) {
        return ResponseEntity.ok(packageService.createPackage(request));
    }

    // 4. Sửa thông tin gói tập (Chỉ Manager)
    @PreAuthorize("hasRole('MANAGER')")
    @PutMapping("/{id}")
    public ResponseEntity<MembershipPackageResponse> updatePackage(
            @PathVariable Long id,
            @Valid @RequestBody MembershipPackageRequest request) {
        return ResponseEntity.ok(packageService.updatePackage(id, request));
    }

    // 5. Vô hiệu hóa gói tập (Soft delete - Chỉ Manager)
    @PreAuthorize("hasRole('MANAGER')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deletePackage(@PathVariable Long id) {
        packageService.deletePackage(id);
        return ResponseEntity.ok(Map.of("message", "Đã vô hiệu hóa gói tập thành công"));
    }
}
