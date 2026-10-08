package com.example.backend.repository;

import com.example.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {

    boolean existsByEmail(String email);

    boolean existsByPhone(String phone);

    java.util.Optional<User> findByEmail(String email);

    // Khoa : thêm "kiểm tra SĐT đã có người khác dùng chưa (khi chỉnh sửa profile)"
    boolean existsByPhoneAndIdNot(String phone, Long id);

    // Khoa: lấy user theo mã role
    List<User> findByRoleCode(String roleCode);
}