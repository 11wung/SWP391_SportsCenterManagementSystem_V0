package com.example.backend.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class SportClassRequest {
    @NotNull(message = "Vui lòng chọn bộ môn")
    private Long categoryId;

    @NotNull(message = "Vui lòng phân công huấn luyện viên")
    private Long coachId;

    @NotBlank(message = "Tên lớp học không được để trống")
    private String name;

    private String description;

    @NotBlank(message = "Vui lòng chọn cấp độ (BEGINNER, INTERMEDIATE, ADVANCED)")
    private String level;

    @NotNull(message = "Vui lòng nhập sĩ số tối đa")
    @Min(value = 1, message = "Sĩ số lớp phải ít nhất 1 học viên")
    private Integer maxCapacity;

    private String status; // ACTIVE | INACTIVE
}