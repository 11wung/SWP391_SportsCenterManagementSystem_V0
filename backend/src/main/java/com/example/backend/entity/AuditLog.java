package com.example.backend.entity;

import jakarta.persistence.*;
import java.time.OffsetDateTime;
import jakarta.persistence.PrePersist;

@Entity
@Table(name = "audit_logs") // ánh xạ với bảng trong DB
public class AuditLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // tự tăng theo kiểu identity
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY) // quan hệ nhiều-1: nhiều log có thể gắn với 1 user
    @JoinColumn(name = "user_id", nullable = true) // khóa ngoại user_id có thể NULL (HỆ THỐNG CÓ THỂ TỰ HÀNH ĐỘNG)
    private User user;

    @Column(name = "action", nullable = false, length = 50) // hành động được thực hiện
    private String action;

    @Column(name = "resource", nullable = false, length = 100) // tài nguyên bị tác động (Member,Coach,...)
    private String resource;

    @Column(name = "resource_id", length = 50) // ID của tài nguyên bị tác động (Member,Coach,...)
    private String resourceId;

    @Column(name = "created_at", nullable = false)
    private OffsetDateTime createdAt;

    @PrePersist // tự động gán thời gian hiện tại khi bản ghi được tạo mới
    public void prePersist() {
        this.createdAt = OffsetDateTime.now();
    }

    public AuditLog() {
    }

    public AuditLog(User user, String action, String resource, String resourceId) {
        this.user = user;
        this.action = action;
        this.resource = resource;
        this.resourceId = resourceId;
        this.createdAt = OffsetDateTime.now();
    }

    public Long getId() {
        return id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getAction() {
        return action;
    }

    public void setAction(String action) {
        this.action = action;
    }

    public String getResource() {
        return resource;
    }

    public void setResource(String resource) {
        this.resource = resource;
    }

    public String getResourceId() {
        return resourceId;
    }

    public void setResourceId(String resourceId) {
        this.resourceId = resourceId;
    }

    public OffsetDateTime getCreatedAt() {
        return createdAt;
    }
}
