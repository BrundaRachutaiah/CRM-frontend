import { useEffect, useState } from 'react';
import DashboardLayout from '../layout/DashboardLayout';
import Card from '../components/Card';
import API from '../api/api';
import '../styles/leads.css';

export default function Settings() {
  const [leads, setLeads] = useState([]);
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    Promise.all([API.get('/leads'), API.get('/agents')])
      .then(([leadsRes, agentsRes]) => {
        setLeads(leadsRes.data.data);
        setAgents(agentsRes.data);
      })
      .catch(() => {
        window.alert('Failed to load settings data.');
      });
  }, []);

  const handleDeleteLead = async (id) => {
    if (!window.confirm('Delete this lead?')) return;
    try {
      await API.delete(`/leads/${id}`);
      setLeads(prev => prev.filter(lead => lead._id !== id));
      window.alert('Lead deleted successfully.');
    } catch {
      window.alert('Failed to delete lead.');
    }
  };

  const handleDeleteAgent = async (id) => {
    if (!window.confirm('Delete this sales agent?')) return;
    try {
      await API.delete(`/agents/${id}`);
      setAgents(prev => prev.filter(agent => agent.id !== id));
      window.alert('Sales agent deleted successfully.');
    } catch {
      window.alert('Failed to delete sales agent.');
    }
  };

  return (
    <DashboardLayout>
      <h2>Settings</h2>

      <div className="settings-grid">
        <Card title="Delete Leads">
          <div className="leads-list">
            {leads.length === 0 && <p className="empty-state">No leads available.</p>}
            {leads.map(lead => (
              <div key={lead._id} className="lead-row">
                <div className="lead-info">
                  <h4>{lead.name}</h4>
                  <div className="lead-meta">
                    Agent: {lead.salesAgent?.name || 'Unassigned'}
                  </div>
                </div>
                <button
                  type="button"
                  className="btn-danger"
                  onClick={() => handleDeleteLead(lead._id)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Delete Sales Agents">
          <div className="leads-list">
            {agents.length === 0 && <p className="empty-state">No sales agents available.</p>}
            {agents.map(agent => (
              <div key={agent.id} className="lead-row">
                <div className="lead-info">
                  <h4>{agent.name}</h4>
                  <div className="lead-meta">{agent.email}</div>
                </div>
                <button
                  type="button"
                  className="btn-danger"
                  onClick={() => handleDeleteAgent(agent.id)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
