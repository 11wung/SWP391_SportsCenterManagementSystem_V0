package com.example.backend.repository;

import com.example.backend.entity.ClassSchedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClassScheduleRepository extends JpaRepository<ClassSchedule, Long> {
    List<ClassSchedule> findBySportClassId(Long sportClassId);

    List<ClassSchedule> findByRoomIdAndDayOfWeek(Long roomId, Short dayOfWeek);
}