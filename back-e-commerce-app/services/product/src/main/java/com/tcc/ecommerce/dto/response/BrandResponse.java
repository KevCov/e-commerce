package com.tcc.ecommerce.dto.response;

import lombok.Builder;

@Builder
public record BrandResponse(
        String id,
        String name,
        boolean status
) {
}
