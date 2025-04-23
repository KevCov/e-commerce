package com.tcc.ecommerce.dto.request;

public record OrderLineRequest(
        Long orderId,
        String productId,
        double quantity
) {
}
