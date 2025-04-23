package com.tcc.ecommerce.kafka.order;

import java.math.BigDecimal;

public record Product(
        String id,
        String name,
        String description,
        BigDecimal unitPrice,
        int quantity
) {
}
