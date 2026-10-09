package com.example.backend.entity;

import jakarta.persistence.*;
import java.time.OffsetDateTime;

/**
 * Ánh xạ bảng notifications — thông báo gửi đến người dùng.
 *
 * type:
 *   ANNOUNCEMENT  — thông báo chung từ Manager
 *   HOMEWORK      — bài tập về nhà từ Coach
 *   WORKOUT_PLAN  — kế hoạch tập mới từ Coach
 *   MEMBERSHIP    — sắp hết hạn gói tập
 *   BOOKING       — xác nhận/thay đổi lịch học
 *   SYSTEM        — thông báo hệ thống
 */
@Entity
@Table(name = "notifications")
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // --- Người nhận ---
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "recipient_id", nullable = false)
    private User recipient;

    // --- Người gửi (null nếu là system notification) ---
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sender_id", nullable = true)
    private User sender;

    // ANNOUNCEMENT | HOMEWORK | WORKOUT_PLAN | MEMBERSHIP | BOOKING | SYSTEM
    @Column(name = "type", nullable = false, length = 30)
    private String type;

    @Column(name = "title", nullable = false, length = 200)
    private String title;

    @Column(name = "content", columnDefinition = "TEXT")
    private String content;

    @Column(name = "is_read", nullable = false)
    private Boolean isRead = false;

    @Column(name = "created_at", nullable = false)
    private OffsetDateTime createdAt;

    @PrePersist
    public void prePersist() {
        this.createdAt = OffsetDateTime.now();
    }

    public Notification() {
    }

    public Notification(Long id, User recipient, User sender, String type,
            String title, String content, Boolean isRead, OffsetDateTime createdAt) {
        this.id = id;
        this.recipient = recipient;
        this.sender = sender;
        this.type = type;
        this.title = title;
        this.content = content;
        this.isRead = isRead;
        this.createdAt = createdAt;
    }

    // --- Getters & Setters ---

    public Long getId() {
        return id;
    }

    public User getRecipient() {
        return recipient;
    }

    public void setRecipient(User recipient) {
        this.recipient = recipient;
    }

    public User getSender() {
        return sender;
    }

    public void setSender(User sender) {
        this.sender = sender;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Boolean getIsRead() {
        return isRead;
    }

    public void setIsRead(Boolean isRead) {
        this.isRead = isRead;
    }

    public OffsetDateTime getCreatedAt() {
        return createdAt;
    }
}
