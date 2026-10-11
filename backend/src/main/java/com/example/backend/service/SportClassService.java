
package com.example.backend.service;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.example.backend.dto.SportClassRequest;
import com.example.backend.entity.Role;
import com.example.backend.entity.SportCategory;
import com.example.backend.entity.SportClass;
import com.example.backend.entity.User;
import com.example.backend.repository.ClassRegistrationRepository;
import com.example.backend.repository.SportCategoryRepository;
import com.example.backend.repository.SportClassRepository;
import com.example.backend.repository.UserRepository;

@Service
public class SportClassService {

    private final SportClassRepository sportClassRepository;
    private final SportCategoryRepository sportCategoryRepository;
    private final UserRepository userRepository;
    private final ClassRegistrationRepository classRegistrationRepository;

    public SportClassService(
            SportClassRepository sportClassRepository,
            SportCategoryRepository sportCategoryRepository,
            UserRepository userRepository,
            ClassRegistrationRepository classRegistrationRepository) {
        this.sportClassRepository = sportClassRepository;
        this.sportCategoryRepository = sportCategoryRepository;
        this.userRepository = userRepository;
        this.classRegistrationRepository = classRegistrationRepository;
    }

    // Lấy tất cả lớp học
    public List<SportClass> getAllClasses() {
        return sportClassRepository.findAllByOrderByIdDesc();
    }

    // Lấy lớp học theo ID
    public SportClass getClassById(Long id) {
        return sportClassRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Không tìm thấy lớp học"));
    }

    // Lấy lớp học theo môn thể thao
    public List<SportClass> getClassesByCategory(Long categoryId) {
        if (!sportCategoryRepository.existsById(categoryId)) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Không tìm thấy môn thể thao");
        }
        return sportClassRepository.findByCategory_IdOrderByIdDesc(categoryId);
    }

    // Tạo lớp học
    @Transactional
    public SportClass createClass(SportClassRequest request) {
        validateRequest(request);

        SportClass sportClass = new SportClass();
        updateClassData(sportClass, request);

        return sportClassRepository.save(sportClass);
    }

    // Cập nhật lớp học
    @Transactional
    public SportClass updateClass(Long id, SportClassRequest request) {
        validateRequest(request);

        SportClass sportClass = getClassById(id);
        updateClassData(sportClass, request);

        return sportClassRepository.save(sportClass);
    }

    // Xóa mềm: chuyển lớp học sang INACTIVE
    @Transactional
    public void deleteClass(Long id) {
        SportClass sportClass = getClassById(id);
        sportClass.setStatus("INACTIVE");
        sportClassRepository.save(sportClass);
    }

    // Kiểm tra dữ liệu đầu vào
    private void validateRequest(SportClassRequest request) {
        if (!List.of("BEGINNER", "INTERMEDIATE", "ADVANCED")
                .contains(request.getLevel().toUpperCase())) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "Trình độ lớp học không hợp lệ");
        }

        if (request.getStatus() == null ||
                !List.of("ACTIVE", "INACTIVE", "CANCELED", "COMPLETED")
                        .contains(request.getStatus().toUpperCase())) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "Trạng thái lớp học không hợp lệ");
        }

        if (request.getDescription() != null &&
                request.getDescription().length() > 10000) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "Mô tả lớp học quá dài");
        }

        SportCategory category = sportCategoryRepository
                .findById(request.getCategoryId())
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Không tìm thấy môn thể thao"));

        User coach = userRepository.findById(request.getCoachId())
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Không tìm thấy huấn luyện viên"));

        if (!Boolean.TRUE.equals(coach.getIsActive())) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "Huấn luyện viên đã bị vô hiệu hóa");
        }

        Role role = coach.getRole();

        if (role == null || !"COACH".equalsIgnoreCase(role.getCode())) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "Người được chọn không phải huấn luyện viên");
        }
    }

    // Gán dữ liệu vào lớp học
    private void updateClassData(SportClass sportClass, SportClassRequest request) {
        SportCategory category = sportCategoryRepository
                .findById(request.getCategoryId())
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Không tìm thấy môn thể thao"));

        User coach = userRepository.findById(request.getCoachId())
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Không tìm thấy huấn luyện viên"));

        sportClass.setCategory(category);
        sportClass.setCoach(coach);
        sportClass.setName(request.getName().trim());
        sportClass.setDescription(request.getDescription());
        sportClass.setLevel(request.getLevel().toUpperCase());
        sportClass.setMaxCapacity(request.getMaxCapacity());
        sportClass.setStatus(request.getStatus().toUpperCase());
    }
}
