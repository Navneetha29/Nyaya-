package com.nyaya.service;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.nyaya.dto.auth.AuthRequest;
import com.nyaya.dto.auth.AuthResponse;
import com.nyaya.dto.auth.RefreshTokenRequest;
import com.nyaya.dto.auth.RegisterRequest;
import com.nyaya.exception.BadRequestException;
import com.nyaya.exception.NotFoundException;
import com.nyaya.model.Lawyer;
import com.nyaya.model.Role;
import com.nyaya.model.Session;
import com.nyaya.model.SessionStatus;
import com.nyaya.model.User;
import com.nyaya.repository.LawyerRepository;
import com.nyaya.repository.SessionRepository;
import com.nyaya.repository.UserRepository;
import com.nyaya.security.JwtService;
import com.nyaya.security.UserPrincipal;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.OffsetDateTime;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final LawyerRepository lawyerRepository;
    private final SessionRepository sessionRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    @Transactional
    public AuthResponse register(RegisterRequest request, String ip, String userAgent) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new BadRequestException("Email already registered");
        }

        User user = new User();
        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());
        user.setPhone(request.getPhone());
        user.setPasswordHash(passwordEncoder.encode(request.getPassword()));
        user.setRole(request.getRole());

        if (request.getFirebaseIdToken() != null && !request.getFirebaseIdToken().isBlank()) {
            String firebaseUid = verifyFirebaseToken(request.getFirebaseIdToken());
            user.setFirebaseUid(firebaseUid);
        }

        user = userRepository.save(user);

        if (request.getRole() == Role.LAWYER) {
            Lawyer lawyer = new Lawyer();
            lawyer.setUser(user);
            lawyer.setBarRegistrationNumber("PENDING_VERIFICATION");
            lawyerRepository.save(lawyer);
        }

        return buildAuthResponse(user, createSession(user, ip, userAgent));
    }

    @Transactional
    public AuthResponse login(AuthRequest request, String ip, String userAgent) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        UserPrincipal principal = (UserPrincipal) authentication.getPrincipal();
        User user = userRepository.findById(principal.getId())
                .orElseThrow(() -> new NotFoundException("User not found"));

        if (request.getFirebaseIdToken() != null && !request.getFirebaseIdToken().isBlank()) {
            String firebaseUid = verifyFirebaseToken(request.getFirebaseIdToken());
            user.setFirebaseUid(firebaseUid);
            userRepository.save(user);
        }

        return buildAuthResponse(user, createSession(user, ip, userAgent));
    }

    @Transactional
    public AuthResponse refreshToken(RefreshTokenRequest request, String ip, String userAgent) {
        Session session = sessionRepository.findByRefreshToken(request.getRefreshToken())
                .orElseThrow(() -> new BadRequestException("Invalid refresh token"));

        if (session.getStatus() != SessionStatus.ACTIVE || session.getExpiresAt().isBefore(OffsetDateTime.now())) {
            throw new BadRequestException("Refresh token expired");
        }

        User user = session.getUser();
        return buildAuthResponse(user, session);
    }

    private Session createSession(User user, String ip, String userAgent) {
        String subject = user.getEmail();
        String refreshToken = jwtService.generateRefreshToken(subject, user.getRole());
        OffsetDateTime expiresAt = OffsetDateTime.now().plusSeconds(60L * 60 * 24 * 30);

        Session session = new Session();
        session.setUser(user);
        session.setRefreshToken(refreshToken);
        session.setExpiresAt(expiresAt);
        session.setStatus(SessionStatus.ACTIVE);
        session.setIpAddress(ip);
        session.setUserAgent(userAgent);

        return sessionRepository.save(session);
    }

    private AuthResponse buildAuthResponse(User user, Session session) {
        String subject = user.getEmail();
        String accessToken = jwtService.generateAccessToken(subject, user.getRole());

        return AuthResponse.builder()
                .accessToken(accessToken)
                .refreshToken(session.getRefreshToken())
                .tokenType("Bearer")
                .expiresIn(900L)
                .userId(user.getId())
                .fullName(user.getFullName())
                .email(user.getEmail())
                .role(user.getRole())
                .build();
    }

    private String verifyFirebaseToken(String idToken) {
        try {
            return FirebaseAuth.getInstance().verifyIdToken(idToken).getUid();
        } catch (FirebaseAuthException ex) {
            log.warn("Failed to verify Firebase ID token: {}", ex.getMessage());
            throw new BadRequestException("Invalid Firebase ID token");
        }
    }
}

