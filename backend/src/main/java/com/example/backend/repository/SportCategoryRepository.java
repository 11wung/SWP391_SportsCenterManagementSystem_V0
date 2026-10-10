package com.example.backend.repository;

import com.example.backend.entity.SportCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SportCategoryRepository extends JpaRepository<SportCategory, Long> {
    Optional<SportCategory> findByName(String name);

    boolean existsByName(String name);
}