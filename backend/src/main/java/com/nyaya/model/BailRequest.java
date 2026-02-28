package com.nyaya.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.Index;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.LocalDate;

@Entity
@Table(name = "bail_requests", indexes = {
        @Index(name = "idx_bail_requests_case_id", columnList = "case_id"),
        @Index(name = "idx_bail_requests_status", columnList = "status")
})
@Getter
@Setter
public class BailRequest extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "case_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Case legalCase;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false, length = 30)
    private BailStatus status = BailStatus.PENDING;

    @Column(name = "court_name", length = 255)
    private String courtName;

    @Column(name = "hearing_date")
    private LocalDate hearingDate;

    @Column(name = "ai_summary", columnDefinition = "text")
    private String aiSummary;
}

