package com.rs.service;

import com.rs.contract.product.AddProductRequest;
import com.rs.entity.Product;
import com.rs.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.CompletableFuture;

@Service
public class ProductService {
    private final ProductRepository productRepository;

    @Autowired
    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public CompletableFuture<List<Product>> getAllProducts() {
        return CompletableFuture.completedFuture(productRepository.findAll());
    }

    public CompletableFuture<Product> getProductById(Long productId) {
        return CompletableFuture.completedFuture(productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("No Product found with id: " + productId)));
    }

    public CompletableFuture<Product> addProduct(AddProductRequest addProductRequest) {
        return CompletableFuture.completedFuture(getProduct(addProductRequest))
                .thenApply(productRepository::save);
    }

    private Product getProduct(AddProductRequest addProductRequest) {
        return Product.builder()
                .brand(addProductRequest.getBrand())
                .name(addProductRequest.getName())
                .description(addProductRequest.getDescription())
                .mrp(addProductRequest.getMrp())
                .build();
    }
}
