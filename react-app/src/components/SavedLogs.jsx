import { useState, useEffect } from 'react'

function SavedLogs() {
    const [sessions, setSessions] = useState([])
    const [selectedSession, setSelectedSession] = useState(null)

    useEffect(() => {
        fetch('http://127.0.0.1:8080/api/logs')
            .then(res => res.json())
            .then(data => setSessions(data))
    }, [])

    if (selectedSession) {
        return (
            <div className="main">
                <header className="top-bar">
                    <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                        <button
                            className="btn"
                            onClick={() => setSelectedSession(null)}
                            style={{ padding: "5px 10px" }}
                        >
                            ← Back
                        </button>
                        <div>
                            <h2>Session Details</h2>
                            <p className="subtitle">
                                {new Date(selectedSession.timestamp).toLocaleString()} — {selectedSession.id.substring(0, 8)}
                            </p>
                        </div>
                    </div>
                </header>
                <div className="table-wrapper card">
                    <table>
                        <thead>
                            <tr>
                                <th>Time</th>
                                <th>Source</th>
                                <th>Dest</th>
                                <th>Proto</th>
                                <th>Port</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {selectedSession.packets.map(p => (
                                <tr key={p.id}>
                                    <td>{p.time}</td>
                                    <td>{p.sourceIp}</td>
                                    <td>{p.destIp}</td>
                                    <td>{p.protocol}</td>
                                    <td>{p.port}</td>
                                    <td style={{
                                        color: p.analysis?.action === 'ALLOW' ? '#22c55e' : '#ef4444',
                                        fontWeight: 'bold'
                                    }}>
                                        {p.analysis?.action}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }

    return (
        <div className="main">
            <header className="top-bar">
                <h2>Saved Logs</h2>
            </header>
            <div className="table-wrapper card">
                <table>
                    <thead>
                        <tr>
                            <th>Session ID</th>
                            <th>Time</th>
                            <th>Packet Count</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sessions.map(s => (
                            <tr key={s.id}>
                                <td>{s.id.substring(0, 8)}...</td>
                                <td>{new Date(s.timestamp).toLocaleString()}</td>
                                <td>{s.packetCount}</td>
                                <td>
                                    <button
                                        className="btn-primary"
                                        style={{ padding: "5px 10px", fontSize: "0.85rem" }}
                                        onClick={() => setSelectedSession(s)}
                                    >
                                        View
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default SavedLogs
