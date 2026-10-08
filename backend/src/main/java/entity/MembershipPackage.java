package entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.OffsetDateTime;

@Entity
@Table(name = "membership_packages") // ánh xạ với bảng
public class MembershipPackage {

    @Id // khóa chính
    @GeneratedValue(strategy = GenerationType.IDENTITY) // tự tăng
    private Long id;

    @Column(name = "code", nullable = false, unique = true, length = 30) // mã gói tập
    private String code;

    @Column(name = "name", nullable = false, unique = true, length = 150) // tên gói tập
    private String name;

    @Column(name = "description", columnDefinition = "TEXT") // mô tả gói tập
    private String description;

    @Column(name = "duration_months", nullable = false) // số tháng của gói tập
    private Short durationMonths;

    @Column(name = "price", nullable = false, precision = 12, scale = 0) // giá của gói tập (VND)
    private BigDecimal price;

    @Column(name = "max_classes_per_week", nullable = false) // số lớp tối đa mỗi tuần
    private Short maxClassesPerWeek;

    @Column(name = "is_active", nullable = false) // trạng thái hoạt động của gói tập
    private Boolean isActive;

    @Column(name = "created_at", nullable = false, columnDefinition = "TIMESTAMP") // ngày tạo
    private OffsetDateTime createdAt;

    @Column(name = "updated_at", columnDefinition = "TIMESTAMP") // ngày cập nhật, có thể null
    private OffsetDateTime updatedAt;

    @PrePersist // tự động gán thời gian khi tạo mới gói

    public void prePersist() {
        OffsetDateTime now = OffsetDateTime.now();
        this.createdAt = now;
        this.updatedAt = now;
    }

    @PreUpdate // tự động gán thời gian khi cập nhật gói
    public void preUpdate() {
        this.updatedAt = OffsetDateTime.now();
    }

    public MembershipPackage() {
    }

    public MembershipPackage(Long id, String code, String name, String description, Short durationMonths,
            BigDecimal price, Short maxClassesPerWeek, Boolean isActive,
            OffsetDateTime createdAt, OffsetDateTime updatedAt) {
        this.id = id;
        this.code = code;
        this.name = name;
        this.description = description;
        this.durationMonths = durationMonths;
        this.price = price;
        this.maxClassesPerWeek = maxClassesPerWeek;
        this.isActive = isActive;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
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

    public Short getDurationMonths() {
        return durationMonths;
    }

    public void setDurationMonths(Short durationMonths) {
        this.durationMonths = durationMonths;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public Short getMaxClassesPerWeek() {
        return maxClassesPerWeek;
    }

    public void setMaxClassesPerWeek(Short maxClassesPerWeek) {
        this.maxClassesPerWeek = maxClassesPerWeek;
    }

    public Boolean getIsActive() {
        return isActive;
    }

    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
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
