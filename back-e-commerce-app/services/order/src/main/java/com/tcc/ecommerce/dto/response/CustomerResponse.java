package com.tcc.ecommerce.dto.response;

public record CustomerResponse(
        String id,
        String firstName,
        String lastName,
        String dni,
        String email
) {
}
