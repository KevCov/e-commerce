package com.tcc.ecommerce.notification;

import com.tcc.ecommerce.kafka.order.OrderConfirmation;
import com.tcc.ecommerce.kafka.payment.PaymentConfirmation;
import lombok.*;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.LocalDateTime;


@Builder
@Getter
@Setter
@Document
@AllArgsConstructor
@NoArgsConstructor
public class Notification {

    @Id
    private ObjectId id;

    private NotificationType type;

    private LocalDateTime dateTime;

    @Field(name = "order_confirmation")
    private OrderConfirmation order;

    @Field(name = "payment_confirmation")
    private PaymentConfirmation payment;
}
