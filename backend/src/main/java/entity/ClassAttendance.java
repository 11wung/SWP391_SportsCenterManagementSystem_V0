package entity;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.OffsetDateTime;

@Entity
@Table(name = "class_attendances", uniqueConstraints = {
        // mỗi học viên chỉ có 1 điểm danh cho 1 lớp vào 1 ngày cụ thể
        @UniqueConstraint(columnNames = { "class_id", "user_id", "session_date" })
})
public class ClassAttendance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // --- lớp học ---
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "class_id", nullable = false)
    private SportClass sportClass;

    // --- học viên ---
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "session_date", nullable = false) // ngày diễn ra buổi học
    private LocalDate sessionDate;

    @Column(name = "status", nullable = false, length = 10) // trạng thái ('PRESENT', 'ABSENT', 'LATE', 'EXCUSED')
    private String status;

    @Column(name = "check_in_time") // giờ học viên quẹt thẻ/điểm danh
    private OffsetDateTime checkInTime;

    // --- người điểm danh (huấn luyện viên hoặc lễ tân) ---
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "recorded_by")
    private User recordedBy;

    @Column(name = "notes", length = 500) // Ghi chú thêm
    private String notes;

    public ClassAttendance() {
    }

    public ClassAttendance(Long id, SportClass sportClass, User user, LocalDate sessionDate, String status,
            OffsetDateTime checkInTime, User recordedBy, String notes) {
        this.id = id;
        this.sportClass = sportClass;
        this.user = user;
        this.sessionDate = sessionDate;
        this.status = status;
        this.checkInTime = checkInTime;
        this.recordedBy = recordedBy;
        this.notes = notes;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public SportClass getSportClass() {
        return sportClass;
    }

    public void setSportClass(SportClass sportClass) {
        this.sportClass = sportClass;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public LocalDate getSessionDate() {
        return sessionDate;
    }

    public void setSessionDate(LocalDate sessionDate) {
        this.sessionDate = sessionDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public OffsetDateTime getCheckInTime() {
        return checkInTime;
    }

    public void setCheckInTime(OffsetDateTime checkInTime) {
        this.checkInTime = checkInTime;
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