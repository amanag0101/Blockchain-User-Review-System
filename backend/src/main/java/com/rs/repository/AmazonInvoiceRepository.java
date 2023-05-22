package com.rs.repository;

import com.rs.entity.AmazonInvoice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AmazonInvoiceRepository extends JpaRepository<AmazonInvoice, Long> {
    Optional<AmazonInvoice> findByOrderNumberAndInvoiceNumber(String orderNumber, String invoiceNumber);
}
