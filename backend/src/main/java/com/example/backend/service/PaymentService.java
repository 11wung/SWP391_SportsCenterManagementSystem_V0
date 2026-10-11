package com.example.backend.service;

import com.example.backend.dto.PaymentRequest;
import com.example.backend.dto.PaymentResponse;
import com.example.backend.entity.MemberSubscription;
import com.example.backend.entity.Payment;
import com.example.backend.entity.User;
import com.example.backend.exception.BusinessRuleException;
import com.example.backend.repository.MemberSubscriptionRepository;
import com.example.backend.repository.PaymentRepository;
import com.example.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PaymentService {

    private final PaymentRepository paymentRepository;
    private final MemberSubscriptionRepository subscriptionRepository;
    private final UserRepository userRepository;
    private final MemberSubscriptionService subscriptionService;

    @Transactional
    public PaymentResponse processPayment(PaymentRequest request, String processedByEmail) {
        MemberSubscription sub = subscriptionRepository.findById(request.getSubscriptionId())
                .orElseThrow(() -> new BusinessRuleException("Không tìm thấy gói đăng ký", HttpStatus.NOT_FOUND));

        if (!"PENDING".equals(sub.getStatus())) {
            throw new BusinessRuleException("Gói đăng ký không ở trạng thái PENDING", HttpStatus.BAD_REQUEST);
        }

        User processedBy = null;
        if (processedByEmail != null) {
            processedBy = userRepository.findByEmail(processedByEmail).orElse(null);
        }

        Payment payment = new Payment();
        payment.setSubscription(sub);
        payment.setPayer(sub.getUser());
        payment.setReceivedBy(processedBy);
        payment.setInvoiceNumber("INV-" + System.currentTimeMillis());
        payment.setTransactionCode("TXN-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
        payment.setAmount(request.getAmount());
        payment.setPaymentMethod(request.getPaymentMethod());
        
        payment.setStatus("SUCCESS");
        payment.setPaidAt(OffsetDateTime.now());
        payment.setGatewayResponse("{\"message\": \"Success\"}");

        Payment saved = paymentRepository.save(payment);

        subscriptionService.activateSubscription(sub.getId());

        return mapToResponse(saved);
    }

    @Transactional(readOnly = true)
    public List<PaymentResponse> getAllPayments() {
        return paymentRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    private PaymentResponse mapToResponse(Payment p) {
        return PaymentResponse.builder()
                .id(p.getId())
                .subscriptionId(p.getSubscription() != null ? p.getSubscription().getId() : null)
                .payerId(p.getPayer() != null ? p.getPayer().getId() : null)
                .payerName(p.getPayer() != null ? p.getPayer().getFullName() : "N/A")
                .receivedBy(p.getReceivedBy() != null ? p.getReceivedBy().getFullName() : "Hệ thống")
                .invoiceNumber(p.getInvoiceNumber())
                .transactionCode(p.getTransactionCode())
                .amount(p.getAmount())
                .paymentMethod(p.getPaymentMethod())
                .status(p.getStatus())
                .paidAt(p.getPaidAt())
                .createdAt(p.getCreatedAt())
                .build();
    }
}
