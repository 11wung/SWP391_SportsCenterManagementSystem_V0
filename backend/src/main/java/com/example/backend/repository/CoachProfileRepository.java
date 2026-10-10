package com.example.backend.repository;

import com.example.backend.entity.CoachProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CoachProfileRepository extends JpaRepository<CoachProfile, Long> {
}
