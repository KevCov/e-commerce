package com.tcc.ecommerce.entity;

import com.tcc.ecommerce.dto.response.ProductResponse;
import com.tcc.ecommerce.utils.enums.PaymentMethod;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Data @NoArgsConstructor @AllArgsConstructor @EqualsAndHashCode @Builder
@EntityListeners(AuditingEntityListener.class)
@Entity @Table(name = "customer_order")
public class Order {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_order")
    private Long id;

    @CreatedDate
    @Column(name = "order_date", updatable = false, nullable = false)
    private LocalDate orderDate;

    @Column(name = "total_amount", nullable = false,  precision = 8, scale = 2)
    private BigDecimal totalAmount;

    @Column(name = "payment_method", nullable = true)
    @Enumerated(EnumType.STRING)
    private PaymentMethod paymentMethod;

    @Column(name = "card_last_4", nullable = false)
    private String cardLast4;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "shipping_id")
    private Shipping shipping;

    @Column(name = "customer_id", nullable = false)
    private String customerId;
}
