package com.rs.contract.product;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class ProductResponse {
    private Long id;

    private String brand;

    private String name;

    private String description;

    private Double mrp;
}
