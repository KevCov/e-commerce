package com.tcc.ecommerce.dto.response;

import java.math.BigDecimal;

public record PurchaseResponse(
        String id,
        String name,
        String description,
        BigDecimal unitPrice,
        int quantity
) {
}
