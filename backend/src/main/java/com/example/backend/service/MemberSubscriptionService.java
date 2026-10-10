package com.example.backend.service;

import com.example.backend.dto.MemberSubscriptionRequest;
import com.example.backend.dto.MemberSubscriptionResponse;
import com.example.backend.entity.MemberSubscription;
import com.example.backend.entity.MembershipPackage;
import com.example.backend.entity.User;
import com.example.backend.exception.BusinessRuleException;
import com.example.backend.repository.MemberSubscriptionRepository;
import com.example.backend.repository.MembershipPackageRepository;
import com.example.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MemberSubscriptionService {

    private final MemberSubscriptionRepository subscriptionRepository;
    private final MembershipPackageRepository packageRepository;
    private final UserRepository userRepository;

    public List<MemberSubscriptionResponse> getAllSubscriptions() {
        return subscriptionRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public List<MemberSubscriptionResponse> getSubscriptionsByUserId(Long userId) {
        return subscriptionRepository.findByUserIdOrderByCreatedAtDesc(userId).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public List<MemberSubscriptionResponse> getActiveSubscriptionsByUserId(Long userId) {
        return subscriptionRepository.findActiveSubscriptionsByUserId(userId).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    public MemberSubscriptionResponse createSubscription(MemberSubscriptionRequest request, String createdByEmail) {
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new BusinessRuleException("Không tìm thấy hội viên", HttpStatus.NOT_FOUND));
        
        MembershipPackage pkg = packageRepository.findById(request.getPackageId())
                .orElseThrow(() -> new BusinessRuleException("Không tìm thấy gói tập", HttpStatus.NOT_FOUND));

        if (!pkg.getIsActive()) {
            throw new BusinessRuleException("Gói tập này hiện không còn hoạt động", HttpStatus.BAD_REQUEST);
        }

        User creator = null;
        if (createdByEmail != null) {
            creator = userRepository.findByEmail(createdByEmail).orElse(null);
        }

        // Logic gia hạn cộng dồn ngày nếu đang có gói ACTIVE tương tự
        List<MemberSubscription> activeSubs = subscriptionRepository.findActiveSubscriptionsByUserId(user.getId());
        LocalDate newStartDate = LocalDate.now();
        for (MemberSubscription sub : activeSubs) {
            if (sub.getMembershipPackage().getId().equals(pkg.getId())) {
                newStartDate = sub.getEndDate();
                break;
            }
        }

        MemberSubscription sub = new MemberSubscription();
        sub.setUser(user);
        sub.setMembershipPackage(pkg);
        sub.setPackageNameSnapshot(pkg.getName());
        sub.setMaxClassesPerWeekSnapshot(pkg.getMaxClassesPerWeek());
        sub.setTotalAmount(pkg.getPrice());
        sub.setStartDate(newStartDate);
        sub.setEndDate(newStartDate.plusMonths(pkg.getDurationMonths()));
        sub.setStatus("PENDING"); // Chỉ ACTIVE khi thanh toán thành công
        sub.setCreatedBy(creator);

        return mapToResponse(subscriptionRepository.save(sub));
    }

    private MemberSubscriptionResponse mapToResponse(MemberSubscription sub) {
        return MemberSubscriptionResponse.builder()
                .id(sub.getId())
                .userId(sub.getUser().getId())
                .userFullName(sub.getUser().getFullName())
                .packageId(sub.getMembershipPackage().getId())
                .packageNameSnapshot(sub.getPackageNameSnapshot())
                .maxClassesPerWeekSnapshot(sub.getMaxClassesPerWeekSnapshot())
                .totalAmount(sub.getTotalAmount())
                .startDate(sub.getStartDate())
                .endDate(sub.getEndDate())
                .status(sub.getStatus())
                .createdBy(sub.getCreatedBy() != null ? sub.getCreatedBy().getFullName() : "Tự đăng ký")
                .createdAt(sub.getCreatedAt())
                .build();
    }
}
