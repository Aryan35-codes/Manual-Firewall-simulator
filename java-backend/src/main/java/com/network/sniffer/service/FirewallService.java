package com.network.sniffer.service;

import com.network.sniffer.dto.AnalysisResult;
import com.network.sniffer.model.Packet;
import com.network.sniffer.model.Rule;
import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.List;

@Service
public class FirewallService {

    private List<Rule> rules = new ArrayList<>();
    private Rule defaultRule = new Rule(0, "*", "*", "*", 0, "DENY");

    private static final double ALLOW_PROBABILITY = 0.3; // 30% chance to allow if no rule matches

    @PostConstruct
    public void init() {
        // Seed some sample rules
        addRule(new Rule(1, "*", "*", "TCP", 80, "ALLOW")); // HTTP (Any Dest)
        addRule(new Rule(2, "*", "*", "TCP", 443, "ALLOW")); // HTTPS (Any Dest)
        addRule(new Rule(3, "*", "*", "UDP", 53, "ALLOW")); // DNS (Any Source/Dest)
        addRule(new Rule(4, "*", "*", "TCP", 22, "ALLOW")); // SSH (Any Dest)
        addRule(new Rule(5, "*", "*", "TCP", 21, "ALLOW")); // FTP (Any Dest)
        addRule(new Rule(6, "*", "*", "ICMP", 0, "DENY")); // Ping
        addRule(new Rule(7, "*", "*", "HTTP", 8080, "ALLOW")); // Alt HTTP
        // Added broader rules
        addRule(new Rule(8, "*", "*", "TCP", 3000, "ALLOW")); // React Dev Server
        addRule(new Rule(9, "*", "*", "UDP", 123, "ALLOW")); // NTP
        addRule(new Rule(10, "*", "*", "TCP", 8000, "ALLOW")); // Alt Dev Port
    }

    public void addRule(Rule rule) {
        rules.add(rule);
    }

    public List<Rule> getRules() {
        return rules;
    }

    /**
     * Manual Mode: Strict Linear Scan
     */
    public AnalysisResult analyzePacket(Packet packet) {
        long startTime = System.nanoTime();

        // Strict Linear Scan
        AnalysisResult result = linearScan(packet);

        long duration = System.nanoTime() - startTime;
        result.setTimeTakenNanos(duration);
        result.setMethod("MANUAL_RULE_CHECK");
        result.setPredictionCorrect(true); // N/A in manual mode
        return result;
    }

    private AnalysisResult linearScan(Packet packet) {
        for (Rule rule : rules) {
            if (matches(packet, rule)) {
                return new AnalysisResult(rule.getAction(), rule.getId(), "MANUAL_RULE_CHECK", 0, true);
            }
        }

        // Randomly accept some traffic if no rule matches
        if (Math.random() < ALLOW_PROBABILITY) {
            return new AnalysisResult("ALLOW", 0, "RANDOM_ALLOW", 0, true);
        }

        return new AnalysisResult(defaultRule.getAction(), defaultRule.getId(), "DEFAULT_DENY", 0, true);
    }

    // Matcher Logic
    private boolean matches(Packet p, Rule r) {
        boolean ipMatch = r.getDestIp().equals("*") || r.getDestIp().equals(p.getDestIp());
        boolean protoMatch = r.getProtocol().equals("*") || r.getProtocol().equalsIgnoreCase(p.getProtocol());
        boolean portMatch = r.getPort() == 0 || r.getPort() == p.getPort();
        // Ignoring source IP for simplicity in this demo matcher
        return ipMatch && protoMatch && portMatch;
    }
}
