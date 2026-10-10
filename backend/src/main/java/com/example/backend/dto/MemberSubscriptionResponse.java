package com.example.backend.dto;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.OffsetDateTime;

@Data
@Builder
public class MemberSubscriptionResponse {
    private Long id;
    private Long userId;
    private String userFullName;
    private Long packageId;
    private String packageNameSnapshot;
    private Short maxClassesPerWeekSnapshot;
    private BigDecimal totalAmount;
    private LocalDate startDate;
    private LocalDate endDate;
    private String status;
    private String createdBy;
    private OffsetDateTime createdAt;
}
