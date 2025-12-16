import { useState, useEffect } from 'react'
import Dashboard from './components/Dashboard'
import LiveCapture from './components/LiveCapture'
import SavedLogs from './components/SavedLogs'
import Settings from './components/Settings'

function App() {
    const [activeView, setActiveView] = useState('dashboard')

    // Hoisted state for Live Capture so it persists across view switching
    const [isCapturing, setIsCapturing] = useState(false)
    const [packets, setPackets] = useState([])

    // Computed stats for Dashboard
    const stats = {
        total: packets.length,
        allowed: packets.filter(p => p.analysis?.action === 'ALLOW').length,
        denied: packets.filter(p => p.analysis?.action === 'DENY').length
    }

    // Packet simulation logic (Global, runs even if on Dashboard)
    useEffect(() => {
        let interval;
        if (isCapturing) {
            interval = setInterval(async () => {
                // Generate realistic traffic pairs
                const trafficTypes = [
                    { proto: 'HTTP', port: 80 },
                    { proto: 'HTTPS', port: 443 },
                    { proto: 'SSH', port: 22 },
                    { proto: 'FTP', port: 21 },
                    { proto: 'DNS', port: 53 },
                    { proto: 'TCP', port: Math.floor(Math.random() * 65535) }, // Random TCP
                    { proto: 'UDP', port: Math.floor(Math.random() * 65535) }, // Random UDP
                    { proto: 'ICMP', port: 0 }
                ];

                const type = trafficTypes[Math.floor(Math.random() * trafficTypes.length)];

                const newPacket = {
                    id: Date.now().toString(),
                    sourceIp: `192.168.1.${Math.floor(Math.random() * 255)}`,
                    // Mix of local and external traffic to match different rules
                    destIp: Math.random() > 0.5
                        ? `192.168.1.${Math.floor(Math.random() * 255)}`
                        : `142.250.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
                    protocol: type.proto,
                    port: type.port,
                    payload: 'Simulated Data'
                }

                try {
                    const res = await fetch('http://127.0.0.1:8080/api/analyze', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(newPacket)
                    })
                    const analysis = await res.json()

                    const processedPacket = {
                        ...newPacket,
                        time: new Date().toLocaleTimeString(),
                        analysis: analysis
                    }

                    setPackets(prev => [processedPacket, ...prev].slice(0, 500)) // Keep last 500
                } catch (err) {
                    console.error("Analysis failed:", err)
                    // Only alert once to avoid spamming
                    if (!window.hasAlertedError) {
                        alert("Backend connection failed! Is the Java server running on port 8080?")
                        window.hasAlertedError = true
                    }
                }
            }, 1000)
        }
        return () => clearInterval(interval)
    }, [isCapturing])

    return (
        <div className="app">
            {/* Sidebar Navigation */}
            <aside className="sidebar">
                <h1 className="logo">Network Sniffer</h1>
                <nav className="menu">
                    <a href="#" className={`menu-item ${activeView === 'dashboard' ? 'active' : ''}`}
                        onClick={() => setActiveView('dashboard')}>
                        Dashboard
                    </a>
                    <a href="#" className={`menu-item ${activeView === 'live' ? 'active' : ''}`}
                        onClick={() => setActiveView('live')}>
                        Live Capture
                    </a>
                    <a href="#" className={`menu-item ${activeView === 'logs' ? 'active' : ''}`}
                        onClick={() => setActiveView('logs')}>
                        Saved Logs
                    </a>
                    <a href="#" className={`menu-item ${activeView === 'settings' ? 'active' : ''}`}
                        onClick={() => setActiveView('settings')}>
                        Settings
                    </a>
                </nav>

                <div className="info-box">
                    <h2>Status</h2>
                    <p>
                        <span className={`status-dot ${isCapturing ? 'status-on' : 'status-off'}`}></span>
                        {isCapturing ? 'Running' : 'Stopped'}
                    </p>
                </div>

                <footer className="footer">
                    <p>Manual Firewall Mode</p>
                </footer>
            </aside>

            {/* Main Content Area */}
            {activeView === 'dashboard' && <Dashboard stats={stats} packets={packets} />}
            {activeView === 'live' && <LiveCapture isCapturing={isCapturing} setIsCapturing={setIsCapturing} packets={packets} setPackets={setPackets} />}
            {activeView === 'logs' && <SavedLogs />}
            {activeView === 'settings' && <Settings />}
        </div>
    )
}

export default App
