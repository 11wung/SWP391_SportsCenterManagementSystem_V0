package com.example.backend.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class UpdateUserRequest {
    private String fullName;
    private String phone;
    private String roleCode;
    private String avatarUrl;
    private String gender;
    private LocalDate dateOfBirth;
}
