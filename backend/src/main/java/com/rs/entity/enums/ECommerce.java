package com.rs.entity.enums;

public enum ECommerce {
    AMAZON("Amazon"),
    FLIPKART("Flipkart");

    private final String name;

    ECommerce(String name) {
        this.name = name;
    }

    public String getName() {
        return this.name;
    }
}
