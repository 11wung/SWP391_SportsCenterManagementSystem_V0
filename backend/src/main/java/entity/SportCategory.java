package entity;

import jakarta.persistence.*;

@Entity
@Table(name = "sport_categories")
public class SportCategory {

    @Id // Khóa chính
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = false, unique = true, length = 100) // tên môn thể thao

    private String name;

    @Column(name = "description", length = 500) // mô tả tóm tắt về môn thể thao
    private String description;

    public SportCategory() {
    }

    public SportCategory(Long id, String name, String description) {
        this.id = id;
        this.name = name;
        this.description = description;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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
}