package com.nyaya.dto.bail;

import com.nyaya.model.BailStatus;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.util.UUID;

@Data
@Builder
public class BailRequestDto {

    private UUID id;
    private UUID caseId;
    private BailStatus status;
    private String courtName;
    private LocalDate hearingDate;
}

