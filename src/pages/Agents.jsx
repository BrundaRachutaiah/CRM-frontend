import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../layout/DashboardLayout';
import API from '../api/api';
import '../styles/leads.css';

export default function Agents() {
  const [agents, setAgents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    API.get('/agents').then(res => setAgents(res.data));
  }, []);

  return (
    <DashboardLayout>
      <div className="leads-header">
        <h2>Sales Agents</h2>
        <button className="btn-primary" onClick={() => navigate('/agents/new')}>
          + Add New Agent
        </button>
      </div>
      <div className="leads-list">
        {agents.map(agent => (
          <div key={agent.id} className="lead-row">
            <div className="lead-info">
              <h4>{agent.name}</h4>
              <div className="lead-meta">{agent.email}</div>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
