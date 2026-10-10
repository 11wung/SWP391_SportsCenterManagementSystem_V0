package com.example.backend.dto;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.OffsetDateTime;

@Data
@Builder
public class UserResponse {
    private Long id;
    private String fullName;
    private String email;
    private String phone;
    private String role;
    private String avatarUrl;
    private String gender;
    private LocalDate dateOfBirth;
    private Boolean isActive;
    private OffsetDateTime createdAt;

    // Member profile specific fields
    private LocalDate joinDate;
    private BigDecimal heightCm;
    private BigDecimal weightKg;
    private String fitnessGoal;
    private String membershipTier;

    // Coach profile specific fields
    private Short yearsExperience;
    private String certifications;
}
