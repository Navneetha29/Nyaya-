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
@Table(name = "women_support_cases", indexes = {
        @Index(name = "idx_wsc_user_id", columnList = "user_id"),
        @Index(name = "idx_wsc_emergency", columnList = "is_emergency"),
        @Index(name = "idx_wsc_category", columnList = "category")
})
@Getter
@Setter
public class WomenSupportCase extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private User user;

    @Column(name = "is_anonymous", nullable = false)
    private boolean anonymous;

    @Column(name = "is_emergency", nullable = false)
    private boolean emergency;

    @Enumerated(EnumType.STRING)
    @Column(name = "category", nullable = false, length = 50)
    private WomenSupportCategory category;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false, length = 30)
    private WomenSupportStatus status = WomenSupportStatus.OPEN;

    @Column(name = "summary", nullable = false, columnDefinition = "text")
    private String summary;

    @Column(name = "structured_question_responses", columnDefinition = "jsonb")
    private String structuredQuestionResponses;
}

