package com.tcc.ecommerce.service;

import com.tcc.ecommerce.dto.PaymentNotificationRequest;
import com.tcc.ecommerce.dto.PaymentRequest;
import com.tcc.ecommerce.entity.Payment;
import com.tcc.ecommerce.repository.PaymentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class PaymentService {

    private final PaymentRepository repository;
    private final PaymentMapper mapper;
    private final PaymentProducer producer;

    public void createPayment(PaymentRequest request) {
        Payment payment = repository.save(mapper.toPayment(request));

        producer.sendNotification(
                PaymentNotificationRequest.builder()
                        .orderId(request.orderId().toString())
                        .amount(request.amount())
                        .paymentMethod(request.paymentMethod())
                        .customerEmail(request.customer().email())
                        .customerFirstName(request.customer().firstName())
                        .customerLastName(request.customer().lastName())
                        .build()
        );
    }
}
