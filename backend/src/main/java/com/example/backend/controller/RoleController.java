package com.example.backend.controller;

import com.example.backend.dto.RoleDto;
import com.example.backend.repository.RoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/roles")
@RequiredArgsConstructor
public class RoleController {

    private final RoleRepository roleRepository;

    @PreAuthorize("hasRole('MANAGER')")
    @GetMapping
    public ResponseEntity<List<RoleDto>> getAllRoles() {
        List<RoleDto> roles = roleRepository.findAll().stream().map(role -> {
            RoleDto dto = new RoleDto();
            dto.setId(role.getId());
            dto.setCode(role.getCode());
            dto.setName(role.getName());
            dto.setDescription(role.getDescription());
            return dto;
        }).collect(Collectors.toList());
        return ResponseEntity.ok(roles);
    }
}
