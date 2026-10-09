package com.example.backend.repository;

import com.example.backend.entity.MembershipPackage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MembershipPackageRepository extends JpaRepository<MembershipPackage, Long> {
    boolean existsByCode(String code);
    boolean existsByName(String name);
    Optional<MembershipPackage> findByCode(String code);
}
