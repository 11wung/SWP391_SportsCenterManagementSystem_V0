package com.example.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class MembershipPackageRequest {
    @NotBlank(message = "Mã gói tập không được để trống")
    private String code;

    @NotBlank(message = "Tên gói tập không được để trống")
    private String name;

    private String description;

    @NotNull(message = "Số tháng không được để trống")
    @Positive(message = "Số tháng phải lớn hơn 0")
    private Short durationMonths;

    @NotNull(message = "Giá tiền không được để trống")
    @Positive(message = "Giá tiền phải lớn hơn 0")
    private BigDecimal price;

    @NotNull(message = "Số buổi học/tuần không được để trống")
    @Positive(message = "Số buổi học/tuần phải lớn hơn 0")
    private Short maxClassesPerWeek;

    private Boolean isActive = true;
}
