package com.tcc.ecommerce.dto.request;

import com.tcc.ecommerce.document.Address;
import com.tcc.ecommerce.document.UserLogin;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;

public record CustomerRequest(
        @NotEmpty(message = "First name is requiered")
        @Size(min = 2, max = 50, message = "First name must be between 2 and 50 characters")
        String firstName,

        @NotEmpty(message = "Last name is requiered")
        @Size(min = 2, max = 50, message = "Last name must be between 2 and 50 characters")
        String lastName,

        @NotEmpty(message = "Dni is requiered")
        @Size(min = 8, max = 8, message = "Dni must be 8 digits")
        String dni,

        @NotEmpty(message = "Phone number is requiered")
        @Size(min = 9, max = 9, message = "Phone number must be 8 digits")
        String phoneNumber,

        @Valid
        UserLogin userLogin,

        @Valid
        Address address
) {
}
