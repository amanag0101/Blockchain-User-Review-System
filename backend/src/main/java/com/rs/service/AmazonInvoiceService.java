package com.rs.service;

import com.rs.contract.amazoninvoice.AddAmazonInvoiceRequest;
import com.rs.contract.amazoninvoice.SetInvoiceUsedRequest;
import com.rs.contract.amazoninvoice.VerifyInvoiceRequest;
import com.rs.entity.AmazonInvoice;
import com.rs.entity.Product;
import com.rs.repository.AmazonInvoiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.concurrent.CompletableFuture;

@Service
public class AmazonInvoiceService {
    private final AmazonInvoiceRepository amazonInvoiceRepository;
    private final ProductService productService;

    @Autowired
    public AmazonInvoiceService(AmazonInvoiceRepository amazonInvoiceRepository,
                                ProductService productService) {
        this.amazonInvoiceRepository = amazonInvoiceRepository;
        this.productService = productService;
    }

    public CompletableFuture<AmazonInvoice> addAmazonInvoice(AddAmazonInvoiceRequest addAmazonInvoiceRequest) {
        return productService.getProductById(addAmazonInvoiceRequest.getProductId())
                .thenApply(product -> getAmazonInvoice(addAmazonInvoiceRequest, product))
                .thenApply(amazonInvoiceRepository::save);
    }

    public CompletableFuture<Boolean> verifyInvoice(VerifyInvoiceRequest verifyInvoiceRequest) {
        return CompletableFuture.completedFuture(amazonInvoiceRepository.findByOrderNumberAndInvoiceNumber(
                        verifyInvoiceRequest.getOrderNumber(), verifyInvoiceRequest.getInvoiceNumber()))
                .thenApply(Optional::isPresent);
    }

    public CompletableFuture<AmazonInvoice> setInvoiceUsed(SetInvoiceUsedRequest setInvoiceUsedRequest) {
        return CompletableFuture.completedFuture(amazonInvoiceRepository.findByOrderNumberAndInvoiceNumber(
                        setInvoiceUsedRequest.getOrderNumber(), setInvoiceUsedRequest.getInvoiceNumber()))
                .thenApply(amazonInvoiceOptional -> {
                    if (amazonInvoiceOptional.isPresent()) {
                        AmazonInvoice amazonInvoice = amazonInvoiceOptional.get();
                        amazonInvoice.setUsed(true);
                        return amazonInvoice;
                    }
                    return null;
                })
                .thenApply(amazonInvoiceRepository::save);
    }

    public CompletableFuture<Boolean> isInvoiceUsed(SetInvoiceUsedRequest setInvoiceUsedRequest) {
        return CompletableFuture.completedFuture(amazonInvoiceRepository.findByOrderNumberAndInvoiceNumber(
                        setInvoiceUsedRequest.getOrderNumber(), setInvoiceUsedRequest.getInvoiceNumber()))
                .thenApply(amazonInvoiceOptional -> {
                    if(amazonInvoiceOptional.isPresent()) {
                        AmazonInvoice invoice = amazonInvoiceOptional.get();
                        return invoice.isUsed();
                    }
                    else {
                        throw new RuntimeException("Invoice not present!");
                    }
                });
    }

    private AmazonInvoice getAmazonInvoice(AddAmazonInvoiceRequest addAmazonInvoiceRequest, Product product) {
        return AmazonInvoice.builder()
                .orderNumber(addAmazonInvoiceRequest.getOrderNumber())
                .invoiceNumber(addAmazonInvoiceRequest.getInvoiceNumber())
                .pageLink(addAmazonInvoiceRequest.getPageLink())
                .product(product)
                .build();
    }
}
