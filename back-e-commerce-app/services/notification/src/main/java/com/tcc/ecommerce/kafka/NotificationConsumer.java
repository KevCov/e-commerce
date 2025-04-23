package com.tcc.ecommerce.kafka;

import com.tcc.ecommerce.email.EmailService;
import com.tcc.ecommerce.kafka.order.OrderConfirmation;
import com.tcc.ecommerce.kafka.payment.PaymentConfirmation;
import com.tcc.ecommerce.notification.Notification;
import com.tcc.ecommerce.notification.NotificationRepository;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

import static com.tcc.ecommerce.notification.NotificationType.ORDER_CONFIRMATION;
import static com.tcc.ecommerce.notification.NotificationType.PAYMENT_CONFIRMATION;

@Service
@RequiredArgsConstructor
@Slf4j
public class NotificationConsumer {

    private final NotificationRepository repository;
    private final EmailService emailService;

    @KafkaListener(topics = "payment-topic")
    public void consumePaymentNotification(PaymentConfirmation confirmation) throws MessagingException {
        log.info(String.format("Consumiento el mensaje desde payment-topic:: %s", confirmation));

        repository.save(
                Notification.builder()
                        .type(PAYMENT_CONFIRMATION)
                        .dateTime(LocalDateTime.now())
                        .payment(confirmation)
                        .build()
        );

        String customerName = confirmation.customerFirstName() + " " + confirmation.customerLastName();

        emailService.sendPaymentEmail(
                confirmation.customerEmail(),
                customerName,
                confirmation.amount(),
                confirmation.orderId()
        );
    }

    @KafkaListener(topics = "order-topic")
    public void consumeOrderNotification(OrderConfirmation confirmation) throws MessagingException {
        log.info(String.format("Consumiento el mensaje desde order-topic:: %s", confirmation));

        repository.save(
                Notification.builder()
                        .type(ORDER_CONFIRMATION)
                        .dateTime(LocalDateTime.now())
                        .order(confirmation)
                        .build()
        );

        String customerName = confirmation.customerResponse().firstName() + " " + confirmation.customerResponse().lastName();

        emailService.sendOrderEmail(
                confirmation.customerResponse().email(),
                customerName,
                confirmation.totalAmount(),
                confirmation.orderId(),
                confirmation.products()
        );
    }
}
