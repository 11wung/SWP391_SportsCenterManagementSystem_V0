package com.example.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import lombok.Data;

@Data
public class ClassRegistrationRequest {

    @NotBlank(message = "ID lớp học không được để trống")
    @Positive(message = "ID lớp học phải lớn hơn 0")
    private Long classId;
}
