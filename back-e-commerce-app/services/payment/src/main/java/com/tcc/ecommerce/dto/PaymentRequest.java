package com.tcc.ecommerce.dto;

import com.tcc.ecommerce.utils.PaymentMethod;

import java.math.BigDecimal;

public record PaymentRequest(
        BigDecimal amount,
        PaymentMethod paymentMethod,
        Long orderId,
        Customer customer
) {
}
