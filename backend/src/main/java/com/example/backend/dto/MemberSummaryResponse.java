package com.example.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MemberSummaryResponse {
    private Long id;
    private String fullName;
    private String email;
    private String phone;
    private Boolean isActive;
    private LocalDate joinDate;
    private String membershipTier;
}