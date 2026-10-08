package com.example.backend.entity;

import jakarta.persistence.*;

import java.time.LocalTime;

@Entity
@Table(name = "class_schedules")
public class ClassSchedule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // --- lịch học này thuộc về Lớp nào ---
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "class_id", nullable = false)
    private SportClass sportClass;

    // --- học tại Phòng nào ---
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id", nullable = false)
    private FacilityRoom room;

    @Column(name = "day_of_week", nullable = false) // thứ mấy trong tuần
    private Short dayOfWeek;

    @Column(name = "start_time", nullable = false) // giờ bắt đầu
    private LocalTime startTime;

    @Column(name = "end_time", nullable = false) // giờ kết thúc
    private LocalTime endTime;

    public ClassSchedule() {
    }

    public ClassSchedule(Long id, SportClass sportClass, FacilityRoom room, Short dayOfWeek, LocalTime startTime,
            LocalTime endTime) {
        this.id = id;
        this.sportClass = sportClass;
        this.room = room;
        this.dayOfWeek = dayOfWeek;
        this.startTime = startTime;
        this.endTime = endTime;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public SportClass getSportClass() {
        return sportClass;
    }

    public void setSportClass(SportClass sportClass) {
        this.sportClass = sportClass;
    }

    public FacilityRoom getRoom() {
        return room;
    }

    public void setRoom(FacilityRoom room) {
        this.room = room;
    }

    public Short getDayOfWeek() {
        return dayOfWeek;
    }

    public void setDayOfWeek(Short dayOfWeek) {
        this.dayOfWeek = dayOfWeek;
    }

    public LocalTime getStartTime() {
        return startTime;
    }

    public void setStartTime(LocalTime startTime) {
        this.startTime = startTime;
    }

    public LocalTime getEndTime() {
        return endTime;
    }

    public void setEndTime(LocalTime endTime) {
        this.endTime = endTime;
    }
}