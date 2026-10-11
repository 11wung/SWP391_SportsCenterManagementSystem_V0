
package com.example.backend.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.dto.SportClassRequest;
import com.example.backend.dto.SportClassResponse;
import com.example.backend.entity.SportClass;
import com.example.backend.service.SportClassService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/sport-classes")
@RequiredArgsConstructor
public class SportClassController {

    private final SportClassService sportClassService;

    // Xem tất cả lớp học
    @GetMapping
    public ResponseEntity<List<SportClassResponse>> getAllClasses() {
        List<SportClass> classes = sportClassService.getAllClasses();
        List<SportClassResponse> responses = new ArrayList<>();

        for (SportClass sportClass : classes) {
            responses.add(new SportClassResponse(sportClass));
        }

        return ResponseEntity.ok(responses);
    }

    @GetMapping("/{id}")
    public ResponseEntity<SportClassResponse> getClassById(@PathVariable Long id) {
        return ResponseEntity.ok(
                new SportClassResponse(sportClassService.getClassById(id)));
    }

    @GetMapping("/category/{categoryId}")
    public ResponseEntity<List<SportClassResponse>> getClassesByCategory(
            @PathVariable Long categoryId) {
        List<SportClass> classes =
                sportClassService.getClassesByCategory(categoryId);
        List<SportClassResponse> responses = new ArrayList<>();

        for (SportClass sportClass : classes) {
            responses.add(new SportClassResponse(sportClass));
        }

        return ResponseEntity.ok(responses);
    }

    @PreAuthorize("hasRole('MANAGER')")
    @PostMapping
    public ResponseEntity<SportClassResponse> createClass(
            @Valid @RequestBody SportClassRequest request) {
        SportClass sportClass = sportClassService.createClass(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new SportClassResponse(sportClass));
    }

    @PreAuthorize("hasRole('MANAGER')")
    @PutMapping("/{id}")
    public ResponseEntity<SportClassResponse> updateClass(
            @PathVariable Long id,
            @Valid @RequestBody SportClassRequest request) {
        SportClass sportClass = sportClassService.updateClass(id, request);
        return ResponseEntity.ok(new SportClassResponse(sportClass));
    }

    @PreAuthorize("hasRole('MANAGER')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteClass(@PathVariable Long id) {
        sportClassService.deleteClass(id);
        return ResponseEntity.noContent().build();
    }
}
