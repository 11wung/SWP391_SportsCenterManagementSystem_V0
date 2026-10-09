package com.example.backend.entity;

import jakarta.persistence.*;
import java.time.OffsetDateTime;

/**
 * Ánh xạ bảng support_requests — yêu cầu hỗ trợ từ thành viên.
 * Receptionist tiếp nhận và xử lý.
 *
 * status: OPEN | IN_PROGRESS | RESOLVED | CLOSED
 */
@Entity
@Table(name = "support_requests")
public class SupportRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // --- Thành viên gửi yêu cầu ---
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    private User member;

    // --- Lễ tân xử lý (null nếu chưa có ai nhận) ---
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "handled_by", nullable = true)
    private User handledBy;

    @Column(name = "subject", nullable = false, length = 200)
    private String subject;

    @Column(name = "content", nullable = false, columnDefinition = "TEXT")
    private String content;

    // OPEN | IN_PROGRESS | RESOLVED | CLOSED
    @Column(name = "status", nullable = false, length = 20)
    private String status = "OPEN";

    @Column(name = "created_at", nullable = false)
    private OffsetDateTime createdAt;

    @Column(name = "resolved_at")
    private OffsetDateTime resolvedAt;

    @PrePersist
    public void prePersist() {
        this.createdAt = OffsetDateTime.now();
    }

    public SupportRequest() {
    }

    public SupportRequest(Long id, User member, User handledBy, String subject,
            String content, String status, OffsetDateTime createdAt, OffsetDateTime resolvedAt) {
        this.id = id;
        this.member = member;
        this.handledBy = handledBy;
        this.subject = subject;
        this.content = content;
        this.status = status;
        this.createdAt = createdAt;
        this.resolvedAt = resolvedAt;
    }

    // --- Getters & Setters ---

    public Long getId() {
        return id;
    }

    public User getMember() {
        return member;
    }

    public void setMember(User member) {
        this.member = member;
    }

    public User getHandledBy() {
        return handledBy;
    }

    public void setHandledBy(User handledBy) {
        this.handledBy = handledBy;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
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

    public OffsetDateTime getResolvedAt() {
        return resolvedAt;
    }

    public void setResolvedAt(OffsetDateTime resolvedAt) {
        this.resolvedAt = resolvedAt;
    }
}
