package com.tcc.ecommerce.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import org.springframework.validation.annotation.Validated;

@Validated
public record CategoryRequest(

        String id,

        @NotEmpty(message = "Category name is required")
        @Size(min = 1, max = 50)
        String name
) {
}
