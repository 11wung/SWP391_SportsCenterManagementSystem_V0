package com.example.backend.entity;

import jakarta.persistence.*;

import java.time.OffsetDateTime;

@Entity
@Table(name = "sport_classes")
public class SportClass {

    @Id // Khóa chính
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = false)
    private SportCategory category;

    // --- MỐI QUAN HỆ 2: Huấn luyện viên phụ trách ---
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "coach_id", nullable = false)
    private User coach;

    @Column(name = "name", nullable = false, length = 150) // tên lớp học
    private String name;

    @Column(name = "description", columnDefinition = "TEXT") // mô tả chi tiết nội dung khóa học
    private String description;

    @Column(name = "level", nullable = false, length = 20) // trình độ
    private String level = "BEGINNER";

    @Column(name = "max_capacity", nullable = false) // số học viên tối đa cho phép đăng ký
    private Integer maxCapacity;

    @Column(name = "status", nullable = false, length = 20) // trạng thái
    private String status = "ACTIVE";

    @Column(name = "created_at", nullable = false) // thời điểm tạo lớp
    private OffsetDateTime createdAt;

    @Column(name = "updated_at", nullable = false) // thời điểm cập nhật lớp gần nhất
    private OffsetDateTime updatedAt;

    @PrePersist
    public void prePersist() {
        OffsetDateTime now = OffsetDateTime.now();
        this.createdAt = now;
        this.updatedAt = now;
    }

    @PreUpdate
    public void preUpdate() {
        this.updatedAt = OffsetDateTime.now();
    }

    public SportClass() {
    }

    // Constructor đầy đủ tham số
    public SportClass(Long id, SportCategory category, User coach, String name, String description,
            String level, Integer maxCapacity, String status,
            OffsetDateTime createdAt, OffsetDateTime updatedAt) {
        this.id = id;
        this.category = category;
        this.coach = coach;
        this.name = name;
        this.description = description;
        this.level = level;
        this.maxCapacity = maxCapacity;
        this.status = status;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public SportCategory getCategory() {
        return category;
    }

    public void setCategory(SportCategory category) {
        this.category = category;
    }

    public User getCoach() {
        return coach;
    }

    public void setCoach(User coach) {
        this.coach = coach;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getLevel() {
        return level;
    }

    public void setLevel(String level) {
        this.level = level;
    }

    public Integer getMaxCapacity() {
        return maxCapacity;
    }

    public void setMaxCapacity(Integer maxCapacity) {
        this.maxCapacity = maxCapacity;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public OffsetDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(OffsetDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public OffsetDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(OffsetDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}