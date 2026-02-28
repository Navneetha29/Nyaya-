package com.nyaya.dto.casefile;

import com.nyaya.model.CaseStatus;
import lombok.Builder;
import lombok.Data;

import java.util.UUID;

@Data
@Builder
public class CaseDto {

    private UUID id;
    private UUID userId;
    private UUID assignedLawyerId;
    private String title;
    private String description;
    private CaseStatus status;
    private boolean womenRelated;
}

