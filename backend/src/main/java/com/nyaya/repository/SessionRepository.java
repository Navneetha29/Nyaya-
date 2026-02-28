package com.nyaya.repository;

import com.nyaya.model.Session;
import com.nyaya.model.SessionStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface SessionRepository extends JpaRepository<Session, UUID> {

    Optional<Session> findByRefreshToken(String refreshToken);

    List<Session> findByUserIdAndStatus(UUID userId, SessionStatus status);

    long deleteByExpiresAtBefore(OffsetDateTime cutoff);
}

