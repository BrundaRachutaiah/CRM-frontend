import { useEffect, useMemo, useState } from 'react';
import DashboardLayout from '../layout/DashboardLayout';
import API from '../api/api';
import '../styles/leads.css';

export default function LeadsByAgent() {
  const [agents, setAgents] = useState([]);
  const [leads, setLeads] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState('');
  const [status, setStatus] = useState('');
  const [priority, setPriority] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    API.get('/agents')
      .then(res => setAgents(res.data))
      .catch(() => setAgents([]));
  }, []);

  useEffect(() => {
    const filters = new URLSearchParams({
      ...(selectedAgent ? { salesAgent: selectedAgent } : {}),
      ...(status ? { status } : {})
    }).toString();

    API.get(`/leads?${filters}`)
      .then(res => setLeads(res.data.data))
      .catch(() => setLeads([]));
  }, [selectedAgent, status]);

  const filteredLeads = useMemo(() => {
    const priorityFiltered = priority
      ? leads.filter(lead => lead.priority === priority)
      : leads;

    return [...priorityFiltered].sort((a, b) => {
      if (sortOrder === 'desc') return b.timeToClose - a.timeToClose;
      return a.timeToClose - b.timeToClose;
    });
  }, [leads, priority, sortOrder]);

  return (
    <DashboardLayout>
      <div className="leads-header">
        <h2>Leads by Sales Agent</h2>
      </div>

      <div className="leads-toolbar">
        <select
          value={selectedAgent}
          onChange={event => setSelectedAgent(event.target.value)}
        >
          <option value="">All Agents</option>
          {agents.map(agent => (
            <option key={agent.id} value={agent.id}>
              {agent.name}
            </option>
          ))}
        </select>

        <select value={status} onChange={event => setStatus(event.target.value)}>
          <option value="">All Statuses</option>
          <option value="New">New</option>
          <option value="Contacted">Contacted</option>
          <option value="Qualified">Qualified</option>
          <option value="Proposal Sent">Proposal Sent</option>
          <option value="Closed">Closed</option>
        </select>

        <select value={priority} onChange={event => setPriority(event.target.value)}>
          <option value="">All Priorities</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <select value={sortOrder} onChange={event => setSortOrder(event.target.value)}>
          <option value="asc">Sort: Time to Close (Low to High)</option>
          <option value="desc">Sort: Time to Close (High to Low)</option>
        </select>
      </div>

      <div className="leads-list">
        {filteredLeads.map(lead => (
          <div key={lead._id} className="lead-row">
            <div className="lead-info">
              <h4>{lead.name}</h4>
              <div className="lead-meta">
                Agent: {lead.salesAgent?.name || 'Unassigned'} | Priority: {lead.priority} | Time to
                Close: {lead.timeToClose} days
              </div>
            </div>
            <span className={`badge ${lead.status.toLowerCase()}`}>{lead.status}</span>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
