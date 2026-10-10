package com.example.backend.dto;

import lombok.Builder;
import lombok.Data;

import java.time.OffsetDateTime;
import java.util.List;

@Data
@Builder
public class SportClassResponse {
    private Long id;
    private Long categoryId;
    private String categoryName;
    private Long coachId;
    private String coachName;
    private String name;
    private String description;
    private String level;
    private Integer maxCapacity;
    private Long currentEnrollment; // Số học viên đã đăng ký hiện tại
    private Integer availableSlots; // Số chỗ còn trống
    private String status;
    private List<ClassScheduleResponse> schedules;
    private OffsetDateTime createdAt;
}