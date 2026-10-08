package com.example.backend.entity;

import jakarta.persistence.*;
import java.time.OffsetDateTime;

@Entity
@Table(name = "class_registrations", uniqueConstraints = {
        // đảm bảo 1 hội viên chỉ được đăng ký 1 lớp duy nhất 1 lần
        @UniqueConstraint(columnNames = { "class_id", "user_id" })
})
public class ClassRegistration {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // --- lớp học được đăng ký ---
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "class_id", nullable = false)
    private SportClass sportClass;

    // --- hội viên đăng ký ---
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "registered_at", nullable = false)
    private OffsetDateTime registeredAt;

    @Column(name = "status", nullable = false, length = 20) // Trạng thái ('REGISTERED', 'WAITLISTED', 'CANCELED')
    private String status = "REGISTERED";

    @Column(name = "canceled_at")
    private OffsetDateTime canceledAt;

    @Column(name = "is_penalized", nullable = false) // Phạt nếu hủy quá trễ
    private Boolean isPenalized = false;

    // --- lễ tân đăng ký giùm (nếu có) ---
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "registered_by")
    private User registeredBy;

    @PrePersist
    public void prePersist() {
        if (this.registeredAt == null) {
            this.registeredAt = OffsetDateTime.now();
        }
    }

    public ClassRegistration() {
    }

    public ClassRegistration(Long id, SportClass sportClass, User user, OffsetDateTime registeredAt, String status,
            OffsetDateTime canceledAt, Boolean isPenalized, User registeredBy) {
        this.id = id;
        this.sportClass = sportClass;
        this.user = user;
        this.registeredAt = registeredAt;
        this.status = status;
        this.canceledAt = canceledAt;
        this.isPenalized = isPenalized;
        this.registeredBy = registeredBy;
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

    public OffsetDateTime getRegisteredAt() {
        return registeredAt;
    }

    public void setRegisteredAt(OffsetDateTime registeredAt) {
        this.registeredAt = registeredAt;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public OffsetDateTime getCanceledAt() {
        return canceledAt;
    }

    public void setCanceledAt(OffsetDateTime canceledAt) {
        this.canceledAt = canceledAt;
    }

    public Boolean getIsPenalized() {
        return isPenalized;
    }

    public void setIsPenalized(Boolean isPenalized) {
        this.isPenalized = isPenalized;
    }

    public User getRegisteredBy() {
        return registeredBy;
    }

    public void setRegisteredBy(User registeredBy) {
        this.registeredBy = registeredBy;
    }
}