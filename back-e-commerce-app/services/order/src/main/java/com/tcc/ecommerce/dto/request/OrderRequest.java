package com.tcc.ecommerce.dto.request;

import com.tcc.ecommerce.entity.Shipping;
import com.tcc.ecommerce.utils.enums.PaymentMethod;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import org.springframework.validation.annotation.Validated;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

//Dto para generar una orden
public record OrderRequest(

        @Positive(message = "Order amount must be positive")
        BigDecimal totalAmount,

        @NotNull(message = "Payment method can not be null")
        PaymentMethod paymentMethod,

        @NotNull(message = "El customer id no puede ser nullo")
        String customerId,

        @NotNull(message = "Los ultimos 4 digitos de la tarjeta no pueden ser nullo")
        String cardLast4,

        @NotNull(message = "El shipping id no puede ser nullo")
        Shipping shipping,

        @NotEmpty(message = "You should at least purchase one product")
        List<PurchaseRequest> products
) {
}
