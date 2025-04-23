package com.tcc.ecommerce.service.mapper;

import com.tcc.ecommerce.dto.request.OrderRequest;
import com.tcc.ecommerce.dto.response.OrderResponse;
import com.tcc.ecommerce.dto.response.ProductResponse;
import com.tcc.ecommerce.entity.Order;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderMapper {

    public Order toOrder(OrderRequest request) {
        return Order.builder()
                .customerId(request.customerId())
                .totalAmount(request.totalAmount())
                .cardLast4(request.cardLast4())
                .shipping(request.shipping())
                .paymentMethod(request.paymentMethod())
                .build();
    }

    public OrderResponse toOrderResponse(Order order, List<ProductResponse> productsResponse) {
        return OrderResponse.builder()
                .id(order.getId().toString())
                .totalAmount(order.getTotalAmount())
                .paymentMethod(order.getPaymentMethod())
                .cardLast4(order.getCardLast4())
                .shipping(order.getShipping())
                .orderDate(order.getOrderDate())
                .products(productsResponse)
                .customerId(order.getCustomerId())
                .build();

    }
}
