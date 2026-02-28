package com.nyaya.repository;

import com.nyaya.model.Lawyer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface LawyerRepository extends JpaRepository<Lawyer, UUID> {

    Optional<Lawyer> findByUserId(UUID userId);

    Optional<Lawyer> findByBarRegistrationNumber(String barRegistrationNumber);

    List<Lawyer> findByVerifiedTrue();
}

