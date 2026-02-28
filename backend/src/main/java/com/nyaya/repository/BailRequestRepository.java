package com.nyaya.repository;

import com.nyaya.model.BailRequest;
import com.nyaya.model.BailStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface BailRequestRepository extends JpaRepository<BailRequest, UUID> {

    List<BailRequest> findByLegalCaseId(UUID caseId);

    List<BailRequest> findByStatus(BailStatus status);
}

