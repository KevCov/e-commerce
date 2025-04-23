package com.tcc.ecommerce.dto.request;

import com.tcc.ecommerce.dto.response.CustomerResponse;
import com.tcc.ecommerce.utils.enums.PaymentMethod;

import java.math.BigDecimal;

//Dto para enviar datos del pago al ms-payment
public record PaymentRequest(
        BigDecimal amount,
        PaymentMethod paymentMethod,
        Long orderId,
        CustomerResponse customer
) {
}
