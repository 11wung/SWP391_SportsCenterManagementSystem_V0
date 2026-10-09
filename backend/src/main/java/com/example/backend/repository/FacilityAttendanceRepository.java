package com.example.backend.repository;

import com.example.backend.entity.FacilityAttendance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.OffsetDateTime;
import java.util.List;

@Repository
public interface FacilityAttendanceRepository extends JpaRepository<FacilityAttendance, Long> {
    List<FacilityAttendance> findByUserIdOrderByCheckInTimeDesc(Long userId);
    List<FacilityAttendance> findByCheckInTimeAfterOrderByCheckInTimeDesc(OffsetDateTime time);
}
