package com.tcc.ecommerce.entity;

import com.tcc.ecommerce.utils.enums.Uom;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

//TODO AGREGAR CAMPO SPECIFICATIONS
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity @Table(name = "product")
public class Product {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_product")
    private Long id;

    @Column(name = "name_product", nullable = false, length = 120)
    private String name;

    @Column(name = "description", nullable = false, columnDefinition = "TEXT")
    private String description;

    @Column(name = "country_origin", nullable = true, length = 50)
    private String countryOrigin;

    @Column(name = "unit_price", nullable = false, precision = 8, scale = 2)
    private BigDecimal unitPrice;

    @Column(name = "stock", nullable = true)
    private int stock;

    @Column(name = "uom", nullable = false)
    @Enumerated(EnumType.STRING)
    private Uom uom;

    @Column(name = "url_image", nullable = true, length = 100)
    private String urlImage;

    @ManyToOne(cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    @JoinColumn(name = "id_brand", nullable = false)
    private Brand brand;

    @ManyToOne(cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    @JoinColumn(name = "id_category", nullable = false)
    private Category category;
}
