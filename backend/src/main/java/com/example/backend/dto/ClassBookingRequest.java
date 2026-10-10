package com.example.backend.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ClassBookingRequest {
    @NotNull(message = "Vui lòng chọn lớp học cần đặt lịch")
    private Long classId;

    // Nullable: Nếu Member tự đặt trên app thì không cần truyền (hệ thống tự lấy từ
    // JWT).
    // Nếu Lễ tân / Manager đặt hộ tại quầy thì truyền userId của khách vào đây.
    private Long userId;
}