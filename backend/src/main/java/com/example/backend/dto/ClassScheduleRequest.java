package com.example.backend.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalTime;

@Data
public class ClassScheduleRequest {
    @NotNull(message = "Vui lòng chọn phòng tập")
    private Long roomId;

    @NotNull(message = "Vui lòng chọn thứ trong tuần")
    @Min(value = 2, message = "Thứ phải từ 2 đến 8 (8 là Chủ Nhật)")
    @Max(value = 8, message = "Thứ phải từ 2 đến 8 (8 là Chủ Nhật)")
    private Short dayOfWeek;

    @NotNull(message = "Vui lòng nhập giờ bắt đầu")
    private LocalTime startTime;

    @NotNull(message = "Vui lòng nhập giờ kết thúc")
    private LocalTime endTime;
}