package com.example.backend.dto;

import lombok.Builder;
import lombok.Data;

import java.time.OffsetDateTime;

@Data
@Builder
public class ClassBookingResponse {
    private Long registrationId;
    private Long classId;
    private String className;
    private String categoryName;
    private String coachName;
    private Long userId;
    private String memberName;
    private String memberPhone;
    private OffsetDateTime registeredAt;
    private String status; // REGISTERED | WAITLISTED | CANCELED
    private OffsetDateTime canceledAt;
    private Boolean isPenalized;
    private String registeredBy; // "Tự đặt qua App" hoặc tên Lễ tân
}