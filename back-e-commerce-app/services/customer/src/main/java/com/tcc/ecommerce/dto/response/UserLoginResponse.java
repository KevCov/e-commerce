package com.tcc.ecommerce.dto.response;

import com.tcc.ecommerce.utils.Role;
import lombok.Builder;

@Builder
public record UserLoginResponse(
        String email,
        String password,
        Role role,
        boolean accountNonExpired,
        boolean accountNonLocked
) {
}
