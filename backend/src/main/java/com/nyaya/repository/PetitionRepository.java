package com.nyaya.repository;

import com.nyaya.model.Petition;
import com.nyaya.model.PetitionType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface PetitionRepository extends JpaRepository<Petition, UUID> {

    List<Petition> findByLegalCaseId(UUID caseId);

    List<Petition> findByType(PetitionType type);
}

