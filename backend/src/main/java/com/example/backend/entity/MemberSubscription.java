package com.example.backend.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.OffsetDateTime;

@Entity
@Table(name = "member_subscriptions")
public class MemberSubscription {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "package_id", nullable = false)
    private MembershipPackage membershipPackage;

    @Column(name = "package_name_snapshot", nullable = false, length = 150) // lưu tên gói tại thời điểm mua
    private String packageNameSnapshot;

    @Column(name = "max_classes_per_week_snapshot", nullable = false) // lưu số lớp tối đa mỗi tuần tại thời điểm mua
    private Short maxClassesPerWeekSnapshot;

    @Column(name = "total_amount", nullable = false, precision = 12, scale = 0) // lưu tổng số tiền tại thời điểm mua
    private BigDecimal totalAmount;

    @Column(name = "start_date") // lưu ngày bắt đầu của gói tập
    private LocalDate startDate;

    @Column(name = "end_date") // lưu ngày kết thúc của gói tập
    private LocalDate endDate;

    @Column(name = "status", nullable = false, length = 20) // lưu trạng thái của gói tập
    private String status;

    // mối quan hệ nhân viên tạo đơn
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "created_by", nullable = true) // nullable vì có thể không có nhân viên tạo đơn
    private User createdBy;

    @Column(name = "created_at", nullable = false) // lưu thời điểm tạo đơn gần nhất
    private OffsetDateTime createdAt;

    @Column(name = "updated_at", nullable = false) // lưu thời điểm cập nhật đơn gần nhất
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

    public MemberSubscription() {
    }

    public MemberSubscription(Long id, User user, MembershipPackage membershipPackage, String packageNameSnapshot,
            Short maxClassesPerWeekSnapshot, BigDecimal totalAmount, LocalDate startDate, LocalDate endDate,
            String status, User createdBy, OffsetDateTime createdAt, OffsetDateTime updatedAt) {
        this.id = id;
        this.user = user;
        this.membershipPackage = membershipPackage;
        this.packageNameSnapshot = packageNameSnapshot;
        this.maxClassesPerWeekSnapshot = maxClassesPerWeekSnapshot;
        this.totalAmount = totalAmount;
        this.startDate = startDate;
        this.endDate = endDate;
        this.status = status;
        this.createdBy = createdBy;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public MembershipPackage getMembershipPackage() {
        return membershipPackage;
    }

    public void setMembershipPackage(MembershipPackage membershipPackage) {
        this.membershipPackage = membershipPackage;
    }

    public String getPackageNameSnapshot() {
        return packageNameSnapshot;
    }

    public void setPackageNameSnapshot(String packageNameSnapshot) {
        this.packageNameSnapshot = packageNameSnapshot;
    }

    public Short getMaxClassesPerWeekSnapshot() {
        return maxClassesPerWeekSnapshot;
    }

    public void setMaxClassesPerWeekSnapshot(Short maxClassesPerWeekSnapshot) {
        this.maxClassesPerWeekSnapshot = maxClassesPerWeekSnapshot;
    }

    public BigDecimal getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(BigDecimal totalAmount) {
        this.totalAmount = totalAmount;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public User getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(User createdBy) {
        this.createdBy = createdBy;
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
