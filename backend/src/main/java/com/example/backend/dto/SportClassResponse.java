
package com.example.backend.dto;

import java.time.OffsetDateTime;

import com.example.backend.entity.SportClass;

public class SportClassResponse {

    private Long id;
    private Long categoryId;
    private String categoryName;
    private Long coachId;
    private String coachName;
    private String name;
    private String description;
    private String level;
    private Integer maxCapacity;
    private String status;
    private OffsetDateTime createdAt;
    private OffsetDateTime updatedAt;

    public SportClassResponse(SportClass sportClass) {
        this.id = sportClass.getId();
        this.categoryId = sportClass.getCategory().getId();
        this.categoryName = sportClass.getCategory().getName();
        this.coachId = sportClass.getCoach().getId();
        this.coachName = sportClass.getCoach().getFullName();
        this.name = sportClass.getName();
        this.description = sportClass.getDescription();
        this.level = sportClass.getLevel();
        this.maxCapacity = sportClass.getMaxCapacity();
        this.status = sportClass.getStatus();
        this.createdAt = sportClass.getCreatedAt();
        this.updatedAt = sportClass.getUpdatedAt();
    }

    public Long getId() { return id; }
    public Long getCategoryId() { return categoryId; }
    public String getCategoryName() { return categoryName; }
    public Long getCoachId() { return coachId; }
    public String getCoachName() { return coachName; }
    public String getName() { return name; }
    public String getDescription() { return description; }
    public String getLevel() { return level; }
    public Integer getMaxCapacity() { return maxCapacity; }
    public String getStatus() { return status; }
    public OffsetDateTime getCreatedAt() { return createdAt; }
    public OffsetDateTime getUpdatedAt() { return updatedAt; }
}
