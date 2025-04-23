package com.tcc.ecommerce.service.mapper;

import com.tcc.ecommerce.dto.request.OrderLineRequest;
import com.tcc.ecommerce.entity.Order;
import com.tcc.ecommerce.entity.OrderLine;
import org.springframework.stereotype.Service;

@Service
public class OrderLineMapper {

    public OrderLine toOrderLine(OrderLineRequest request) {
        return OrderLine.builder()
                .quantity(request.quantity())
                .order(Order.builder().id(request.orderId()).build())
                .productId(request.productId())
                .build();
    }
}
