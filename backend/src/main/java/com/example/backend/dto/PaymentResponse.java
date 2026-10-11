package com.example.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.OffsetDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PaymentResponse {
    private Long id;
    private Long subscriptionId;
    private Long payerId;
    private String payerName;
    private String receivedBy;
    private String invoiceNumber;
    private String transactionCode;
    private BigDecimal amount;
    private String paymentMethod;
    private String status;
    private OffsetDateTime paidAt;
    private OffsetDateTime createdAt;
}
