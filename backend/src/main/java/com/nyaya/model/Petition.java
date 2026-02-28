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

@Entity
@Table(name = "petitions", indexes = {
        @Index(name = "idx_petitions_case_id", columnList = "case_id"),
        @Index(name = "idx_petitions_type", columnList = "type")
})
@Getter
@Setter
public class Petition extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "case_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Case legalCase;

    @Enumerated(EnumType.STRING)
    @Column(name = "type", nullable = false, length = 50)
    private PetitionType type;

    @Column(name = "content", nullable = false, columnDefinition = "text")
    private String content;

    @Column(name = "ai_draft", columnDefinition = "text")
    private String aiDraft;
}

