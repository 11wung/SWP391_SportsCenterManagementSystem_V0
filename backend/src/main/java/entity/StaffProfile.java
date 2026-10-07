package entity;

import jakarta.persistence.*;

@Entity
@Table(name = "staff_profiles") // ánh xạ để bảng trong DB
public class StaffProfile {
    @Id // khóa chính
    @Column(name = "user_id") // khóa chính là cột 'user.id'
    private Long userId;

    @OneToOne
    @MapsId // lấy khóa chính từ user.id gán sang
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "job_title", length = 100)
    private String jobTitle;

    @Column(name = "shift_schedule", length = 255)
    private String shiftSchedule;

    public StaffProfile() {
    }

    public StaffProfile(Long userId, User user, String jobTitle, String shiftSchedule) {
        this.userId = userId;
        this.user = user;
        this.jobTitle = jobTitle;
        this.shiftSchedule = shiftSchedule;
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

    public String getJobTitle() {
        return jobTitle;
    }

    public void setJobTitle(String jobTitle) {
        this.jobTitle = jobTitle;
    }

    public String getShiftSchedule() {
        return shiftSchedule;
    }

    public void setShiftSchedule(String shiftSchedule) {
        this.shiftSchedule = shiftSchedule;
    }

}
