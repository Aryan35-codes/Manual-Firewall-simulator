import { useState, useEffect } from 'react'

function LiveCapture({ isCapturing, setIsCapturing, packets, setPackets }) {
    const [selectedPacketId, setSelectedPacketId] = useState(null)
    const selectedPacket = packets.find(p => p.id === selectedPacketId)

    const saveLog = async () => {
        try {
            await fetch('http://127.0.0.1:8080/api/logs/save', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(packets)
            })
            alert('Log saved successfully!')
        } catch (err) {
            console.error('Failed to save log:', err)
            alert('Failed to save log.')
        }
    }

    return (
        <div className="main">
            <header className="top-bar">
                <div>
                    <h2>Live Capture</h2>
                    <p className="subtitle">Real-time packet filtering</p>
                </div>
                <div className="top-actions">
                    <button className="btn btn-secondary" onClick={saveLog} disabled={packets.length === 0}>Save Log</button>
                    <button className="btn btn-secondary" onClick={() => setPackets([])}>Clear</button>
                </div>
            </header>

            <section className="card controls">
                <div className="controls-row buttons-row" style={{ justifyContent: 'flex-start' }}>
                    {!isCapturing ? (
                        <button className="btn btn-start" onClick={() => setIsCapturing(true)}>Start Capture</button>
                    ) : (
                        <button className="btn btn-stop" onClick={() => setIsCapturing(false)}>Stop Capture</button>
                    )}
                </div>
            </section>

            <section className="card table-card">
                <div className="table-wrapper">
                    <table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Time</th>
                                <th>Source</th>
                                <th>Destination</th>
                                <th>Proto</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {packets.map((packet, index) => (
                                <tr key={packet.id} onClick={() => setSelectedPacketId(packet.id)} style={{ cursor: 'pointer', background: selectedPacketId === packet.id ? '#1e293b' : 'transparent' }}>
                                    <td>{packets.length - index}</td>
                                    <td>{packet.time}</td>
                                    <td>{packet.sourceIp}</td>
                                    <td>{packet.destIp}</td>
                                    <td>{packet.protocol}</td>
                                    <td style={{ color: packet.analysis?.action === 'ALLOW' ? '#4ade80' : '#f87171', fontWeight: 'bold' }}>{packet.analysis?.action}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            <section className="card details-card">
                <h3>Packet Details</h3>
                <pre className="details-box">
                    {selectedPacket ? (
                        `Packet ID: ${selectedPacket.id}
Source: ${selectedPacket.sourceIp}
Destination: ${selectedPacket.destIp}:${selectedPacket.port}
Protocol: ${selectedPacket.protocol}
Payload: ${selectedPacket.payload}

Action: ${selectedPacket.analysis?.action}
Rule Check: ${selectedPacket.analysis?.method}`
                    ) : "Select a packet to view details."}
                </pre>
            </section>
        </div>
    )
}

export default LiveCapture
