package com.tcc.ecommerce.dto.response;

import com.tcc.ecommerce.document.Address;
import lombok.Builder;

@Builder
public record CustomerResponse(
        String id,
        String firstName,
        String lastName,
        String dni,
        String phoneNumber,
        String email,
        Address address
) {
}
