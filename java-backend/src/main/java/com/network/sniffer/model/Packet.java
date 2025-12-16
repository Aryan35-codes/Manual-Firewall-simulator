package com.network.sniffer.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Packet {
    private String id; // Frame number or UUID
    private String sourceIp;
    private String destIp;
    private String protocol;
    private int port;
    private String payload;
    private String time;
    private com.network.sniffer.dto.AnalysisResult analysis;
}
