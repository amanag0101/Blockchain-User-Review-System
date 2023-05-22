package com.rs.contract.amazoninvoice;

import com.rs.entity.Product;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class AmazonInvoiceResponse {
    private Long id;

    private String orderNumber;

    private String invoiceNumber;

    private String pageLink;

    private Product product;
}
