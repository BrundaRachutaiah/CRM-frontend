import { useState } from 'react';

export default function Filters({ onApply }) {
  const [status, setStatus] = useState('');
  const [agent, setAgent] = useState('');

  const handleApply = () => {
    onApply({
      ...(status ? { status } : {}),
      ...(agent.trim() ? { salesAgent: agent.trim() } : {})
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

      <input
        placeholder="Sales Agent"
        value={agent}
        onChange={e => setAgent(e.target.value)}
      />

      <button type="button" className="btn-primary" onClick={handleApply}>
        Apply Filters
      </button>
    </div>
  );
}
