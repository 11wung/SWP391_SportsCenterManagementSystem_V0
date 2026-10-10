package com.example.backend.repository;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.backend.entity.ClassRegistration;

@Repository
public interface ClassRegistrationRepository extends JpaRepository<ClassRegistration, Long> {

    // Kiểm tra học viên đã có bản ghi đăng ký lớp này chưa
    boolean existsBySportClass_IdAndUser_Id(Long classId, Long userId);

    // Đếm số học viên đăng ký theo lớp và trạng thái
    long countBySportClass_IdAndStatus(Long classId, String status);

    // Lấy danh sách booking của học viên, mới nhất trước
    List<ClassRegistration> findByUser_IdOrderByRegisteredAtDesc(Long userId);

    // Tìm booking thuộc về đúng học viên
    Optional<ClassRegistration> findByIdAndUser_Id(Long id, Long userId);

    // Đếm booking của học viên theo trạng thái và khoảng thời gian
    long countByUser_IdAndStatusAndRegisteredAtBetween(
            Long userId, String status,
            OffsetDateTime start, OffsetDateTime end);
}
