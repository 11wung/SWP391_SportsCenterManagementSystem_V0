package entity;

import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity
@Table(name = "coach_profiles") // ánh xạ để bảng trong DB
public class CoachProfile {
    @Id // khóa chính
    @Column(name = "user_id") // khóa chính là cột 'user.id'
    private Long userId;

    @OneToOne
    @MapsId // lấy khóa chính từ user.id gán sang
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "specialty", length = 255)
    private String specialty;

    @Column(name = "year_experience")
    private Short yearsExperience;

    @Column(name = "certification", columnDefinition = "TEXT")
    private String certifications;

    @Column(name = "rating", precision = 2, scale = 1)
    private BigDecimal rating;

    public CoachProfile() {
    }

    public CoachProfile(Long userId, User user, String specialty, Short yearsExperience, String certifications,
            BigDecimal rating) {
        this.userId = userId;
        this.user = user;
        this.specialty = specialty;
        this.yearsExperience = yearsExperience;
        this.certifications = certifications;
        this.rating = rating;
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

    public String getSpecialty() {
        return specialty;
    }

    public void setSpecialty(String specialty) {
        this.specialty = specialty;
    }

    public Short getYearsExperience() {
        return yearsExperience;
    }

    public void setYearsExperience(Short yearsExperience) {
        this.yearsExperience = yearsExperience;
    }

    public String getCertifications() {
        return certifications;
    }

    public void setCertifications(String certifications) {
        this.certifications = certifications;
    }

    public BigDecimal getRating() {
        return rating;
    }

    public void setRating(BigDecimal rating) {
        this.rating = rating;
    }
}
