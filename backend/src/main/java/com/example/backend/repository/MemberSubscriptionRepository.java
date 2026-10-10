package com.example.backend.repository;

import com.example.backend.entity.MemberSubscription;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.Modifying;

@Repository
public interface MemberSubscriptionRepository extends JpaRepository<MemberSubscription, Long> {
    List<MemberSubscription> findByUserId(Long userId);
    List<MemberSubscription> findByUserIdOrderByCreatedAtDesc(Long userId);

    @Query("SELECT s FROM MemberSubscription s WHERE s.user.id = :userId AND s.status = 'ACTIVE' AND s.endDate >= CURRENT_DATE")
    List<MemberSubscription> findActiveSubscriptionsByUserId(@Param("userId") Long userId);

    @Modifying
    @Query("UPDATE MemberSubscription s SET s.status = 'EXPIRED' WHERE s.status = 'ACTIVE' AND s.endDate < CURRENT_DATE")
    int updateExpiredSubscriptions();
}
