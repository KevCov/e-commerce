package com.tcc.ecommerce.dto.request;

import com.tcc.ecommerce.entity.Brand;
import com.tcc.ecommerce.entity.Category;
import com.tcc.ecommerce.utils.enums.Uom;
import jakarta.persistence.*;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import org.springframework.validation.annotation.Validated;

import java.math.BigDecimal;

public record ProductRequest(

        @NotEmpty(message = "Product name is required")
        @Size(min = 1, max = 50)
        String name,

        @NotEmpty(message = "Product description is required")
        String description,

        @NotEmpty(message = "Product large description is required")
        String largedescription,

        @NotEmpty(message = "Country origin is required")
        @Size(min = 1, max = 50)
        String countryOrigin,

        @Positive(message = "Unit price should be positive")
        BigDecimal unitPrice,

        @Positive(message = "Stock should be positive")
        int stock,

        @NotNull(message = "Unit of measurement is required")
        Uom uom,

        BrandRequest brand,

        CategoryRequest category
) {
}
