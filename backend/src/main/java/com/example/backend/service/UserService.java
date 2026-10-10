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

import com.example.backend.repository.CoachProfileRepository;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final MemberProfileRepository memberProfileRepository;
    private final CoachProfileRepository coachProfileRepository;

    public UserResponse getMyProfile(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new BusinessRuleException("Không tìm thấy người dùng", HttpStatus.NOT_FOUND));
        return mapToUserResponse(user);
    }

    @Transactional
    public UserResponse updateMyProfile(String email, UpdateProfileRequest request) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new BusinessRuleException("Không tìm thấy người dùng", HttpStatus.NOT_FOUND));

        updateBasicFields(user, request.getFullName(), request.getPhone(), request.getAvatarUrl(), request.getGender(), request.getDateOfBirth());

        if (user.getRole().getCode().equals("MEMBER") && user.getMemberProfile() != null) {
            MemberProfile profile = user.getMemberProfile();
            if (request.getHeightCm() != null) profile.setHeightCm(request.getHeightCm());
            if (request.getWeightKg() != null) profile.setWeightKg(request.getWeightKg());
            if (request.getFitnessGoal() != null) profile.setFitnessGoal(request.getFitnessGoal());
            memberProfileRepository.save(profile);
        } else if (user.getRole().getCode().equals("COACH") && user.getCoachProfile() != null) {
            com.example.backend.entity.CoachProfile profile = user.getCoachProfile();
            if (request.getYearsExperience() != null) profile.setYearsExperience(request.getYearsExperience());
            if (request.getCertifications() != null) profile.setCertifications(request.getCertifications());
            coachProfileRepository.save(profile);
        }

        userRepository.save(user);
        return mapToUserResponse(user);
    }

    public List<UserResponse> searchUsers(String search, String role) {
        return userRepository.searchUsers(search, role).stream()
                .map(this::mapToUserResponse)
                .collect(Collectors.toList());
    }

    public UserResponse getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new BusinessRuleException("Không tìm thấy người dùng", HttpStatus.NOT_FOUND));
        return mapToUserResponse(user);
    }

    @Transactional
    public UserResponse createUser(com.example.backend.dto.CreateUserRequest request, org.springframework.security.crypto.password.PasswordEncoder passwordEncoder, com.example.backend.repository.RoleRepository roleRepository) {
        if (request.getRoleCode() == null || request.getRoleCode().trim().isEmpty()) {
            throw new BusinessRuleException("Role không được để trống", HttpStatus.BAD_REQUEST);
        }
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new BusinessRuleException("Email đã tồn tại", HttpStatus.BAD_REQUEST);
        }
        if (userRepository.existsByPhone(request.getPhone())) {
            throw new BusinessRuleException("Số điện thoại đã tồn tại", HttpStatus.BAD_REQUEST);
        }

        com.example.backend.entity.Role role = roleRepository.findByCode(request.getRoleCode())
                .orElseThrow(() -> new BusinessRuleException("Role không hợp lệ", HttpStatus.BAD_REQUEST));

        User newUser = User.builder()
                .role(role)
                .fullName(request.getFullName())
                .email(request.getEmail())
                .phone(request.getPhone())
                .passwordHash(passwordEncoder.encode(request.getPassword()))
                .isActive(true)
                .build();

        if ("MEMBER".equals(role.getCode())) {
            MemberProfile profile = new MemberProfile();
            profile.setJoinDate(java.time.LocalDate.now());
            newUser.setMemberProfile(profile);
        } else if ("COACH".equals(role.getCode())) {
            newUser.setCoachProfile(new com.example.backend.entity.CoachProfile());
        } else if ("RECEPTIONIST".equals(role.getCode()) || "MANAGER".equals(role.getCode())) {
            newUser.setStaffProfile(new com.example.backend.entity.StaffProfile());
        }

        userRepository.save(newUser);
        return mapToUserResponse(newUser);
    }

    @Transactional
    public UserResponse updateUser(Long id, com.example.backend.dto.UpdateUserRequest request, com.example.backend.repository.RoleRepository roleRepository) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new BusinessRuleException("Không tìm thấy người dùng", HttpStatus.NOT_FOUND));

        updateBasicFields(user, request.getFullName(), request.getPhone(), request.getAvatarUrl(), request.getGender(), request.getDateOfBirth());
        
        if (request.getRoleCode() != null && !request.getRoleCode().equals(user.getRole().getCode())) {
            com.example.backend.entity.Role role = roleRepository.findByCode(request.getRoleCode())
                    .orElseThrow(() -> new BusinessRuleException("Role không hợp lệ", HttpStatus.BAD_REQUEST));
            user.setRole(role);
        }

        userRepository.save(user);
        return mapToUserResponse(user);
    }

    private void updateBasicFields(User user, String fullName, String phone, String avatarUrl, String gender, java.time.LocalDate dateOfBirth) {
        if (fullName != null) user.setFullName(fullName);
        if (phone != null && !phone.equals(user.getPhone())) {
            if (userRepository.existsByPhone(phone)) {
                throw new BusinessRuleException("Số điện thoại đã tồn tại", HttpStatus.BAD_REQUEST);
            }
            user.setPhone(phone);
        }
        if (avatarUrl != null) user.setAvatarUrl(avatarUrl);
        if (gender != null) user.setGender(gender);
        if (dateOfBirth != null) user.setDateOfBirth(dateOfBirth);
    }

    @Transactional
    public void deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            throw new BusinessRuleException("Không tìm thấy người dùng", HttpStatus.NOT_FOUND);
        }
        userRepository.deleteById(id);
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
        if (user.getCoachProfile() != null) {
            builder.yearsExperience(user.getCoachProfile().getYearsExperience())
                   .certifications(user.getCoachProfile().getCertifications());
        }

        return builder.build();
    }
}
