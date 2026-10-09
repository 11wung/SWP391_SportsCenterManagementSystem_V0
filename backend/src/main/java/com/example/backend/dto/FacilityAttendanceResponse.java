package com.example.backend.dto;

import lombok.Builder;
import lombok.Data;

import java.time.OffsetDateTime;

@Data
@Builder
public class FacilityAttendanceResponse {
    private Long id;
    private Long userId;
    private String userFullName;
    private OffsetDateTime checkInTime;
    private OffsetDateTime checkOutTime;
    private String recordedBy;
    private String notes;
}
