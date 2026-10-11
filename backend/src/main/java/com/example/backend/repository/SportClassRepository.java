
package com.example.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.entity.SportClass;

public interface SportClassRepository extends JpaRepository<SportClass, Long> {

    List<SportClass> findAllByOrderByIdDesc();

    List<SportClass> findByCategory_IdOrderByIdDesc(Long categoryId);

    boolean existsByCategory_Id(Long categoryId);
}
