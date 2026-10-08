package com.example.backend.service;

import com.example.backend.dto.MemberSummaryResponse;
import com.example.backend.dto.ProfileResponse;
import com.example.backend.dto.UpdateProfileRequest;
import com.example.backend.entity.MemberProfile;
import com.example.backend.entity.User;
import com.example.backend.exception.BusinessRuleException;
import com.example.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class UserService {

    private static final Set<String> ROLE_DUOC_XEM_HOI_VIEN = Set.of("MANAGER", "RECEPTIONIST");

    private final UserRepository userRepository;

    // ---------- XEM PROFILE ----------
    @Transactional(readOnly = true)
    public ProfileResponse getProfile(String email) {
        return toProfileResponse(timUserTheoEmail(email));
    }

    // ---------- SỬA PROFILE ----------
    @Transactional
    public ProfileResponse updateProfile(String email, UpdateProfileRequest req) {
        User user = timUserTheoEmail(email);

        if (req.getFullName() != null) {
            if (req.getFullName().isBlank()) {
                throw new BusinessRuleException("Họ tên không được để trống");
            }
            user.setFullName(req.getFullName().trim());
        }

        if (req.getPhone() != null) {
            if (!req.getPhone().matches("\\d{10}")) {
                throw new BusinessRuleException("Số điện thoại phải gồm đúng 10 chữ số");
            }
            if (userRepository.existsByPhoneAndIdNot(req.getPhone(), user.getId())) {
                throw new BusinessRuleException("Số điện thoại đã được người khác sử dụng");
            }
            user.setPhone(req.getPhone());
        }

        if (req.getAvatarUrl() != null)
            user.setAvatarUrl(req.getAvatarUrl());
        if (req.getGender() != null)
            user.setGender(req.getGender());
        if (req.getDateOfBirth() != null) {
            if (req.getDateOfBirth().isAfter(java.time.LocalDate.now())) {
                throw new BusinessRuleException("Ngày sinh không được ở tương lai");
            }
            user.setDateOfBirth(req.getDateOfBirth());
        }

        // chỉ MEMBER mới có MemberProfile
        MemberProfile mp = user.getMemberProfile();
        if (mp != null) {
            if (req.getHeightCm() != null)
                mp.setHeightCm(req.getHeightCm());
            if (req.getWeightKg() != null)
                mp.setWeightKg(req.getWeightKg());
            if (req.getFitnessGoal() != null)
                mp.setFitnessGoal(req.getFitnessGoal());
        }

        user.setUpdatedAt(OffsetDateTime.now()); // entity không có @PreUpdate nên tự gán
        return toProfileResponse(userRepository.save(user));
    }

    // ---------- DANH SÁCH HỘI VIÊN (Quản lý / Lễ tân) ----------
    @Transactional(readOnly = true)
    public List<MemberSummaryResponse> getMembers(String currentEmail, String keyword) {
        User current = timUserTheoEmail(currentEmail);
        if (!ROLE_DUOC_XEM_HOI_VIEN.contains(current.getRole().getCode())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Bạn không có quyền xem danh sách hội viên");
        }

        String kw = (keyword == null) ? "" : keyword.trim().toLowerCase();

        return userRepository.findByRoleCode("MEMBER").stream()
                .filter(u -> kw.isEmpty()
                        || u.getFullName().toLowerCase().contains(kw)
                        || u.getEmail().toLowerCase().contains(kw)
                        || u.getPhone().contains(kw))
                .map(this::toMemberSummary)
                .toList();
    }

    // ---------- HÀM PHỤ ----------
    private User timUserTheoEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new BusinessRuleException("Không tìm thấy người dùng"));
    }

    private ProfileResponse toProfileResponse(User u) {
        MemberProfile mp = u.getMemberProfile();
        return ProfileResponse.builder()
                .id(u.getId())
                .fullName(u.getFullName())
                .email(u.getEmail())
                .phone(u.getPhone())
                .avatarUrl(u.getAvatarUrl())
                .gender(u.getGender())
                .dateOfBirth(u.getDateOfBirth())
                .role(u.getRole().getCode())
                .joinDate(mp != null ? mp.getJoinDate() : null)
                .heightCm(mp != null ? mp.getHeightCm() : null)
                .weightKg(mp != null ? mp.getWeightKg() : null)
                .fitnessGoal(mp != null ? mp.getFitnessGoal() : null)
                .membershipTier(mp != null ? mp.getMembershipTier() : null)
                .build();
    }

    private MemberSummaryResponse toMemberSummary(User u) {
        MemberProfile mp = u.getMemberProfile();
        return new MemberSummaryResponse(
                u.getId(), u.getFullName(), u.getEmail(), u.getPhone(), u.getIsActive(),
                mp != null ? mp.getJoinDate() : null,
                mp != null ? mp.getMembershipTier() : null);
    }
}