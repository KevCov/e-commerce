package com.tcc.ecommerce.kafka.order;

import com.tcc.ecommerce.kafka.payment.PaymentMethod;

import java.math.BigDecimal;
import java.util.List;

public record OrderConfirmation(
        String orderId,
        BigDecimal totalAmount,
        PaymentMethod paymentMethod,
        Customer customerResponse,
        List<Product> products
) {
}
