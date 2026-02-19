import { useEffect, useState } from 'react';
import API from '../api/api';

export default function Filters({ onApply }) {
  const [agents, setAgents] = useState([]);
  const [status, setStatus] = useState('');
  const [agent, setAgent] = useState('');

  useEffect(() => {
    API.get('/agents')
      .then(res => setAgents(res.data))
      .catch(() => setAgents([]));
  }, []);

  const handleApply = () => {
    onApply({
      ...(status ? { status } : {}),
      ...(agent ? { salesAgent: agent } : {})
    });
  };

  return (
    <div className="filters">
      <select value={status} onChange={e => setStatus(e.target.value)}>
        <option value="">All Statuses</option>
        <option value="New">New</option>
        <option value="Contacted">Contacted</option>
        <option value="Qualified">Qualified</option>
        <option value="Proposal Sent">Proposal Sent</option>
        <option value="Closed">Closed</option>
      </select>

      <select value={agent} onChange={e => setAgent(e.target.value)}>
        <option value="">All Agents</option>
        {agents.map(item => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>

      <button type="button" className="btn-primary" onClick={handleApply}>
        Apply Filters
      </button>
    </div>
  );
}
