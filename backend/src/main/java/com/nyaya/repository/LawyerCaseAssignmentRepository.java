package com.nyaya.repository;

import com.nyaya.model.LawyerCaseAssignment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface LawyerCaseAssignmentRepository extends JpaRepository<LawyerCaseAssignment, UUID> {

    List<LawyerCaseAssignment> findByLawyerId(UUID lawyerId);

    List<LawyerCaseAssignment> findByLegalCaseId(UUID caseId);
}

