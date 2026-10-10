package com.example.backend.repository;

import com.example.backend.entity.FacilityRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FacilityRoomRepository extends JpaRepository<FacilityRoom, Long> {
    List<FacilityRoom> findByMaintenanceStatus(String maintenanceStatus);

    boolean existsByRoomName(String roomName);
}