package com.example.backend.dto;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.OffsetDateTime;

@Data
@Builder
public class MembershipPackageResponse {
    private Long id;
    private String code;
    private String name;
    private String description;
    private Short durationMonths;
    private BigDecimal price;
    private Short maxClassesPerWeek;
    private Boolean isActive;
    private OffsetDateTime createdAt;
}
