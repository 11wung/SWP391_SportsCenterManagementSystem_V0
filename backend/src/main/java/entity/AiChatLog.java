package entity;

import jakarta.persistence.*;

import java.time.OffsetDateTime;
import jakarta.persistence.PrePersist;

@Entity
@Table(name = "ai_chat_logs") // ánh xah với bảng trong DB
public class AiChatLog {

    @Id // khóa chính
    @GeneratedValue(strategy = GenerationType.IDENTITY) // tự tăng theo kiểu identity
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY) // quan hệ 1-nhiều : nhiều lịch sử chat thì thuộc về 1 user
    @JoinColumn(name = "user_id", nullable = false) // khóa ngoại user_id trỏ sang bảng users(id)
    private User user;

    @Column(name = "question", nullable = false, columnDefinition = "TEXT")
    private String question;

    @Column(name = "answer", columnDefinition = "TEXT")
    private String answer;

    @Column(name = "status", nullable = false, length = 20)
    private String status = "SUCCESS";

    @Column(name = "created_at", nullable = false) // thời điểm gửi tin nhắn
    private OffsetDateTime createdAt;

    @PrePersist // tự động gán thời gian hiện tại khi insert một bản ghi mới
    public void prePersist() {
        if (this.createdAt == null) {
            this.createdAt = OffsetDateTime.now();
        }
    }

    public AiChatLog() {
    }

    public AiChatLog(Long id, User user, String question, String answer, String status, OffsetDateTime createdAt) {
        this.id = id;
        this.user = user;
        this.question = question;
        this.answer = answer;
        this.status = status;
        this.createdAt = createdAt;
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

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
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
}