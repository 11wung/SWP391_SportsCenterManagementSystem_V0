package com.example.backend.dto;

import lombok.Data;

@Data
public class RoleDto {
    private Long id;
    private String code;
    private String name;
    private String description;
}
