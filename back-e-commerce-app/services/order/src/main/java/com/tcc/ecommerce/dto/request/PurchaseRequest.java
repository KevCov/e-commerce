package com.tcc.ecommerce.dto.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import org.springframework.validation.annotation.Validated;

@Validated
public record PurchaseRequest(

        @NotNull(message = "Product is mandatory")
        String id,

        @Positive(message = "Quantity must be positive")
        double quantity
) {
}
