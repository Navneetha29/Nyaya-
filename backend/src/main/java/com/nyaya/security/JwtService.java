package com.nyaya.security;

import com.nyaya.model.Role;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.time.Instant;
import java.util.Date;
import java.util.Map;
import java.util.function.Function;

@Component
public class JwtService {

    @Value("${nyaya.security.jwt.secret}")
    private String secret;

    @Value("${nyaya.security.jwt.access-token-seconds:900}")
    private long accessTokenSeconds;

    @Value("${nyaya.security.jwt.refresh-token-seconds:2592000}")
    private long refreshTokenSeconds;

    @Value("${nyaya.security.jwt.issuer:nyaya-backend}")
    private String issuer;

    public String generateAccessToken(String subject, Role role) {
        return generateToken(subject, role, accessTokenSeconds, "access");
    }

    public String generateRefreshToken(String subject, Role role) {
        return generateToken(subject, role, refreshTokenSeconds, "refresh");
    }

    public <T> T extractClaim(String token, Function<Claims, T> resolver) {
        Claims claims = parseClaims(token);
        return resolver.apply(claims);
    }

    public String extractSubject(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public boolean isTokenType(String token, String type) {
        String tokenType = extractClaim(token, claims -> claims.get("typ", String.class));
        return type.equals(tokenType);
    }

    public boolean isTokenExpired(String token) {
        Date expiration = extractClaim(token, Claims::getExpiration);
        return expiration.before(new Date());
    }

    public boolean isValid(String token, String expectedSubject) {
        String subject = extractSubject(token);
        return expectedSubject.equals(subject) && !isTokenExpired(token);
    }

    private String generateToken(String subject, Role role, long seconds, String type) {
        Instant now = Instant.now();
        Instant expiry = now.plusSeconds(seconds);
        return Jwts.builder()
                .setSubject(subject)
                .setIssuer(issuer)
                .setIssuedAt(Date.from(now))
                .setExpiration(Date.from(expiry))
                .claim("role", role.name())
                .claim("typ", type)
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    private Claims parseClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    private Key getSigningKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secret);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}

