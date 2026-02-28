package com.nyaya.repository;

import com.nyaya.model.Case;
import com.nyaya.model.CaseStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface CaseRepository extends JpaRepository<Case, UUID> {

    List<Case> findByUserId(UUID userId);

    List<Case> findByAssignedLawyerId(UUID lawyerId);

    List<Case> findByStatus(CaseStatus status);
}

