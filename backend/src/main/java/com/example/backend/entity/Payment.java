package com.example.backend.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.OffsetDateTime;

/**
 * Ánh xạ bảng payments — lưu thông tin giao dịch thanh toán gói tập.
 *
 * Business rules (thực thi ở DB trigger trg_payments_activate):
 *   BR-PAY-01: subscription chỉ chuyển ACTIVE sau khi payment SUCCESS.
 *   BR-PAY-02: start_date / end_date tự tính khi subscription được kích hoạt.
 */
@Entity
@Table(name = "payments")
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // --- Gói đăng ký được thanh toán ---
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "subscription_id", nullable = false)
    private MemberSubscription subscription;

    // --- Người trả tiền (thành viên) ---
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "payer_id", nullable = false)
    private User payer;

    // --- Nhân viên thu tiền (null nếu thanh toán online) ---
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "received_by", nullable = true)
    private User receivedBy;

    @Column(name = "invoice_number", nullable = false, unique = true, length = 30)
    private String invoiceNumber;

    @Column(name = "transaction_code", nullable = false, unique = true, length = 100)
    private String transactionCode;

    @Column(name = "amount", nullable = false, precision = 12, scale = 0)
    private BigDecimal amount;

    // CASH | BANK_TRANSFER | QR_GATEWAY
    @Column(name = "payment_method", nullable = false, length = 20)
    private String paymentMethod;

    // PENDING | SUCCESS | FAILED | CANCELED | REFUNDED
    @Column(name = "status", nullable = false, length = 20)
    private String status = "PENDING";

    // Thời điểm thanh toán thành công (null nếu chưa SUCCESS)
    @Column(name = "paid_at")
    private OffsetDateTime paidAt;

    // Kết quả thô từ cổng thanh toán (JSON string)
    @Column(name = "gateway_response", columnDefinition = "TEXT")
    private String gatewayResponse;

    @Column(name = "created_at", nullable = false)
    private OffsetDateTime createdAt;

    @PrePersist
    public void prePersist() {
        this.createdAt = OffsetDateTime.now();
    }

    public Payment() {
    }

    public Payment(Long id, MemberSubscription subscription, User payer, User receivedBy,
            String invoiceNumber, String transactionCode, BigDecimal amount,
            String paymentMethod, String status, OffsetDateTime paidAt,
            String gatewayResponse, OffsetDateTime createdAt) {
        this.id = id;
        this.subscription = subscription;
        this.payer = payer;
        this.receivedBy = receivedBy;
        this.invoiceNumber = invoiceNumber;
        this.transactionCode = transactionCode;
        this.amount = amount;
        this.paymentMethod = paymentMethod;
        this.status = status;
        this.paidAt = paidAt;
        this.gatewayResponse = gatewayResponse;
        this.createdAt = createdAt;
    }

    // --- Getters & Setters ---

    public Long getId() {
        return id;
    }

    public MemberSubscription getSubscription() {
        return subscription;
    }

    public void setSubscription(MemberSubscription subscription) {
        this.subscription = subscription;
    }

    public User getPayer() {
        return payer;
    }

    public void setPayer(User payer) {
        this.payer = payer;
    }

    public User getReceivedBy() {
        return receivedBy;
    }

    public void setReceivedBy(User receivedBy) {
        this.receivedBy = receivedBy;
    }

    public String getInvoiceNumber() {
        return invoiceNumber;
    }

    public void setInvoiceNumber(String invoiceNumber) {
        this.invoiceNumber = invoiceNumber;
    }

    public String getTransactionCode() {
        return transactionCode;
    }

    public void setTransactionCode(String transactionCode) {
        this.transactionCode = transactionCode;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public OffsetDateTime getPaidAt() {
        return paidAt;
    }

    public void setPaidAt(OffsetDateTime paidAt) {
        this.paidAt = paidAt;
    }

    public String getGatewayResponse() {
        return gatewayResponse;
    }

    public void setGatewayResponse(String gatewayResponse) {
        this.gatewayResponse = gatewayResponse;
    }

    public OffsetDateTime getCreatedAt() {
        return createdAt;
    }
}
