// Simple client-side firewall rules for demo mode
const firewallRules = [
    {
        id: 1,
        name: 'Block SSH from external',
        protocol: 'SSH',
        port: 22,
        sourcePattern: /^(?!192\.168\.)/,
        action: 'DENY',
        reason: 'SSH blocked from external networks'
    },
    {
        id: 2,
        name: 'Allow HTTP',
        protocol: 'HTTP',
        port: 80,
        action: 'ALLOW',
        reason: 'HTTP traffic allowed'
    },
    {
        id: 3,
        name: 'Allow HTTPS',
        protocol: 'HTTPS',
        port: 443,
        action: 'ALLOW',
        reason: 'HTTPS traffic allowed'
    },
    {
        id: 4,
        name: 'Block FTP',
        protocol: 'FTP',
        port: 21,
        action: 'DENY',
        reason: 'FTP is insecure and blocked'
    },
    {
        id: 5,
        name: 'Allow DNS',
        protocol: 'DNS',
        port: 53,
        action: 'ALLOW',
        reason: 'DNS queries allowed'
    }
]

export function analyzePacket(packet) {
    // Check each rule
    for (const rule of firewallRules) {
        // Match protocol
        if (rule.protocol && packet.protocol !== rule.protocol) {
            continue
        }

        // Match port
        if (rule.port && packet.port !== rule.port) {
            continue
        }

        // Match source pattern if exists
        if (rule.sourcePattern && !rule.sourcePattern.test(packet.sourceIp)) {
            continue
        }

        // Rule matched
        return {
            action: rule.action,
            matchedRule: rule.name,
            reason: rule.reason,
            ruleId: rule.id
        }
    }

    // Default: allow if no rule matches
    return {
        action: 'ALLOW',
        matchedRule: 'Default Policy',
        reason: 'No specific rule matched, default allow',
        ruleId: 0
    }
}
