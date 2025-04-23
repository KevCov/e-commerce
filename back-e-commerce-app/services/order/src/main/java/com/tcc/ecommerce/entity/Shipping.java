package com.tcc.ecommerce.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Shipping {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_shipping")
    private Long id;

    @Column(name = "customer_id", nullable = false)
    private String customerId;

    @NotEmpty(message = "Department is required")
    @Size(min = 2, max = 100, message = "Department must be between 2 and 100 characters")
    private String department;

    @NotEmpty(message = "Province is required")
    @Size(min = 2, max = 100, message = "Province must be between 2 and 100 characters")
    private String province;

    @NotEmpty(message = "District is required")
    @Size(min = 2, max = 100, message = "District must be between 2 and 100 characters")
    private String district;

    @NotEmpty(message = "Street is required")
    @Size(min = 2, max = 100, message = "Street must be between 2 and 100 characters")
    private String street;

    @Positive(message = "House number must be a positive number")
    private int houseNumber;

    @Positive(message = "Zip code must be a positive number")
    private int zipCode;
}
