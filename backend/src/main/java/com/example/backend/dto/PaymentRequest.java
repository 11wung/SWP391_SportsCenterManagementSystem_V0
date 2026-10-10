package com.example.backend.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;
import java.math.BigDecimal;

@Data
public class PaymentRequest {
    @NotNull(message = "ID gói đăng ký không được để trống")
    private Long subscriptionId;

    @NotNull(message = "Số tiền thanh toán không được để trống")
    private BigDecimal amount;

    @NotNull(message = "Phương thức thanh toán không được trống (CASH, BANK_TRANSFER, QR)")
    private String paymentMethod;
}
