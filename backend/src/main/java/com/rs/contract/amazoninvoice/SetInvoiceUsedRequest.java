package com.rs.contract.amazoninvoice;

import lombok.Data;
import lombok.ToString;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
@ToString
public class SetInvoiceUsedRequest {
    @NotNull
    @NotBlank
    private String invoiceNumber;

    @NotNull
    @NotBlank
    private String orderNumber;
}
