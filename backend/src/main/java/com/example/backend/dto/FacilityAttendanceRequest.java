package com.example.backend.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class FacilityAttendanceRequest {
    @NotNull(message = "ID hội viên không được để trống")
    private Long userId;

    private String notes;
}
