package com.example.backend.dto;

import java.time.OffsetDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ClassRegistrationResponse {
    private Long id;
    private Long classId;
    private String className;
    private OffsetDateTime registeredAt;
    private String status;
    private OffsetDateTime canceledAt;
    private Boolean isPenalized;
}
