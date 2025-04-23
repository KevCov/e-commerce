package com.tcc.ecommerce.dto.request;

import lombok.Builder;

@Builder
public record ShippingRequest(
        String customerId,
        String department,
        String province,
        String district,
        String street,
        int houseNumber,
        int zipCode
) {
}
