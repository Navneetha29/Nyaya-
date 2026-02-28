package com.nyaya.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.nyaya.dto.ErrorResponse;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.time.Instant;
import java.util.ArrayDeque;
import java.util.Deque;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Slf4j
@Component
@RequiredArgsConstructor
public class RateLimitingFilter extends OncePerRequestFilter {

    private final ObjectMapper objectMapper;

    @Value("${nyaya.security.ratelimit.window-seconds:60}")
    private long windowSeconds;

    @Value("${nyaya.security.ratelimit.max-requests:5}")
    private int maxRequests;

    private final Map<String, Deque<Instant>> requestStore = new ConcurrentHashMap<>();

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        String path = request.getServletPath();
        return !(path.startsWith("/api/v1/auth/login") || path.startsWith("/api/v1/auth/refresh")
                || path.startsWith("/api/v1/ai"));
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        String key = buildKey(request);
        Instant now = Instant.now();

        Deque<Instant> deque = requestStore.computeIfAbsent(key, k -> new ArrayDeque<>());

        synchronized (deque) {
            while (!deque.isEmpty() && deque.peekFirst().isBefore(now.minusSeconds(windowSeconds))) {
                deque.pollFirst();
            }

            if (deque.size() >= maxRequests) {
                log.warn("Rate limit exceeded for key {}", key);
                response.setStatus(HttpServletResponse.SC_TOO_MANY_REQUESTS);
                response.setContentType(MediaType.APPLICATION_JSON_VALUE);
                ErrorResponse body = ErrorResponse.of("RATE_LIMIT_EXCEEDED", "Too many requests, please try again later");
                objectMapper.writeValue(response.getOutputStream(), body);
                return;
            }

            deque.addLast(now);
        }

        filterChain.doFilter(request, response);
    }

    private String buildKey(HttpServletRequest request) {
        String ip = request.getRemoteAddr();
        String path = request.getServletPath();
        return ip + ":" + path;
    }
}

