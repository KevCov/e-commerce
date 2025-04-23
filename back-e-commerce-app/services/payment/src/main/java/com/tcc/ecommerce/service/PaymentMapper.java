package com.tcc.ecommerce.service;

import com.tcc.ecommerce.dto.PaymentRequest;
import com.tcc.ecommerce.entity.Payment;
import org.springframework.stereotype.Service;

@Service
public class PaymentMapper {

    public Payment toPayment(PaymentRequest request) {
        return Payment.builder()
                .orderId(request.orderId())
                .paymentMethod(request.paymentMethod())
                .amount(request.amount())
                .build();
    }
}
