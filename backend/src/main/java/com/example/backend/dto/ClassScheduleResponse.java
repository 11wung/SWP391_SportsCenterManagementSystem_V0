package com.example.backend.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalTime;

@Data
@Builder
public class ClassScheduleResponse {
    private Long id;
    private Long roomId;
    private String roomName;
    private Short dayOfWeek; // 2 -> 8
    private LocalTime startTime;
    private LocalTime endTime;
}