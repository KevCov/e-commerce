package com.tcc.ecommerce.user;

public record UserResponse(
        String email,
        String password,
        Role role,
        boolean accountNonExpired,
        boolean accountNonLocked
) {
}
