package com.example.backend.repository;

import com.example.backend.entity.MemberSubscription;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MemberSubscriptionRepository extends JpaRepository<MemberSubscription, Long> {
    List<MemberSubscription> findByUserId(Long userId);

    List<MemberSubscription> findByUserIdOrderByCreatedAtDesc(Long userId);

    List<MemberSubscription> findByUserIdAndStatus(Long userId, String status); // hàm này để kiểm tra gói tập ACTIVE
                                                                                // của MEMBER
}
