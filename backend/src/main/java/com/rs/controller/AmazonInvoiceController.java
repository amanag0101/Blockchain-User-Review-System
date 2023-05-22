package com.rs.controller;

import com.rs.contract.amazoninvoice.*;
import com.rs.entity.AmazonInvoice;
import com.rs.service.AmazonInvoiceService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.concurrent.CompletionStage;

@RestController
@RequestMapping("/api/v1/amazon-invoice")
@Slf4j
public class AmazonInvoiceController {
    private final AmazonInvoiceService amazonInvoiceService;

    @Autowired
    public AmazonInvoiceController(AmazonInvoiceService amazonInvoiceService) {
        this.amazonInvoiceService = amazonInvoiceService;
    }

    @PostMapping(value = "/add", produces = "application/json")
    CompletionStage<ResponseEntity<AmazonInvoiceResponse>> addAmazonInvoice(@Valid @RequestBody AddAmazonInvoiceRequest addAmazonInvoiceRequest) {
        log.info("Received request to add Amazon Invoice: " + addAmazonInvoiceRequest.toString());
        return amazonInvoiceService.addAmazonInvoice(addAmazonInvoiceRequest)
                .thenApply(this::getAmazonInvoiceResponse)
                .thenApply(ResponseEntity::ok);
    }

    @PostMapping(value = "/verify", produces = "application/json")
    CompletionStage<ResponseEntity<VerifyInvoiceResponse>> verifyInvoice(@Valid @RequestBody VerifyInvoiceRequest verifyInvoiceRequest) {
        log.info("Received request to verify Amazon Invoice: " + verifyInvoiceRequest.toString());
        return amazonInvoiceService.verifyInvoice(verifyInvoiceRequest)
                .thenApply(isVerified -> Boolean.TRUE.equals(isVerified)
                        ? VerifyInvoiceResponse.builder().isValid(true).build()
                        : VerifyInvoiceResponse.builder().isValid(false).build())
                .thenApply(ResponseEntity::ok);
    }

    @PostMapping(value = "/set-used", produces = "application/json")
    CompletionStage<ResponseEntity<AmazonInvoiceResponse>> setInvoiceUsed(@Valid @RequestBody SetInvoiceUsedRequest setInvoiceUsedRequest) {
        log.info("Received request to set invoice as used: " + setInvoiceUsedRequest.toString());
        return amazonInvoiceService.setInvoiceUsed(setInvoiceUsedRequest)
                .thenApply(this::getAmazonInvoiceResponse)
                .thenApply(ResponseEntity::ok);
    }

    @PostMapping(value = "/is-used", produces = "application/json")
    CompletionStage<ResponseEntity<Boolean>> isInvoiceUsed(@Valid @RequestBody SetInvoiceUsedRequest setInvoiceUsedRequest) {
        log.info("Received request to check if the invoice is used or not: " + setInvoiceUsedRequest.toString());
        return amazonInvoiceService.isInvoiceUsed(setInvoiceUsedRequest)
                .thenApply(ResponseEntity::ok);
    }

    private AmazonInvoiceResponse getAmazonInvoiceResponse(AmazonInvoice amazonInvoice) {
        return AmazonInvoiceResponse.builder()
                .id(amazonInvoice.getId())
                .orderNumber(amazonInvoice.getOrderNumber())
                .invoiceNumber(amazonInvoice.getInvoiceNumber())
                .pageLink(amazonInvoice.getPageLink())
                .product(amazonInvoice.getProduct())
                .build();
    }
}
