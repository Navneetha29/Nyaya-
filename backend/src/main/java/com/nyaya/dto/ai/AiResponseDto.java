package com.nyaya.dto.ai;

import lombok.Builder;
import lombok.Data;

import java.util.Map;

@Data
@Builder
public class AiResponseDto {

    private String summary;
    private Map<String, Object> details;
}

