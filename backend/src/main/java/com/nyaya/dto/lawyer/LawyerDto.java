package com.nyaya.dto.lawyer;

import lombok.Builder;
import lombok.Data;

import java.util.UUID;

@Data
@Builder
public class LawyerDto {

    private UUID id;
    private UUID userId;
    private String fullName;
    private String barRegistrationNumber;
    private Integer yearsOfExperience;
    private String primaryPracticeArea;
    private boolean verified;
}

