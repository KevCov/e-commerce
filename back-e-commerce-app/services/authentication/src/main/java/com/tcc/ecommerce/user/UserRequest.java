package com.tcc.ecommerce.user;

public record UserRequest(
        String email,
        String password
) {
}
