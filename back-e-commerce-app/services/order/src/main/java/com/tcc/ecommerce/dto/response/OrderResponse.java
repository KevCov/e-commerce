package com.tcc.ecommerce.dto.response;

import com.tcc.ecommerce.entity.Shipping;
import com.tcc.ecommerce.utils.enums.PaymentMethod;
import lombok.Builder;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Builder
public record OrderResponse(
        String id,
        BigDecimal totalAmount,
        LocalDate orderDate,
        PaymentMethod paymentMethod,
        String cardLast4,
        Shipping shipping,
        String customerId,
        List<ProductResponse> products
) {
}
