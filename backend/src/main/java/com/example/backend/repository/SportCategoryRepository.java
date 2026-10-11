package com.example.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.entity.SportCategory;

public interface SportCategoryRepository extends JpaRepository<SportCategory, Long> {
    boolean existsByNameIgnoreCase(String name);
}
