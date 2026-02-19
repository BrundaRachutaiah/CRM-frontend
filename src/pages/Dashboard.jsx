import { useEffect, useMemo, useState } from 'react';
import DashboardLayout from '../layout/DashboardLayout';
import Card from '../components/Card';
import LeadList from '../components/LeadList';
import API from '../api/api';
import '../styles/dashboard.css';
import '../styles/leads.css';

export default function Dashboard() {
  const [leads, setLeads] = useState([]);
  const [agents, setAgents] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [agentFilter, setAgentFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');

  useEffect(() => {
    Promise.all([API.get('/leads'), API.get('/agents')])
      .then(([leadsRes, agentsRes]) => {
        setLeads(leadsRes.data.data || []);
        setAgents(agentsRes.data || []);
      })
      .catch(err => console.error(err));
  }, []);

  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const statusOk = statusFilter ? lead.status === statusFilter : true;
      const agentOk = agentFilter ? lead.salesAgent?._id === agentFilter : true;
      const priorityOk = priorityFilter ? lead.priority === priorityFilter : true;
      return statusOk && agentOk && priorityOk;
    });
  }, [leads, statusFilter, agentFilter, priorityFilter]);

  const totalLeads = filteredLeads.length;
  const pipeline = filteredLeads.filter(lead => lead.status !== 'Closed').length;
  const closed = filteredLeads.filter(lead => lead.status === 'Closed').length;

  const clearFilters = () => {
    setStatusFilter('');
    setAgentFilter('');
    setPriorityFilter('');
  };

  return (
    <DashboardLayout>
      <h2>Dashboard</h2>

      <div className="quick-filters">
        <select value={statusFilter} onChange={event => setStatusFilter(event.target.value)}>
          <option value="">All Statuses</option>
          <option value="New">New</option>
          <option value="Contacted">Contacted</option>
          <option value="Qualified">Qualified</option>
          <option value="Proposal Sent">Proposal Sent</option>
          <option value="Closed">Closed</option>
        </select>

        <select value={agentFilter} onChange={event => setAgentFilter(event.target.value)}>
          <option value="">All Agents</option>
          {agents.map(agent => (
            <option key={agent.id} value={agent.id}>
              {agent.name}
            </option>
          ))}
        </select>

        <select value={priorityFilter} onChange={event => setPriorityFilter(event.target.value)}>
          <option value="">All Priorities</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <button type="button" className="btn-secondary" onClick={clearFilters}>
          Clear
        </button>
      </div>

      <div className="stats-grid">
        <Card title="Total Leads">{totalLeads}</Card>
        <Card title="In Pipeline">{pipeline}</Card>
        <Card title="Closed">{closed}</Card>
      </div>

      <Card title="Leads">
        {filteredLeads.length > 0 ? (
          <LeadList leads={filteredLeads} />
        ) : (
          <p className="empty-state">No leads available.</p>
        )}
      </Card>
    </DashboardLayout>
  );
}
