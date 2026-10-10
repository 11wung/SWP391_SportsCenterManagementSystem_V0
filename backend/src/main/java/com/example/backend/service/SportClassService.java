package com.example.backend.service;

import com.example.backend.dto.*;
import com.example.backend.entity.*;
import com.example.backend.exception.BusinessRuleException;
import com.example.backend.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SportClassService {

    private final SportClassRepository sportClassRepository;
    private final SportCategoryRepository categoryRepository;
    private final FacilityRoomRepository roomRepository;
    private final ClassScheduleRepository scheduleRepository;
    private final ClassRegistrationRepository registrationRepository;
    private final UserRepository userRepository;

    // 1. Lấy danh sách tất cả các lớp đang hoạt động
    public List<SportClassResponse> getAllActiveClasses() {
        return sportClassRepository.findByStatus("ACTIVE").stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    // 2. Lấy thông tin chi tiết 1 lớp học kèm lịch học
    public SportClassResponse getClassById(Long id) {
        SportClass sportClass = sportClassRepository.findById(id)
                .orElseThrow(() -> new BusinessRuleException("Không tìm thấy lớp học", HttpStatus.NOT_FOUND));
        return mapToResponse(sportClass);
    }

    // 3. Manager tạo lớp học mới
    @Transactional
    public SportClassResponse createClass(SportClassRequest request) {
        SportCategory category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new BusinessRuleException("Không tìm thấy bộ môn", HttpStatus.NOT_FOUND));

        User coach = userRepository.findById(request.getCoachId())
                .orElseThrow(() -> new BusinessRuleException("Không tìm thấy huấn luyện viên", HttpStatus.NOT_FOUND));

        // Kiểm tra xem User này có đúng là HLV không
        if (coach.getRole() == null || !"COACH".equalsIgnoreCase(coach.getRole().getCode())) {
            throw new BusinessRuleException("Người dùng được chỉ định không phải là Huấn luyện viên (COACH)");
        }

        SportClass sportClass = new SportClass();
        sportClass.setCategory(category);
        sportClass.setCoach(coach);
        sportClass.setName(request.getName());
        sportClass.setDescription(request.getDescription());
        sportClass.setLevel(request.getLevel());
        sportClass.setMaxCapacity(request.getMaxCapacity());
        sportClass.setStatus(request.getStatus() != null ? request.getStatus() : "ACTIVE");

        return mapToResponse(sportClassRepository.save(sportClass));
    }

    // 4. Manager cập nhật lớp học
    @Transactional
    public SportClassResponse updateClass(Long id, SportClassRequest request) {
        SportClass sportClass = sportClassRepository.findById(id)
                .orElseThrow(() -> new BusinessRuleException("Không tìm thấy lớp học", HttpStatus.NOT_FOUND));

        SportCategory category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new BusinessRuleException("Không tìm thấy bộ môn", HttpStatus.NOT_FOUND));

        User coach = userRepository.findById(request.getCoachId())
                .orElseThrow(() -> new BusinessRuleException("Không tìm thấy huấn luyện viên", HttpStatus.NOT_FOUND));

        sportClass.setCategory(category);
        sportClass.setCoach(coach);
        sportClass.setName(request.getName());
        sportClass.setDescription(request.getDescription());
        sportClass.setLevel(request.getLevel());
        sportClass.setMaxCapacity(request.getMaxCapacity());
        if (request.getStatus() != null) {
            sportClass.setStatus(request.getStatus());
        }

        return mapToResponse(sportClassRepository.save(sportClass));
    }

    // 5. Manager vô hiệu hóa lớp học (Soft delete)
    @Transactional
    public void deactivateClass(Long id) {
        SportClass sportClass = sportClassRepository.findById(id)
                .orElseThrow(() -> new BusinessRuleException("Không tìm thấy lớp học", HttpStatus.NOT_FOUND));
        sportClass.setStatus("INACTIVE");
        sportClassRepository.save(sportClass);
    }

    // 6. Thêm lịch học cho lớp
    @Transactional
    public ClassScheduleResponse addScheduleToClass(Long classId, ClassScheduleRequest request) {
        SportClass sportClass = sportClassRepository.findById(classId)
                .orElseThrow(() -> new BusinessRuleException("Không tìm thấy lớp học", HttpStatus.NOT_FOUND));

        FacilityRoom room = roomRepository.findById(request.getRoomId())
                .orElseThrow(() -> new BusinessRuleException("Không tìm thấy phòng tập", HttpStatus.NOT_FOUND));

        if ("MAINTENANCE".equalsIgnoreCase(room.getMaintenanceStatus())
                || "CLOSED".equalsIgnoreCase(room.getMaintenanceStatus())) {
            throw new BusinessRuleException("Phòng tập này hiện đang bảo trì hoặc đóng cửa");
        }

        if (request.getStartTime().isAfter(request.getEndTime())
                || request.getStartTime().equals(request.getEndTime())) {
            throw new BusinessRuleException("Giờ bắt đầu phải trước giờ kết thúc");
        }

        // Kiểm tra trùng lịch phòng tập
        List<ClassSchedule> existingSchedules = scheduleRepository.findByRoomIdAndDayOfWeek(room.getId(),
                request.getDayOfWeek());
        for (ClassSchedule existing : existingSchedules) {
            boolean isOverlap = !(request.getEndTime().isBefore(existing.getStartTime())
                    || request.getStartTime().isAfter(existing.getEndTime()));
            if (isOverlap) {
                throw new BusinessRuleException(
                        "Phòng " + room.getRoomName() + " đã có lịch học khác trong khoảng thời gian này!");
            }
        }

        ClassSchedule schedule = new ClassSchedule();
        schedule.setSportClass(sportClass);
        schedule.setRoom(room);
        schedule.setDayOfWeek(request.getDayOfWeek());
        schedule.setStartTime(request.getStartTime());
        schedule.setEndTime(request.getEndTime());

        ClassSchedule saved = scheduleRepository.save(schedule);
        return mapToScheduleResponse(saved);
    }

    // --- HÀM PHỤ TRỢ MAP RESPONSE ---
    private SportClassResponse mapToResponse(SportClass sportClass) {
        long enrolled = registrationRepository.countBySportClassIdAndStatus(sportClass.getId(), "REGISTERED");
        int available = Math.max(0, sportClass.getMaxCapacity() - (int) enrolled);

        List<ClassScheduleResponse> schedules = scheduleRepository.findBySportClassId(sportClass.getId())
                .stream()
                .map(this::mapToScheduleResponse)
                .collect(Collectors.toList());

        return SportClassResponse.builder()
                .id(sportClass.getId())
                .categoryId(sportClass.getCategory().getId())
                .categoryName(sportClass.getCategory().getName())
                .coachId(sportClass.getCoach().getId())
                .coachName(sportClass.getCoach().getFullName())
                .name(sportClass.getName())
                .description(sportClass.getDescription())
                .level(sportClass.getLevel())
                .maxCapacity(sportClass.getMaxCapacity())
                .currentEnrollment(enrolled)
                .availableSlots(available)
                .status(sportClass.getStatus())
                .schedules(schedules)
                .createdAt(sportClass.getCreatedAt())
                .build();
    }

    private ClassScheduleResponse mapToScheduleResponse(ClassSchedule schedule) {
        return ClassScheduleResponse.builder()
                .id(schedule.getId())
                .roomId(schedule.getRoom().getId())
                .roomName(schedule.getRoom().getRoomName())
                .dayOfWeek(schedule.getDayOfWeek())
                .startTime(schedule.getStartTime())
                .endTime(schedule.getEndTime())
                .build();
    }
}