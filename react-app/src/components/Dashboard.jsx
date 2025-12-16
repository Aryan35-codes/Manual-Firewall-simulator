function Dashboard({ stats, packets }) {
    const recentAllowed = packets.filter(p => p.analysis?.action === 'ALLOW').slice(0, 50);
    const recentDenied = packets.filter(p => p.analysis?.action === 'DENY').slice(0, 50);

    return (
        <div className="main">
            <header className="top-bar">
                <div>
                    <h2>Dashboard</h2>
                    <p className="subtitle">Network Traffic Overview</p>
                </div>
            </header>

            <section className="stats-row">
                <div className="card stat-card">
                    <h3>Total Packets</h3>
                    <p className="stat-number">{stats.total}</p>
                </div>
                <div className="card stat-card">
                    <h3>Allowed</h3>
                    <p className="stat-number" style={{ color: '#22c55e' }}>{stats.allowed}</p>
                </div>
                <div className="card stat-card">
                    <h3>Denied</h3>
                    <p className="stat-number" style={{ color: '#ef4444' }}>{stats.denied}</p>
                </div>
            </section>

            <div className="controls-row" style={{ alignItems: 'flex-start', gap: '15px' }}>
                <section className="card table-card" style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: '300px' }}>
                    <div className="table-header">
                        <h3 style={{ color: '#22c55e' }}>Recent Allowed</h3>
                    </div>
                    <div style={{ overflowY: 'auto', maxHeight: '300px' }}>
                        <table>
                            <thead>
                                <tr>
                                    <th>Source</th>
                                    <th>Proto</th>
                                    <th>Port</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentAllowed.map(p => (
                                    <tr key={p.id}>
                                        <td>{p.sourceIp}</td>
                                        <td>{p.protocol}</td>
                                        <td>{p.port}</td>
                                    </tr>
                                ))}
                                {recentAllowed.length === 0 && <tr><td colSpan="3">No allowed packets yet.</td></tr>}
                            </tbody>
                        </table>
                    </div>
                </section>

                <section className="card table-card" style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: '300px' }}>
                    <div className="table-header">
                        <h3 style={{ color: '#ef4444' }}>Recent Denied</h3>
                    </div>
                    <div style={{ overflowY: 'auto', maxHeight: '300px' }}>
                        <table>
                            <thead>
                                <tr>
                                    <th>Source</th>
                                    <th>Proto</th>
                                    <th>Port</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentDenied.map(p => (
                                    <tr key={p.id}>
                                        <td>{p.sourceIp}</td>
                                        <td>{p.protocol}</td>
                                        <td>{p.port}</td>
                                    </tr>
                                ))}
                                {recentDenied.length === 0 && <tr><td colSpan="3">No denied packets yet.</td></tr>}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>

            <section className="card" style={{ marginTop: '20px' }}>
                <h3>About This Project</h3>
                <p style={{ marginTop: '10px', lineHeight: '1.6', color: '#cbd5e1' }}>
                    This is a <b>Java-Spring Boot</b> powered Firewall System with a modern <b>React</b> frontend.
                    It demonstrates network packet filtering capabilities including Rule-Based Blocking and Traffic Analysis.
                    Designed for the "Network Sniffer" project to showcase full-stack integration and real-time data handling.
                </p>
            </section>

            <section className="card" style={{ marginTop: '20px' }}>
                <h3>How It Works</h3>
                <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-around', textAlign: 'center', alignItems: 'flex-start' }}>
                    <div style={{ flex: 1, padding: '10px' }}>
                        <h4>1. Packet Capture</h4>
                        <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '5px' }}>Traffic captured<br />& sent to backend.</p>
                    </div>
                    <div style={{ flex: 1, padding: '10px' }}>
                        <h4>2. Filtering</h4>
                        <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '5px' }}>Backend scans rules<br />Strict Matching.</p>
                    </div>
                    <div style={{ flex: 1, padding: '10px' }}>
                        <h4>3. Decision</h4>
                        <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '5px' }}>Allow or Deny<br />Real-time Action.</p>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Dashboard
