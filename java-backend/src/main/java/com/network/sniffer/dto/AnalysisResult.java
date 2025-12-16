package com.network.sniffer.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AnalysisResult {
    private String action; // ALLOW, DENY
    private int matchedRuleId;
    private String method; // "LINEAR_SCAN" or "DATA_MINING"
    private long timeTakenNanos;
    private boolean predictionCorrect; // For stats
}
