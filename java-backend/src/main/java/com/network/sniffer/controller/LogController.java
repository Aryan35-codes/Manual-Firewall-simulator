package com.network.sniffer.controller;

import com.network.sniffer.model.Packet;
import com.network.sniffer.service.LogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/logs")
@CrossOrigin(origins = "*")
public class LogController {

    @Autowired
    private LogService logService;

    @PostMapping("/save")
    public LogService.SavedSession saveSession(@RequestBody List<Packet> packets) {
        return logService.saveSession(packets);
    }

    @GetMapping
    public List<LogService.SavedSession> getSessions() {
        return logService.getSessions();
    }
}
