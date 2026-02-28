package com.nyaya.dto.bail;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.time.LocalDate;

@Data
public class CreateBailRequest {

    @NotBlank
    @Size(max = 255)
    private String courtName;

    private LocalDate hearingDate;
}

