package com.rs.controller;

import com.rs.contract.product.AddProductRequest;
import com.rs.contract.product.ProductResponse;
import com.rs.entity.Product;
import com.rs.service.ProductService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.concurrent.CompletionStage;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/product")
@Slf4j
public class ProductController {
    private final ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping(value = "/get-all", produces = "application/json")
    CompletionStage<ResponseEntity<List<ProductResponse>>> getAllProducts() {
        log.info("Received request to get all the products");
        return productService.getAllProducts()
                .thenApply(products -> products.stream()
                        .map(this::getProductResponse)
                        .collect(Collectors.toList()))
                .thenApply(ResponseEntity::ok);
    }

    @PostMapping(value = "/add", produces = "application/json")
    CompletionStage<ResponseEntity<ProductResponse>> addAmazonInvoice(@Valid @RequestBody AddProductRequest addProductRequest) {
        log.info("Received request to add Product: " + addProductRequest.toString());
        return productService.addProduct(addProductRequest)
                .thenApply(this::getProductResponse)
                .thenApply(ResponseEntity::ok);
    }

    private ProductResponse getProductResponse(Product product) {
        return ProductResponse.builder()
                .id(product.getId())
                .brand(product.getBrand())
                .name(product.getName())
                .description(product.getDescription())
                .mrp(product.getMrp())
                .build();
    }
}
