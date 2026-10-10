package com.example.backend.repository;

import com.example.backend.entity.SportClass;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SportClassRepository extends JpaRepository<SportClass, Long> {
    List<SportClass> findByStatus(String status);

    List<SportClass> findByCoachId(Long coachId);

    List<SportClass> findByCategoryId(Long categoryId);
}