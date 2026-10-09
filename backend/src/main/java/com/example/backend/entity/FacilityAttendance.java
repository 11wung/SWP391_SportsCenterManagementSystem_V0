package com.example.backend.entity;

import jakarta.persistence.*;
import java.time.OffsetDateTime;

/**
 * Ánh xạ bảng facility_attendances — điểm danh vào/ra trung tâm.
 * Dùng cho Receptionist check-in thành viên khi đến trung tâm (không phải buổi học cụ thể).
 */
@Entity
@Table(name = "facility_attendances")
public class FacilityAttendance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // --- Thành viên check-in ---
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "check_in_time", nullable = false)
    private OffsetDateTime checkInTime;

    // null nếu chưa check-out
    @Column(name = "check_out_time")
    private OffsetDateTime checkOutTime;

    // --- Nhân viên ghi nhận (lễ tân hoặc hệ thống) ---
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "recorded_by", nullable = true)
    private User recordedBy;

    @Column(name = "notes", length = 500)
    private String notes;

    @PrePersist
    public void prePersist() {
        if (this.checkInTime == null) {
            this.checkInTime = OffsetDateTime.now();
        }
    }

    public FacilityAttendance() {
    }

    public FacilityAttendance(Long id, User user, OffsetDateTime checkInTime,
            OffsetDateTime checkOutTime, User recordedBy, String notes) {
        this.id = id;
        this.user = user;
        this.checkInTime = checkInTime;
        this.checkOutTime = checkOutTime;
        this.recordedBy = recordedBy;
        this.notes = notes;
    }

    // --- Getters & Setters ---

    public Long getId() {
        return id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public OffsetDateTime getCheckInTime() {
        return checkInTime;
    }

    public void setCheckInTime(OffsetDateTime checkInTime) {
        this.checkInTime = checkInTime;
    }

    public OffsetDateTime getCheckOutTime() {
        return checkOutTime;
    }

    public void setCheckOutTime(OffsetDateTime checkOutTime) {
        this.checkOutTime = checkOutTime;
    }

    public User getRecordedBy() {
        return recordedBy;
    }

    public void setRecordedBy(User recordedBy) {
        this.recordedBy = recordedBy;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }
}
