package com.nyaya.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Index;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Table(name = "lawyer_case_assignments", indexes = {
        @Index(name = "idx_lca_lawyer_id", columnList = "lawyer_id"),
        @Index(name = "idx_lca_case_id", columnList = "case_id")
})
@Getter
@Setter
public class LawyerCaseAssignment extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "lawyer_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Lawyer lawyer;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "case_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Case legalCase;

    @Column(name = "is_primary", nullable = false)
    private boolean primary = true;
}

