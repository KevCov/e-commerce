package com.tcc.ecommerce.dto.request;

import com.tcc.ecommerce.entity.Product;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import org.springframework.validation.annotation.Validated;

import java.util.List;

@Validated
public record BrandRequest(

        String id,

        @NotEmpty(message = "Brand name is required")
        @Size(min = 1, max = 100)
        String name
) {
}
