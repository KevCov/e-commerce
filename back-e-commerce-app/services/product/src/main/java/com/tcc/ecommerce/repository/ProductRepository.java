package com.tcc.ecommerce.repository;

import com.tcc.ecommerce.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    @Query(value = "SELECT * FROM product WHERE name_product LIKE %?1%" , nativeQuery = true)
    public List<Product> searchProductsByName(String name);

    @Query("SELECT CASE WHEN COUNT(p) > 0 THEN true ELSE false END FROM Product p WHERE p.name = :name")
    public boolean existsByName(@Param("name") String name);

    @Query(value = "SELECT * FROM product ORDER BY stock DESC LIMIT 3" , nativeQuery = true)
    public List<Product> threeProductsWithOverStock();

}
