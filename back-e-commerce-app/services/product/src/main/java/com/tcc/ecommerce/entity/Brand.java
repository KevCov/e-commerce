package com.tcc.ecommerce.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.validation.annotation.Validated;

import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity @Table(name = "brand")
public class Brand {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_brand")
    private Long id;

    @Column(name = "name_brand", nullable = false, length = 100)
    private String name;

    @Column(name = "status", nullable = false)
    private boolean status = true;

    @OneToMany(mappedBy = "brand")
    private List<Product> products;
}
