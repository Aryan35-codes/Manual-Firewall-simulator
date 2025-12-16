package com.network.sniffer.service;

import com.network.sniffer.model.Packet;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import lombok.Data;
import lombok.AllArgsConstructor;

@Service
public class LogService {

    @Data
    @AllArgsConstructor
    public static class SavedSession {
        private String id;
        private LocalDateTime timestamp;
        private int packetCount;
        private List<Packet> packets;
    }

    private List<SavedSession> sessions = new ArrayList<>();

    public SavedSession saveSession(List<Packet> packets) {
        SavedSession session = new SavedSession(
                UUID.randomUUID().toString(),
                LocalDateTime.now(),
                packets.size(),
                new ArrayList<>(packets) // Copy
        );
        sessions.add(session);
        return session;
    }

    public List<SavedSession> getSessions() {
        return sessions;
    }
}
