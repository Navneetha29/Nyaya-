package com.nyaya.dto.petition;

import com.nyaya.model.PetitionType;
import lombok.Builder;
import lombok.Data;

import java.util.UUID;

@Data
@Builder
public class PetitionDto {

    private UUID id;
    private UUID caseId;
    private PetitionType type;
    private String content;
}

