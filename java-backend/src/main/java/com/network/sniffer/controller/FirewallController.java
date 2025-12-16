package com.network.sniffer.controller;

import com.network.sniffer.dto.AnalysisResult;
import com.network.sniffer.model.Packet;
import com.network.sniffer.model.Rule;
import com.network.sniffer.service.FirewallService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*") // Allow React Frontend to access
public class FirewallController {

    @Autowired
    private FirewallService firewallService;

    @PostMapping("/analyze")
    public AnalysisResult analyzePacket(@RequestBody Packet packet) {
        return firewallService.analyzePacket(packet);
    }

    @GetMapping("/rules")
    public List<Rule> getRules() {
        return firewallService.getRules();
    }

    @PostMapping("/rules")
    public void addRule(@RequestBody Rule rule) {
        firewallService.addRule(rule);
    }
}
