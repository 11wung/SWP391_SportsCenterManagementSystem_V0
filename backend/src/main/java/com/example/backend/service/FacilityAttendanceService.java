package com.example.backend.service;

import com.example.backend.dto.FacilityAttendanceRequest;
import com.example.backend.dto.FacilityAttendanceResponse;
import com.example.backend.entity.FacilityAttendance;
import com.example.backend.entity.User;
import com.example.backend.exception.BusinessRuleException;
import com.example.backend.repository.FacilityAttendanceRepository;
import com.example.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FacilityAttendanceService {

    private final FacilityAttendanceRepository attendanceRepository;
    private final UserRepository userRepository;

    public List<FacilityAttendanceResponse> getRecentAttendances() {
        // Lấy danh sách điểm danh 7 ngày gần đây
        OffsetDateTime sevenDaysAgo = OffsetDateTime.now().minusDays(7);
        return attendanceRepository.findByCheckInTimeAfterOrderByCheckInTimeDesc(sevenDaysAgo).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public List<FacilityAttendanceResponse> getUserAttendances(Long userId) {
        return attendanceRepository.findByUserIdOrderByCheckInTimeDesc(userId).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    public FacilityAttendanceResponse checkIn(FacilityAttendanceRequest request, String recordedByEmail) {
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new BusinessRuleException("Không tìm thấy hội viên", HttpStatus.NOT_FOUND));

        User recorder = null;
        if (recordedByEmail != null) {
            recorder = userRepository.findByEmail(recordedByEmail).orElse(null);
        }

        FacilityAttendance attendance = new FacilityAttendance();
        attendance.setUser(user);
        attendance.setRecordedBy(recorder);
        attendance.setNotes(request.getNotes());
        // prePersist sẽ tự set checkInTime = now()

        return mapToResponse(attendanceRepository.save(attendance));
    }

    @Transactional
    public FacilityAttendanceResponse checkOut(Long attendanceId) {
        FacilityAttendance attendance = attendanceRepository.findById(attendanceId)
                .orElseThrow(() -> new BusinessRuleException("Không tìm thấy bản ghi check-in", HttpStatus.NOT_FOUND));
        
        if (attendance.getCheckOutTime() != null) {
            throw new BusinessRuleException("Hội viên này đã check-out rồi", HttpStatus.BAD_REQUEST);
        }

        attendance.setCheckOutTime(OffsetDateTime.now());
        return mapToResponse(attendanceRepository.save(attendance));
    }

    private FacilityAttendanceResponse mapToResponse(FacilityAttendance attendance) {
        return FacilityAttendanceResponse.builder()
                .id(attendance.getId())
                .userId(attendance.getUser().getId())
                .userFullName(attendance.getUser().getFullName())
                .checkInTime(attendance.getCheckInTime())
                .checkOutTime(attendance.getCheckOutTime())
                .recordedBy(attendance.getRecordedBy() != null ? attendance.getRecordedBy().getFullName() : "Hệ thống")
                .notes(attendance.getNotes())
                .build();
    }
}
