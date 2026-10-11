
package com.example.backend.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class SportClassRequest {

    @NotNull(message = "Vui lòng chọn môn thể thao")
    private Long categoryId;

    @NotNull(message = "Vui lòng chọn huấn luyện viên")
    private Long coachId;

    @NotBlank(message = "Tên lớp không được để trống")
    @Size(max = 150, message = "Tên lớp tối đa 150 ký tự")
    private String name;

    private String description;

    @NotBlank(message = "Vui lòng chọn trình độ")
    private String level = "BEGINNER";

    @NotNull(message = "Sức chứa không được để trống")
    @Min(value = 1, message = "Sức chứa tối thiểu là 1")
    @Max(value = 1000, message = "Sức chứa tối đa là 1000")
    private Integer maxCapacity;

    private String status = "ACTIVE";

    public Long getCategoryId() { return categoryId; }
    public void setCategoryId(Long categoryId) { this.categoryId = categoryId; }

    public Long getCoachId() { return coachId; }
    public void setCoachId(Long coachId) { this.coachId = coachId; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getLevel() { return level; }
    public void setLevel(String level) { this.level = level; }

    public Integer getMaxCapacity() { return maxCapacity; }
    public void setMaxCapacity(Integer maxCapacity) { this.maxCapacity = maxCapacity; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
