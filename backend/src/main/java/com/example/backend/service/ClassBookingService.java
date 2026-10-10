package com.example.backend.service;

import com.example.backend.dto.ClassBookingRequest;
import com.example.backend.dto.ClassBookingResponse;
import com.example.backend.entity.ClassRegistration;
import com.example.backend.entity.MemberSubscription;
import com.example.backend.entity.SportClass;
import com.example.backend.entity.User;
import com.example.backend.exception.BusinessRuleException;
import com.example.backend.repository.ClassRegistrationRepository;
import com.example.backend.repository.MemberSubscriptionRepository;
import com.example.backend.repository.SportClassRepository;
import com.example.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ClassBookingService {

    private final ClassRegistrationRepository registrationRepository;
    private final SportClassRepository sportClassRepository;
    private final UserRepository userRepository;
    private final MemberSubscriptionRepository subscriptionRepository;

    // 1. ĐẶT LỊCH LỚP HỌC (BOOK CLASS)
    @Transactional
    public ClassBookingResponse bookClass(String currentUserEmail, ClassBookingRequest request) {
        User currentUser = userRepository.findByEmail(currentUserEmail)
                .orElseThrow(
                        () -> new BusinessRuleException("Không tìm thấy người dùng hiện tại", HttpStatus.NOT_FOUND));

        // Xác định đối tượng học viên được đăng ký
        User targetUser;
        User receptionist = null;
        if (request.getUserId() != null) {
            // Lễ tân hoặc Manager đặt hộ
            targetUser = userRepository.findById(request.getUserId())
                    .orElseThrow(() -> new BusinessRuleException("Không tìm thấy học viên cần đăng ký",
                            HttpStatus.NOT_FOUND));
            receptionist = currentUser;
        } else {
            // Học viên tự đặt
            targetUser = currentUser;
        }

        // BR-BKG-01: Kiểm tra gói tập ACTIVE và còn hạn của học viên
        List<MemberSubscription> activeSubs = subscriptionRepository.findByUserIdAndStatus(targetUser.getId(),
                "ACTIVE");
        LocalDate today = LocalDate.now();
        boolean hasValidSub = activeSubs.stream()
                .anyMatch(sub -> sub.getEndDate() == null || !sub.getEndDate().isBefore(today));

        if (!hasValidSub) {
            throw new BusinessRuleException(
                    "Hội viên chưa có gói tập đang hoạt động hoặc gói tập đã hết hạn. Vui lòng đăng ký/gia hạn gói tập!");
        }

        // Tìm lớp học
        SportClass sportClass = sportClassRepository.findById(request.getClassId())
                .orElseThrow(() -> new BusinessRuleException("Không tìm thấy lớp học", HttpStatus.NOT_FOUND));

        if (!"ACTIVE".equalsIgnoreCase(sportClass.getStatus())) {
            throw new BusinessRuleException("Lớp học này hiện không mở tiếp nhận học viên");
        }

        // BR-BKG-03: Kiểm tra đăng ký trùng lặp
        Optional<ClassRegistration> existingOpt = registrationRepository.findBySportClassIdAndUserId(sportClass.getId(),
                targetUser.getId());
        ClassRegistration registration;

        if (existingOpt.isPresent()) {
            registration = existingOpt.get();
            if ("REGISTERED".equalsIgnoreCase(registration.getStatus())) {
                throw new BusinessRuleException("Hội viên đã đăng ký lớp học này rồi!");
            }
            if ("WAITLISTED".equalsIgnoreCase(registration.getStatus())) {
                throw new BusinessRuleException("Hội viên đang nằm trong danh sách chờ của lớp học này!");
            }
            // Nếu trước đó đã CANCELED thì kích hoạt lại bản ghi cũ
            registration.setCanceledAt(null);
            registration.setIsPenalized(false);
            registration.setRegisteredAt(OffsetDateTime.now());
            registration.setRegisteredBy(receptionist);
        } else {
            registration = new ClassRegistration();
            registration.setSportClass(sportClass);
            registration.setUser(targetUser);
            registration.setRegisteredAt(OffsetDateTime.now());
            registration.setRegisteredBy(receptionist);
            registration.setIsPenalized(false);
        }

        // BR-BKG-02: Kiểm tra sĩ số lớp & Hàng chờ
        long currentEnrolled = registrationRepository.countBySportClassIdAndStatus(sportClass.getId(), "REGISTERED");
        if (currentEnrolled < sportClass.getMaxCapacity()) {
            registration.setStatus("REGISTERED");
        } else {
            registration.setStatus("WAITLISTED");
        }

        ClassRegistration saved = registrationRepository.save(registration);
        return mapToResponse(saved);
    }

    // 2. HỦY ĐẶT LỊCH LỚP HỌC (CANCEL BOOKING)
    @Transactional
    public ClassBookingResponse cancelBooking(Long registrationId, String currentUserEmail) {
        ClassRegistration registration = registrationRepository.findById(registrationId)
                .orElseThrow(
                        () -> new BusinessRuleException("Không tìm thấy thông tin đăng ký lớp", HttpStatus.NOT_FOUND));

        User currentUser = userRepository.findByEmail(currentUserEmail)
                .orElseThrow(() -> new BusinessRuleException("Không tìm thấy người dùng", HttpStatus.NOT_FOUND));

        // Kiểm tra quyền hủy: chỉ người đặt hoặc Lễ tân/Manager mới được hủy
        boolean isOwner = registration.getUser().getId().equals(currentUser.getId());
        boolean isStaff = currentUser.getRole() != null &&
                ("MANAGER".equalsIgnoreCase(currentUser.getRole().getCode())
                        || "RECEPTIONIST".equalsIgnoreCase(currentUser.getRole().getCode()));

        if (!isOwner && !isStaff) {
            throw new BusinessRuleException("Bạn không có quyền hủy lịch đăng ký của người khác", HttpStatus.FORBIDDEN);
        }

        if ("CANCELED".equalsIgnoreCase(registration.getStatus())) {
            throw new BusinessRuleException("Đăng ký này đã được hủy trước đó rồi");
        }

        boolean wasRegistered = "REGISTERED".equalsIgnoreCase(registration.getStatus());
        registration.setStatus("CANCELED");
        registration.setCanceledAt(OffsetDateTime.now());
        registrationRepository.save(registration);

        // Tự động đôn người trong hàng chờ (WAITLISTED) lên REGISTERED nếu vị trí trống
        if (wasRegistered) {
            Optional<ClassRegistration> waitlistedOpt = registrationRepository
                    .findFirstBySportClassIdAndStatusOrderByRegisteredAtAsc(registration.getSportClass().getId(),
                            "WAITLISTED");

            if (waitlistedOpt.isPresent()) {
                ClassRegistration luckyStudent = waitlistedOpt.get();
                luckyStudent.setStatus("REGISTERED");
                registrationRepository.save(luckyStudent);
            }
        }

        return mapToResponse(registration);
    }

    // 3. LẤY LỊCH HỌC CỦA CHÍNH MÌNH (HỘI VIÊN XEM)
    public List<ClassBookingResponse> getMyBookings(String currentUserEmail) {
        User currentUser = userRepository.findByEmail(currentUserEmail)
                .orElseThrow(() -> new BusinessRuleException("Không tìm thấy người dùng", HttpStatus.NOT_FOUND));

        return registrationRepository.findByUserIdOrderByRegisteredAtDesc(currentUser.getId()).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    // 4. LẤY DANH SÁCH HỌC VIÊN CỦA 1 LỚP (CHO COACH / MANAGER XEM)
    public List<ClassBookingResponse> getRegistrationsByClass(Long classId) {
        return registrationRepository.findBySportClassIdAndStatus(classId, "REGISTERED").stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    private ClassBookingResponse mapToResponse(ClassRegistration reg) {
        return ClassBookingResponse.builder()
                .registrationId(reg.getId())
                .classId(reg.getSportClass().getId())
                .className(reg.getSportClass().getName())
                .categoryName(reg.getSportClass().getCategory().getName())
                .coachName(reg.getSportClass().getCoach().getFullName())
                .userId(reg.getUser().getId())
                .memberName(reg.getUser().getFullName())
                .memberPhone(reg.getUser().getPhone())
                .registeredAt(reg.getRegisteredAt())
                .status(reg.getStatus())
                .canceledAt(reg.getCanceledAt())
                .isPenalized(reg.getIsPenalized())
                .registeredBy(reg.getRegisteredBy() != null ? reg.getRegisteredBy().getFullName() : "Tự đặt qua App")
                .build();
    }
}