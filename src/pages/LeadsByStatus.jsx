import { useEffect, useMemo, useState } from 'react';
import DashboardLayout from '../layout/DashboardLayout';
import API from '../api/api';
import '../styles/leads.css';

export default function LeadsByStatus() {
  const [leads, setLeads] = useState([]);
  const [status, setStatus] = useState('');
  const [agent, setAgent] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    const filters = new URLSearchParams({
      ...(status ? { status } : {}),
      ...(agent ? { salesAgent: agent } : {})
    }).toString();

    API.get(`/leads?${filters}`)
      .then(res => setLeads(res.data.data))
      .catch(() => setLeads([]));
  }, [status, agent]);

  const sortedLeads = useMemo(() => {
    return [...leads].sort((a, b) => {
      if (sortOrder === 'desc') return b.timeToClose - a.timeToClose;
      return a.timeToClose - b.timeToClose;
    });
  }, [leads, sortOrder]);

  return (
    <DashboardLayout>
      <div className="leads-header">
        <h2>Leads by Status</h2>
      </div>

      <div className="leads-toolbar">
        <select value={status} onChange={event => setStatus(event.target.value)}>
          <option value="">All Statuses</option>
          <option value="New">New</option>
          <option value="Contacted">Contacted</option>
          <option value="Qualified">Qualified</option>
          <option value="Proposal Sent">Proposal Sent</option>
          <option value="Closed">Closed</option>
        </select>

        <input
          placeholder="Sales Agent Name"
          value={agent}
          onChange={event => setAgent(event.target.value)}
        />

        <select value={sortOrder} onChange={event => setSortOrder(event.target.value)}>
          <option value="asc">Sort: Time to Close (Low to High)</option>
          <option value="desc">Sort: Time to Close (High to Low)</option>
        </select>
      </div>

      <div className="leads-list">
        {sortedLeads.map(lead => (
          <div key={lead._id} className="lead-row">
            <div className="lead-info">
              <h4>{lead.name}</h4>
              <div className="lead-meta">
                Agent: {lead.salesAgent?.name || 'Unassigned'} | Time to Close: {lead.timeToClose} days
              </div>
            </div>
            <span className={`badge ${lead.status.toLowerCase()}`}>{lead.status}</span>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
