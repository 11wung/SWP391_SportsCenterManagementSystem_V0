package com.example.backend.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class MemberSubscriptionRequest {
    @NotNull(message = "ID người dùng không được để trống")
    private Long userId;

    @NotNull(message = "ID gói tập không được để trống")
    private Long packageId;
}
