package com.example.backend.repository;

import com.example.backend.entity.ClassRegistration;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ClassRegistrationRepository extends JpaRepository<ClassRegistration, Long> {
    // Tìm đăng ký của 1 hội viên trong 1 lớp
    Optional<ClassRegistration> findBySportClassIdAndUserId(Long sportClassId, Long userId);

    // Kiểm tra xem hội viên đã đăng ký lớp này chưa
    boolean existsBySportClassIdAndUserIdAndStatus(Long sportClassId, Long userId, String status);

    // Đếm số lượng học viên đã đăng ký vào lớp (để kiểm tra quá sĩ số maxCapacity)
    long countBySportClassIdAndStatus(Long sportClassId, String status);

    // Lấy danh sách các lớp mà hội viên đã đăng ký
    List<ClassRegistration> findByUserIdOrderByRegisteredAtDesc(Long userId);

    // Lấy danh sách học viên trong 1 lớp (cho Coach xem)
    List<ClassRegistration> findBySportClassIdAndStatus(Long sportClassId, String status);

    // Tìm người trong hàng chờ nộp đơn sớm nhất để đôn lên khi có người hủy
    Optional<ClassRegistration> findFirstBySportClassIdAndStatusOrderByRegisteredAtAsc(Long sportClassId,
            String status);
}