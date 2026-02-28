package com.nyaya.dto.ai;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class PetitionDraftRequest {

    @NotBlank
    private String context;
}

