package com.tcc.ecommerce.dto;

import com.tcc.ecommerce.dto.response.CustomerResponse;
import com.tcc.ecommerce.dto.response.PurchaseResponse;
import com.tcc.ecommerce.utils.enums.PaymentMethod;

import java.math.BigDecimal;
import java.util.List;

public record OrderConfirmation(
        String orderId,
        BigDecimal totalAmount,
        PaymentMethod paymentMethod,
        CustomerResponse customerResponse,
        List<PurchaseResponse> products
) {
}
