package com.rs.contract.amazoninvoice;

import lombok.Data;
import lombok.ToString;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
@ToString
public class VerifyInvoiceRequest {
    @NotNull
    @NotBlank
    private String productName;

    @NotNull
    @NotBlank
    private String orderNumber;

    @NotNull
    @NotBlank
    private String invoiceNumber;
}
