package com.example.backend.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

/**
 * Ánh xạ bảng workout_progress — theo dõi tiến độ tập luyện của học viên (Flow 4).
 * Coach ghi nhận chỉ số thể chất và nhận xét sau mỗi buổi hoặc định kỳ.
 */
@Entity
@Table(name = "workout_progress")
public class WorkoutProgress {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // --- Kế hoạch tập liên quan (có thể null nếu ghi độc lập) ---
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "plan_id", nullable = true)
    private WorkoutPlan plan;

    // --- Học viên ---
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    private User member;

    // --- Coach ghi nhận ---
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "recorded_by", nullable = true)
    private User recordedBy;

    @Column(name = "recorded_date", nullable = false)
    private LocalDate recordedDate;

    @Column(name = "weight_kg", precision = 5, scale = 2)
    private BigDecimal weightKg;

    @Column(name = "height_cm", precision = 5, scale = 2)
    private BigDecimal heightCm;

    // Phần trăm mỡ cơ thể
    @Column(name = "body_fat_pct", precision = 4, scale = 1)
    private BigDecimal bodyFatPct;

    // Khối lượng cơ
    @Column(name = "muscle_mass_kg", precision = 5, scale = 2)
    private BigDecimal muscleMassKg;

    // Nhận xét và đánh giá của Coach
    @Column(name = "notes", columnDefinition = "TEXT")
    private String notes;

    @PrePersist
    public void prePersist() {
        if (this.recordedDate == null) {
            this.recordedDate = LocalDate.now();
        }
    }

    public WorkoutProgress() {
    }

    public WorkoutProgress(Long id, WorkoutPlan plan, User member, User recordedBy,
            LocalDate recordedDate, BigDecimal weightKg, BigDecimal heightCm,
            BigDecimal bodyFatPct, BigDecimal muscleMassKg, String notes) {
        this.id = id;
        this.plan = plan;
        this.member = member;
        this.recordedBy = recordedBy;
        this.recordedDate = recordedDate;
        this.weightKg = weightKg;
        this.heightCm = heightCm;
        this.bodyFatPct = bodyFatPct;
        this.muscleMassKg = muscleMassKg;
        this.notes = notes;
    }

    // --- Getters & Setters ---

    public Long getId() {
        return id;
    }

    public WorkoutPlan getPlan() {
        return plan;
    }

    public void setPlan(WorkoutPlan plan) {
        this.plan = plan;
    }

    public User getMember() {
        return member;
    }

    public void setMember(User member) {
        this.member = member;
    }

    public User getRecordedBy() {
        return recordedBy;
    }

    public void setRecordedBy(User recordedBy) {
        this.recordedBy = recordedBy;
    }

    public LocalDate getRecordedDate() {
        return recordedDate;
    }

    public void setRecordedDate(LocalDate recordedDate) {
        this.recordedDate = recordedDate;
    }

    public BigDecimal getWeightKg() {
        return weightKg;
    }

    public void setWeightKg(BigDecimal weightKg) {
        this.weightKg = weightKg;
    }

    public BigDecimal getHeightCm() {
        return heightCm;
    }

    public void setHeightCm(BigDecimal heightCm) {
        this.heightCm = heightCm;
    }

    public BigDecimal getBodyFatPct() {
        return bodyFatPct;
    }

    public void setBodyFatPct(BigDecimal bodyFatPct) {
        this.bodyFatPct = bodyFatPct;
    }

    public BigDecimal getMuscleMassKg() {
        return muscleMassKg;
    }

    public void setMuscleMassKg(BigDecimal muscleMassKg) {
        this.muscleMassKg = muscleMassKg;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }
}
