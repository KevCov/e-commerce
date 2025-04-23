package com.tcc.ecommerce.dto.response;

import lombok.Builder;

@Builder
public record ShippingResponse(
        String id,
        String customerId,
        String department,
        String province,
        String district,
        String street,
        int houseNumber,
        int zipCode
) {
}
