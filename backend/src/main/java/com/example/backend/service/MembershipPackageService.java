package com.example.backend.service;

import com.example.backend.dto.MembershipPackageRequest;
import com.example.backend.dto.MembershipPackageResponse;
import com.example.backend.entity.MembershipPackage;
import com.example.backend.exception.BusinessRuleException;
import com.example.backend.repository.MembershipPackageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MembershipPackageService {

    private final MembershipPackageRepository packageRepository;

    public List<MembershipPackageResponse> getAllPackages() {
        return packageRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public MembershipPackageResponse getPackageById(Long id) {
        MembershipPackage pkg = packageRepository.findById(id)
                .orElseThrow(() -> new BusinessRuleException("Không tìm thấy gói tập", HttpStatus.NOT_FOUND));
        return mapToResponse(pkg);
    }

    @Transactional
    public MembershipPackageResponse createPackage(MembershipPackageRequest request) {
        if (packageRepository.existsByCode(request.getCode())) {
            throw new BusinessRuleException("Mã gói tập đã tồn tại", HttpStatus.BAD_REQUEST);
        }
        if (packageRepository.existsByName(request.getName())) {
            throw new BusinessRuleException("Tên gói tập đã tồn tại", HttpStatus.BAD_REQUEST);
        }

        MembershipPackage pkg = new MembershipPackage();
        pkg.setCode(request.getCode());
        pkg.setName(request.getName());
        pkg.setDescription(request.getDescription());
        pkg.setDurationMonths(request.getDurationMonths());
        pkg.setPrice(request.getPrice());
        pkg.setMaxClassesPerWeek(request.getMaxClassesPerWeek());
        pkg.setIsActive(request.getIsActive() != null ? request.getIsActive() : true);

        return mapToResponse(packageRepository.save(pkg));
    }

    @Transactional
    public MembershipPackageResponse updatePackage(Long id, MembershipPackageRequest request) {
        MembershipPackage pkg = packageRepository.findById(id)
                .orElseThrow(() -> new BusinessRuleException("Không tìm thấy gói tập", HttpStatus.NOT_FOUND));

        if (!pkg.getCode().equals(request.getCode()) && packageRepository.existsByCode(request.getCode())) {
            throw new BusinessRuleException("Mã gói tập đã tồn tại", HttpStatus.BAD_REQUEST);
        }
        if (!pkg.getName().equals(request.getName()) && packageRepository.existsByName(request.getName())) {
            throw new BusinessRuleException("Tên gói tập đã tồn tại", HttpStatus.BAD_REQUEST);
        }

        pkg.setCode(request.getCode());
        pkg.setName(request.getName());
        pkg.setDescription(request.getDescription());
        pkg.setDurationMonths(request.getDurationMonths());
        pkg.setPrice(request.getPrice());
        pkg.setMaxClassesPerWeek(request.getMaxClassesPerWeek());
        if (request.getIsActive() != null) {
            pkg.setIsActive(request.getIsActive());
        }

        return mapToResponse(packageRepository.save(pkg));
    }

    @Transactional
    public void deletePackage(Long id) {
        if (!packageRepository.existsById(id)) {
            throw new BusinessRuleException("Không tìm thấy gói tập", HttpStatus.NOT_FOUND);
        }
        // Thường thì chỉ nên chuyển isActive = false thay vì xóa hẳn để giữ lịch sử
        MembershipPackage pkg = packageRepository.findById(id).get();
        pkg.setIsActive(false);
        packageRepository.save(pkg);
    }

    private MembershipPackageResponse mapToResponse(MembershipPackage pkg) {
        return MembershipPackageResponse.builder()
                .id(pkg.getId())
                .code(pkg.getCode())
                .name(pkg.getName())
                .description(pkg.getDescription())
                .durationMonths(pkg.getDurationMonths())
                .price(pkg.getPrice())
                .maxClassesPerWeek(pkg.getMaxClassesPerWeek())
                .isActive(pkg.getIsActive())
                .createdAt(pkg.getCreatedAt())
                .build();
    }
}
