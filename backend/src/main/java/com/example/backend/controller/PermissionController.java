package com.example.backend.controller;

import com.example.backend.dto.PermissionDto;
import com.example.backend.repository.PermissionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/permissions")
@RequiredArgsConstructor
public class PermissionController {

    private final PermissionRepository permissionRepository;

    @PreAuthorize("hasRole('MANAGER')")
    @GetMapping
    public ResponseEntity<List<PermissionDto>> getAllPermissions() {
        List<PermissionDto> permissions = permissionRepository.findAll().stream().map(perm -> {
            PermissionDto dto = new PermissionDto();
            dto.setId(perm.getId());
            dto.setCode(perm.getCode());
            dto.setName(perm.getName());
            dto.setDescription(perm.getDescription());
            return dto;
        }).collect(Collectors.toList());
        return ResponseEntity.ok(permissions);
    }
}
