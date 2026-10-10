package com.example.backend.repository;

import com.example.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

    boolean existsByEmail(String email);

    boolean existsByPhone(String phone);

    java.util.Optional<User> findByEmail(String email);

    @org.springframework.data.jpa.repository.Query("SELECT u FROM User u WHERE " +
           "(:role IS NULL OR u.role.code = :role) AND " +
           "(:search IS NULL OR LOWER(u.fullName) LIKE LOWER(CONCAT('%', :search, '%')) OR u.phone LIKE CONCAT('%', :search, '%') OR LOWER(u.email) LIKE LOWER(CONCAT('%', :search, '%')))")
    java.util.List<User> searchUsers(@org.springframework.data.repository.query.Param("search") String search, @org.springframework.data.repository.query.Param("role") String role);
}