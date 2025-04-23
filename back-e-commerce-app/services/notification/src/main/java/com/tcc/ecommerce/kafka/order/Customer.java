package com.tcc.ecommerce.kafka.order;

public record Customer(
        String id,
        String firstName,
        String lastName,
        String dni,
        String email
) {
}
