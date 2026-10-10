
package com.example.backend.service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.time.temporal.TemporalAdjusters;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.backend.dto.ClassRegistrationResponse;
import com.example.backend.entity.ClassRegistration;
import com.example.backend.entity.MemberSubscription;
import com.example.backend.entity.SportClass;
import com.example.backend.entity.User;
import com.example.backend.repository.ClassRegistrationRepository;
import com.example.backend.repository.MemberSubscriptionRepository;
import com.example.backend.repository.SportClassRepository;
import com.example.backend.repository.UserRepository;

@Service
public class ClassRegistrationService {

    private final UserRepository userRepository;
    private final SportClassRepository sportClassRepository;
    private final ClassRegistrationRepository classRegistrationRepository;
    private final MemberSubscriptionRepository memberSubscriptionRepository;

    public ClassRegistrationService(
            UserRepository userRepository,
            SportClassRepository sportClassRepository,
            ClassRegistrationRepository classRegistrationRepository,
            MemberSubscriptionRepository memberSubscriptionRepository) {

        this.userRepository = userRepository;
        this.sportClassRepository = sportClassRepository;
        this.classRegistrationRepository = classRegistrationRepository;
        this.memberSubscriptionRepository = memberSubscriptionRepository;
    }

    // Lấy danh sách booking của hội viên đang đăng nhập
@Transactional(readOnly = true)
public List<ClassRegistrationResponse> getMyBookings(String email) {
    User user = findUserByEmail(email);
        List<ClassRegistration> bookings = classRegistrationRepository.findByUser_IdOrderByRegisteredAtDesc(user.getId());
        List<ClassRegistrationResponse> responses = new ArrayList<>();
                for (ClassRegistration booking : bookings) responses.add(toResponse(booking));
                        return responses;
}

    // Đăng ký một lớp học
@Transactional
public ClassRegistrationResponse registerClass(Long classId, String email) {

        User user = findUserByEmail(email);

        SportClass sportClass = sportClassRepository.findById(classId).orElseThrow(() -> new RuntimeException("Không tìm thấy lớp học."));

        // BR-BKG-01: Kiểm tra gói hội viên còn hiệu lực
        MemberSubscription subscription =
                findActiveSubscription(user.getId());

        // Kiểm tra lớp có đang hoạt động không
        if (!"ACTIVE".equalsIgnoreCase(sportClass.getStatus())) {
            throw new RuntimeException("Lớp học hiện không hoạt động.");
        }

        // BR-BKG-04: Kiểm tra đăng ký trùng
        // Bao gồm cả bản ghi đã hủy do database có UNIQUE(class_id, user_id)
        boolean alreadyRegistered =classRegistrationRepository.existsBySportClass_IdAndUser_Id(classId, user.getId());

        if (alreadyRegistered) {
            throw new RuntimeException(
                    "Bạn đã có bản ghi đăng ký lớp học này.");
        }

        long registeredCount =classRegistrationRepository.countBySportClass_IdAndStatus(classId, "REGISTERED");

        if (registeredCount >= sportClass.getMaxCapacity()) {
            throw new RuntimeException("Lớp học đã đủ số lượng.");
        }

        LocalDate today = LocalDate.now();

        OffsetDateTime now = OffsetDateTime.now();

        LocalDate monday = today.with(TemporalAdjusters.previousOrSame(DayOfWeek.MONDAY));

        LocalDate nextMonday = monday.plusWeeks(1);

        OffsetDateTime weekStart =monday.atStartOfDay().atOffset(now.getOffset());

        OffsetDateTime weekEnd =nextMonday.atStartOfDay().atOffset(now.getOffset()).minusNanos(1);

        long weeklyBookings =classRegistrationRepository.countByUser_IdAndStatusAndRegisteredAtBetween(
                                user.getId(),
                                "REGISTERED",
                                weekStart,
                                weekEnd);

        Short weeklyLimit =
                subscription.getMaxClassesPerWeekSnapshot();

        if (weeklyLimit == null || weeklyLimit <= 0) {
            throw new RuntimeException(
                    "Gói hội viên chưa có giới hạn lớp hợp lệ.");
        }

        if (weeklyBookings >= weeklyLimit) {
            throw new RuntimeException(
                    "Bạn đã đạt giới hạn đăng ký lớp trong tuần.");
        }

        // Tạo booking mới
        ClassRegistration registration = new ClassRegistration();

        registration.setSportClass(sportClass);
        registration.setUser(user);
        registration.setStatus("REGISTERED");
        registration.setIsPenalized(false);

        return toResponse(classRegistrationRepository.save(registration));    }

    // Hủy booking của chính hội viên đang đăng nhập
    @Transactional
    public void cancelBooking(Long registrationId, String email) {

        User user = findUserByEmail(email);

        ClassRegistration registration =classRegistrationRepository.findByIdAndUser_Id
                        (registrationId, user.getId())
                        .orElseThrow(() ->
                        new RuntimeException(
                                "Không tìm thấy booking của bạn."));

        if (!"REGISTERED".equalsIgnoreCase(registration.getStatus())) {
            throw new RuntimeException(
                    "Booking này không còn ở trạng thái có thể hủy.");
        }

        registration.setStatus("CANCELED");
        registration.setCanceledAt(OffsetDateTime.now());

        classRegistrationRepository.save(registration);
    }

    // Tìm người dùng theo email lấy từ JWT
    private User findUserByEmail(String email) {

        return userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Không tìm thấy người dùng đang đăng nhập."));
    }

    // Tìm gói ACTIVE còn hạn
    private MemberSubscription findActiveSubscription(Long userId) {

        LocalDate today = LocalDate.now();

        List<MemberSubscription> subscriptions =
                memberSubscriptionRepository.findByUserId(userId);

        return subscriptions.stream()
                .filter(subscription ->
                        "ACTIVE".equalsIgnoreCase(subscription.getStatus()))
                .filter(subscription ->
                        subscription.getStartDate() != null
                        && !subscription.getStartDate().isAfter(today))
                .filter(subscription ->
                        subscription.getEndDate() != null
                        && !subscription.getEndDate().isBefore(today))
                .max(Comparator.comparing(
                        MemberSubscription::getEndDate))
                .orElseThrow(() ->
                        new RuntimeException(
                                "Bạn chưa có gói hội viên ACTIVE còn hiệu lực."));
    }
    private ClassRegistrationResponse toResponse(ClassRegistration registration) {
    return new ClassRegistrationResponse(
            registration.getId(),
            registration.getSportClass().getId(),
            registration.getSportClass().getName(),
            registration.getRegisteredAt(),
            registration.getStatus(),
            registration.getCanceledAt(),
            registration.getIsPenalized()
    );
}
}
