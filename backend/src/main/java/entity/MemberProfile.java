package entity;

import jakarta.persistence.*;
import lombok.Builder;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "member_profiles") // ánh xạ tới bảng DB
@Builder
public class MemberProfile {
    @Id
    @Column(name = "user_id") // ứng với tên trong DB
    private Long userId;

    @OneToOne // quan hệ 1-1 với user
    @MapsId // lấy khóa chính từ User.id
    @JoinColumn(name = "user_id") // 'user.id' vừa làm PK vừa làm FK
    private User user;

    @Column(name = "join_date", nullable = false)
    private LocalDate joinDate = LocalDate.now();

    @Column(name = "height_cm", precision = 5, scale = 2)
    private BigDecimal heightCm;

    @Column(name = "weight_kg", precision = 5, scale = 2)
    private BigDecimal weightKg;

    @Column(name = "fitness_goal", length = 500)
    private String fitnessGoal;

    @Column(name = "membership_tier", length = 30)
    private String membershipTier;

    public MemberProfile() {
    }

    public MemberProfile(Long userId, User user, LocalDate joinDate, BigDecimal heightCm, BigDecimal weightKg,
            String fitnessGoal, String membershipTier) {
        this.userId = userId;
        this.user = user;
        this.joinDate = joinDate;
        this.heightCm = heightCm;
        this.weightKg = weightKg;
        this.fitnessGoal = fitnessGoal;
        this.membershipTier = membershipTier;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public LocalDate getJoinDate() {
        return joinDate;
    }

    public void setJoinDate(LocalDate joinDate) {
        this.joinDate = joinDate;
    }

    public BigDecimal getHeightCm() {
        return heightCm;
    }

    public void setHeightCm(BigDecimal heightCm) {
        this.heightCm = heightCm;
    }

    public BigDecimal getWeightKg() {
        return weightKg;
    }

    public void setWeightKg(BigDecimal weightKg) {
        this.weightKg = weightKg;
    }

    public String getFitnessGoal() {
        return fitnessGoal;
    }

    public void setFitnessGoal(String fitnessGoal) {
        this.fitnessGoal = fitnessGoal;
    }

    public String getMembershipTier() {
        return membershipTier;
    }

    public void setMembershipTier(String membershipTier) {
        this.membershipTier = membershipTier;
    }
}
