package com.nyaya.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Index;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Table(name = "lawyers", indexes = {
        @Index(name = "idx_lawyers_bar_reg_no", columnList = "bar_registration_number", unique = true),
        @Index(name = "idx_lawyers_verified", columnList = "is_verified")
})
@Getter
@Setter
public class Lawyer extends BaseEntity {

    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private User user;

    @Column(name = "bar_registration_number", nullable = false, length = 100)
    private String barRegistrationNumber;

    @Column(name = "years_of_experience")
    private Integer yearsOfExperience;

    @Column(name = "primary_practice_area", length = 150)
    private String primaryPracticeArea;

    @Column(name = "languages", length = 255)
    private String languages;

    @Column(name = "is_verified", nullable = false)
    private boolean verified = false;
}

