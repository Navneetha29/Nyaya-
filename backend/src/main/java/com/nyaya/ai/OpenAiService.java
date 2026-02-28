package com.nyaya.ai;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.nyaya.dto.ai.AiResponseDto;
import com.nyaya.model.BailRequest;
import com.nyaya.model.Case;
import com.nyaya.model.WomenSupportCase;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;
import reactor.core.publisher.Mono;
import reactor.util.retry.Retry;

import java.time.Duration;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class OpenAiService implements AiService {

    private final ObjectMapper objectMapper;

    @Value("${nyaya.ai.openai-api-key:}")
    private String apiKey;

    @Value("${nyaya.ai.model:gpt-4.1-mini}")
    private String model;

    @Value("${nyaya.ai.timeout-seconds:20}")
    private long timeoutSeconds;

    private WebClient webClient() {
        return WebClient.builder()
                .baseUrl("https://api.openai.com/v1/chat/completions")
                .defaultHeader(HttpHeaders.AUTHORIZATION, "Bearer " + apiKey)
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .build();
    }

    @Override
    public AiResponseDto generateCaseInsights(Case legalCase) {
        Map<String, Object> prompt = new HashMap<>();
        prompt.put("type", "CASE_INSIGHTS");
        prompt.put("title", legalCase.getTitle());
        prompt.put("description", legalCase.getDescription());
        prompt.put("womenRelated", legalCase.isWomenRelated());

        return callOpenAi(prompt);
    }

    @Override
    public AiResponseDto generateBailEligibilitySummary(BailRequest bailRequest) {
        Map<String, Object> prompt = new HashMap<>();
        prompt.put("type", "BAIL_ELIGIBILITY");
        prompt.put("courtName", bailRequest.getCourtName());
        prompt.put("hearingDate", bailRequest.getHearingDate());

        return callOpenAi(prompt);
    }

    @Override
    public AiResponseDto generatePetitionDraft(String petitionContext) {
        Map<String, Object> prompt = new HashMap<>();
        prompt.put("type", "PETITION_DRAFT");
        prompt.put("context", petitionContext);

        return callOpenAi(prompt);
    }

    @Override
    public AiResponseDto generateWomenSupportLegalSummary(WomenSupportCase womenSupportCase) {
        Map<String, Object> prompt = new HashMap<>();
        prompt.put("type", "WOMEN_SUPPORT_SUMMARY");
        prompt.put("summary", womenSupportCase.getSummary());
        prompt.put("category", womenSupportCase.getCategory().name());
        prompt.put("emergency", womenSupportCase.isEmergency());
        prompt.put("structuredQuestionResponses", womenSupportCase.getStructuredQuestionResponses());

        return callOpenAi(prompt);
    }

    private AiResponseDto callOpenAi(Map<String, Object> structuredPrompt) {
        if (apiKey == null || apiKey.isBlank()) {
            log.warn("OpenAI API key not configured; returning empty AI response");
            return AiResponseDto.builder()
                    .summary(null)
                    .details(Map.of())
                    .build();
        }

        Map<String, Object> request = Map.of(
                "model", model,
                "messages", List.of(
                        Map.of(
                                "role", "system",
                                "content", "You are a legal assistant. Respond with concise JSON only."
                        ),
                        Map.of(
                                "role", "user",
                                "content", toJson(structuredPrompt)
                        )
                ),
                "response_format", Map.of("type", "json_object")
        );

        try {
            Map<String, Object> response = webClient()
                    .post()
                    .bodyValue(request)
                    .retrieve()
                    .bodyToMono(Map.class)
                    .timeout(Duration.ofSeconds(timeoutSeconds))
                    .retryWhen(Retry.backoff(2, Duration.ofSeconds(2))
                            .filter(throwable -> throwable instanceof WebClientResponseException &&
                                    ((WebClientResponseException) throwable).getStatusCode().is5xxServerError()))
                    .onErrorResume(ex -> {
                        log.error("OpenAI call failed: {}", ex.getMessage());
                        return Mono.just(Map.<String, Object>of());
                    })
                    .block();

            if (response == null || response.isEmpty()) {
                return AiResponseDto.builder()
                        .summary(null)
                        .details(Map.of())
                        .build();
            }

            Map<String, Object> choices = ((List<Map<String, Object>>) response.get("choices")).get(0);
            Map<String, Object> message = (Map<String, Object>) choices.get("message");
            String content = (String) message.get("content");

            Map<String, Object> parsed = parseJson(content);

            String summary = (String) parsed.getOrDefault("summary", null);
            return AiResponseDto.builder()
                    .summary(summary)
                    .details(parsed)
                    .build();
        } catch (Exception ex) {
            log.error("OpenAI integration error: {}", ex.getMessage());
            return AiResponseDto.builder()
                    .summary(null)
                    .details(Map.of())
                    .build();
        }
    }

    private String toJson(Map<String, Object> data) {
        try {
            return objectMapper.writeValueAsString(data);
        } catch (Exception ex) {
            throw new IllegalStateException("Failed to serialize AI prompt", ex);
        }
    }

    private Map<String, Object> parseJson(String content) {
        try {
            return objectMapper.readValue(content, new TypeReference<Map<String, Object>>() {
            });
        } catch (Exception ex) {
            log.error("Failed to parse AI JSON response: {}", ex.getMessage());
            return Map.of("raw", content);
        }
    }
}

