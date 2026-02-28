package com.nyaya.dto.petition;

import com.nyaya.model.PetitionType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CreatePetitionRequest {

    @NotNull
    private PetitionType type;

    @NotBlank
    private String content;
}

