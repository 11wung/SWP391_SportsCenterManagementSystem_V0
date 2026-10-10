package com.example.backend.job;

import com.example.backend.repository.MemberSubscriptionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@RequiredArgsConstructor
public class SubscriptionExpiryJob {

    private final MemberSubscriptionRepository subscriptionRepository;

    @Scheduled(cron = "0 1 0 * * ?") // Chạy vào lúc 00:01 mỗi ngày
    @Transactional
    public void expireSubscriptions() {
        int updatedCount = subscriptionRepository.updateExpiredSubscriptions();
        if (updatedCount > 0) {
            System.out.println("[JOB] Đã cập nhật trạng thái EXPIRED cho " + updatedCount + " gói tập.");
        }
    }
}
