package com.nyaya.repository;

import com.nyaya.model.WomenSupportCase;
import com.nyaya.model.WomenSupportCategory;
import com.nyaya.model.WomenSupportStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface WomenSupportCaseRepository extends JpaRepository<WomenSupportCase, UUID> {

    List<WomenSupportCase> findByUserId(UUID userId);

    List<WomenSupportCase> findByCategory(WomenSupportCategory category);

    List<WomenSupportCase> findByStatus(WomenSupportStatus status);
}

