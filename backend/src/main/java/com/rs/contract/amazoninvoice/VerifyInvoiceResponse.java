package com.rs.contract.amazoninvoice;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class VerifyInvoiceResponse {
    private boolean isValid;
}
