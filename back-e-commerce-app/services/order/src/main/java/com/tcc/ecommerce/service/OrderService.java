package com.tcc.ecommerce.service;

import com.tcc.ecommerce.client.PaymentClient;
import com.tcc.ecommerce.client.ProductClient;
import com.tcc.ecommerce.dto.OrderConfirmation;
import com.tcc.ecommerce.dto.request.OrderLineRequest;
import com.tcc.ecommerce.dto.request.OrderRequest;
import com.tcc.ecommerce.dto.request.PaymentRequest;
import com.tcc.ecommerce.dto.response.*;
import com.tcc.ecommerce.entity.Order;
import com.tcc.ecommerce.http_errors.exceptions.NotFoundException;
import com.tcc.ecommerce.repository.OrderRepository;
import com.tcc.ecommerce.client.CustomerClient;
import com.tcc.ecommerce.service.mapper.OrderMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class OrderService {

    private final OrderRepository repository;
    private final CustomerClient customerClient;
    private final ProductClient productClient;
    private final OrderMapper mapper;
    private final OrderLineService orderLineService;
    private final OrderProducer orderProducer;
    private final PaymentClient paymentClient;

    public Long createOrder(OrderRequest request) {
        //Revisar el id del cliente
        CustomerResponse customer = this.customerClient
                .findCustomerById(request.customerId())
                .orElseThrow(() -> new NotFoundException("No se encontro al cliente con ID: " + request.customerId()));

        log.info("Se encontro al cliente {} {}", customer.firstName(), customer.lastName());

        //Enviar la lista de products al servicio product
        List<PurchaseResponse> purchasedProducts = this.productClient.purchaseProducts(request.products());

        log.info("Se desconto el stock de los productos: [{}]", purchasedProducts.stream().map(PurchaseResponse::name).toList());

        //Persistir orden
        Order order = this.repository.saveAndFlush(mapper.toOrder(request));

        log.info("Se persistio la orden: {}", order.toString());

        //Persistir orden line
        for (PurchaseResponse purchaseResponse : purchasedProducts){
            orderLineService.saveOrderLine(
                    new OrderLineRequest(
                            order.getId(),
                            purchaseResponse.id(),
                            purchaseResponse.quantity()
                    )
            );
        }

        //Empezar payment service
        paymentClient.requestOrderPayment(
                new PaymentRequest(
                        order.getTotalAmount(),
                        order.getPaymentMethod(),
                        order.getId(),
                        customer
                )
        );

        //Enviar la confirmacion de la orden ---> Notification service (kafka)
        orderProducer.sendOrderConfirmation(
                new OrderConfirmation(
                        order.getId().toString(),
                        order.getTotalAmount(),
                        order.getPaymentMethod(),
                        customer,
                        purchasedProducts
                )
        );

        return order.getId();
    }

    public List<OrderResponse> findAll() {
        List<Order> orders = repository.findAll();
        if (orders.isEmpty())
            return Collections.emptyList();

        return orders.stream().map((o) -> {
            List<ProductResponse> products = repository.getProductsByOrder(o.getId());

            return mapper.toOrderResponse(o, products);
        }).toList();
    }

    public OrderResponse findById(Long id) {
        List<ProductResponse> products = repository.getProductsByOrder(id);
        return mapper.toOrderResponse(
                repository.findById(id).orElseThrow(
                        () -> new NotFoundException(String.format("La Orden con el id %d no fue encontrada", id))
                ), products
        );
    }

    public List<OrderResponse> getAllOrdersByUser(String userId) {
        //obtener ordenes del usuario
        List<Order> orders = repository.getOrdersByUserId(userId);

        if (orders.isEmpty()) {
            return Collections.emptyList();
        }

        List<OrderResponse> ordersResp = orders.stream().map((o) -> {
            List<ProductResponse> products = repository.getProductsByOrder(o.getId());

            return mapper.toOrderResponse(o, products);
        }).toList();

        return ordersResp;
    }
}