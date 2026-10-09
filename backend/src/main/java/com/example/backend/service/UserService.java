package com.example.backend.service;

import com.example.backend.dto.UpdateProfileRequest;
import com.example.backend.dto.UserResponse;
import com.example.backend.entity.MemberProfile;
import com.example.backend.entity.User;
import com.example.backend.exception.BusinessRuleException;
import com.example.backend.repository.MemberProfileRepository;
import com.example.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final MemberProfileRepository memberProfileRepository;

    public UserResponse getMyProfile(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new BusinessRuleException("Không tìm thấy người dùng", HttpStatus.NOT_FOUND));
        return mapToUserResponse(user);
    }

    @Transactional
    public UserResponse updateMyProfile(String email, UpdateProfileRequest request) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new BusinessRuleException("Không tìm thấy người dùng", HttpStatus.NOT_FOUND));

        if (request.getFullName() != null) user.setFullName(request.getFullName());
        if (request.getPhone() != null && !request.getPhone().equals(user.getPhone())) {
            if (userRepository.existsByPhone(request.getPhone())) {
                throw new BusinessRuleException("Số điện thoại đã được sử dụng bởi tài khoản khác", HttpStatus.BAD_REQUEST);
            }
            user.setPhone(request.getPhone());
        }
        if (request.getAvatarUrl() != null) user.setAvatarUrl(request.getAvatarUrl());
        if (request.getGender() != null) user.setGender(request.getGender());
        if (request.getDateOfBirth() != null) user.setDateOfBirth(request.getDateOfBirth());

        // Update Member Profile if user is MEMBER
        if (user.getRole().getCode().equals("MEMBER") && user.getMemberProfile() != null) {
            MemberProfile profile = user.getMemberProfile();
            if (request.getHeightCm() != null) profile.setHeightCm(request.getHeightCm());
            if (request.getWeightKg() != null) profile.setWeightKg(request.getWeightKg());
            if (request.getFitnessGoal() != null) profile.setFitnessGoal(request.getFitnessGoal());
            memberProfileRepository.save(profile);
        }

        userRepository.save(user);
        return mapToUserResponse(user);
    }

    public List<UserResponse> getAllUsers() {
        return userRepository.findAll().stream()
                .map(this::mapToUserResponse)
                .collect(Collectors.toList());
    }

    public UserResponse getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new BusinessRuleException("Không tìm thấy người dùng", HttpStatus.NOT_FOUND));
        return mapToUserResponse(user);
    }

    @Transactional
    public void updateUserStatus(Long id, boolean isActive) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new BusinessRuleException("Không tìm thấy người dùng", HttpStatus.NOT_FOUND));
        user.setIsActive(isActive);
        userRepository.save(user);
    }

    private UserResponse mapToUserResponse(User user) {
        UserResponse.UserResponseBuilder builder = UserResponse.builder()
                .id(user.getId())
                .fullName(user.getFullName())
                .email(user.getEmail())
                .phone(user.getPhone())
                .role(user.getRole().getCode())
                .avatarUrl(user.getAvatarUrl())
                .gender(user.getGender())
                .dateOfBirth(user.getDateOfBirth())
                .isActive(user.getIsActive())
                .createdAt(user.getCreatedAt());

        if (user.getMemberProfile() != null) {
            builder.joinDate(user.getMemberProfile().getJoinDate())
                   .heightCm(user.getMemberProfile().getHeightCm())
                   .weightKg(user.getMemberProfile().getWeightKg())
                   .fitnessGoal(user.getMemberProfile().getFitnessGoal())
                   .membershipTier(user.getMemberProfile().getMembershipTier());
        }

        return builder.build();
    }
}
