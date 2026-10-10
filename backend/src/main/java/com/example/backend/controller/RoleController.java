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
    private final com.example.backend.repository.PermissionRepository permissionRepository;
    private final com.example.backend.repository.RolePermissionRepository rolePermissionRepository;

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

    @PreAuthorize("hasRole('MANAGER')")
    @org.springframework.web.bind.annotation.PostMapping("/{roleId}/permissions/{permissionId}")
    public ResponseEntity<String> assignPermissionToRole(@org.springframework.web.bind.annotation.PathVariable Long roleId, @org.springframework.web.bind.annotation.PathVariable Long permissionId) {
        com.example.backend.entity.Role role = roleRepository.findById(roleId).orElseThrow();
        com.example.backend.entity.Permission permission = permissionRepository.findById(permissionId).orElseThrow();
        
        com.example.backend.entity.RolePermissionId rpId = new com.example.backend.entity.RolePermissionId(role.getId(), permission.getId());
        if (!rolePermissionRepository.existsById(rpId)) {
            com.example.backend.entity.RolePermission rp = new com.example.backend.entity.RolePermission(role, permission);
            rolePermissionRepository.save(rp);
        }
        return ResponseEntity.ok("Assigned permission successfully");
    }

    @PreAuthorize("hasRole('MANAGER')")
    @org.springframework.web.bind.annotation.DeleteMapping("/{roleId}/permissions/{permissionId}")
    public ResponseEntity<String> removePermissionFromRole(@org.springframework.web.bind.annotation.PathVariable Long roleId, @org.springframework.web.bind.annotation.PathVariable Long permissionId) {
        com.example.backend.entity.RolePermissionId rpId = new com.example.backend.entity.RolePermissionId(roleId, permissionId);
        if (rolePermissionRepository.existsById(rpId)) {
            rolePermissionRepository.deleteById(rpId);
        }
        return ResponseEntity.ok("Removed permission successfully");
    }
}
