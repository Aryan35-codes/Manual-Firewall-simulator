package com.network.sniffer.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Rule {
    private int id;
    private String sourceIp;
    private String destIp;
    private String protocol; // TCP, UDP, ICMP, etc.
    private int port;
    private String action; // ALLOW, DENY
}
