package com.example.backend.dto;

import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class UpdateProfileRequest {
    private String fullName;
    private String phone;
    private String avatarUrl;
    private String gender;
    private LocalDate dateOfBirth;

    // Member profile specific fields
    private BigDecimal heightCm;
    private BigDecimal weightKg;
    private String fitnessGoal;
}
