package com.tcc.ecommerce.dto.response;

import lombok.Builder;

@Builder
public record ProductResponse(
        String id,
        String name,
        String description,
        String quantity,
        String urlImage,
        String unitPrice
) {
}
