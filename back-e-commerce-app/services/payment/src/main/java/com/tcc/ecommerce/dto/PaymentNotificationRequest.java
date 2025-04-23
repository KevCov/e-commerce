package com.tcc.ecommerce.dto;

import com.tcc.ecommerce.utils.PaymentMethod;
import lombok.Builder;

import java.math.BigDecimal;

@Builder
public record PaymentNotificationRequest(
        String orderId,
        BigDecimal amount,
        PaymentMethod paymentMethod,
        String customerFirstName,
        String customerLastName,
        String customerEmail
) {
}
