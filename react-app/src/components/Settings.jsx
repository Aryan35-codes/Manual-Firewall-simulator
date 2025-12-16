import { useState, useEffect } from 'react'

function Settings() {
    const [rules, setRules] = useState([])
    const [newRule, setNewRule] = useState({
        id: 0, sourceIp: '*', destIp: '*', protocol: 'TCP', port: 80, action: 'ALLOW'
    })

    const fetchRules = () => {
        fetch('http://127.0.0.1:8080/api/rules')
            .then(res => res.json())
            .then(data => setRules(data))
    }

    useEffect(fetchRules, [])

    const addRule = async () => {
        const ruleToAdd = { ...newRule, id: rules.length + 10 } // Simple ID gen
        await fetch('http://localhost:8080/api/rules', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(ruleToAdd)
        })
        fetchRules()
    }

    return (
        <div className="main">
            <header className="top-bar">
                <h2>Settings</h2>
            </header>

            <section className="card">
                <h3>Add Rule</h3>
                <div className="controls-row" style={{ marginTop: '10px' }}>
                    <div className="form-group">
                        <label>Protocol</label>
                        <select value={newRule.protocol} onChange={e => setNewRule({ ...newRule, protocol: e.target.value })}>
                            <option>TCP</option>
                            <option>UDP</option>
                            <option>ICMP</option>
                            <option>HTTP</option>
                            <option>HTTPS</option>
                            <option>SSH</option>
                            <option>FTP</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Port</label>
                        <input type="number" value={newRule.port} onChange={e => setNewRule({ ...newRule, port: parseInt(e.target.value) })} />
                    </div>
                    <div className="form-group">
                        <label>Action</label>
                        <select value={newRule.action} onChange={e => setNewRule({ ...newRule, action: e.target.value })}>
                            <option>ALLOW</option>
                            <option>DENY</option>
                        </select>
                    </div>
                    <div className="form-group" style={{ justifyContent: 'flex-end' }}>
                        <button className="btn btn-start" onClick={addRule}>Add Rule</button>
                    </div>
                </div>
            </section>

            <section className="card" style={{ marginTop: '20px' }}>
                <h3>Active Rules</h3>
                <ul>
                    {rules.map(r => (
                        <li key={r.id} style={{ padding: '8px', borderBottom: '1px solid #333' }}>
                            ID {r.id}: <b>{r.action}</b> {r.protocol} packets to Port {r.port} (Dest: {r.destIp})
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    )
}

export default Settings
