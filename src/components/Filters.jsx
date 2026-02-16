import { useState } from 'react';

export default function Filter({ onApply }) {
  const [status, setStatus] = useState('');
  const [agent, setAgent] = useState('');

  return (
    <div>
      <select onChange={e => setStatus(e.target.value)}>
        <option value="">Status</option>
        <option value="New">New</option>
        <option value="Qualified">Qualified</option>
        <option value="Closed">Closed</option>
      </select>

      <input
        placeholder="Sales Agent"
        onChange={e => setAgent(e.target.value)}
      />

      <button onClick={() => onApply({ status, salesAgent: agent })}>
        Apply Filters
      </button>
    </div>
  );
}
