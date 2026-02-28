package com.nyaya.service;

import com.nyaya.dto.lawyer.LawyerDto;
import com.nyaya.exception.NotFoundException;
import com.nyaya.model.Lawyer;
import com.nyaya.repository.LawyerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LawyerService {

    private final LawyerRepository lawyerRepository;

    @Transactional(readOnly = true)
    public LawyerDto getByUserId(UUID userId) {
        Lawyer lawyer = lawyerRepository.findByUserId(userId)
                .orElseThrow(() -> new NotFoundException("Lawyer profile not found"));
        return toDto(lawyer);
    }

    @Transactional(readOnly = true)
    public List<LawyerDto> getVerifiedLawyers() {
        return lawyerRepository.findByVerifiedTrue()
                .stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public LawyerDto verifyLawyer(UUID lawyerId, boolean verified) {
        Lawyer lawyer = lawyerRepository.findById(lawyerId)
                .orElseThrow(() -> new NotFoundException("Lawyer not found"));
        lawyer.setVerified(verified);
        return toDto(lawyerRepository.save(lawyer));
    }

    private LawyerDto toDto(Lawyer lawyer) {
        return LawyerDto.builder()
                .id(lawyer.getId())
                .userId(lawyer.getUser().getId())
                .fullName(lawyer.getUser().getFullName())
                .barRegistrationNumber(lawyer.getBarRegistrationNumber())
                .yearsOfExperience(lawyer.getYearsOfExperience())
                .primaryPracticeArea(lawyer.getPrimaryPracticeArea())
                .verified(lawyer.isVerified())
                .build();
    }
}

