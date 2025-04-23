package com.tcc.ecommerce.dto.response;

import lombok.Builder;

import java.math.BigDecimal;

@Builder
public record ProductPurchaseResponse(
        String id,
        String name,
        String description,
        BigDecimal unitPrice,
        int quantity
) {
}
