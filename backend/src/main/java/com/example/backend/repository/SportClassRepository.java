package com.example.backend.repository;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.entity.SportClass;
public interface SportClassRepository extends JpaRepository<SportClass, Long> {

}
