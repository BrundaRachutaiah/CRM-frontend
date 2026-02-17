import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../layout/DashboardLayout';
import Card from '../components/Card';
import API from '../api/api';
import '../styles/reports.css';

export default function Reports() {
  const navigate = useNavigate();
  const [pipelineCount, setPipelineCount] = useState(0);
  const [closedLastWeek, setClosedLastWeek] = useState([]);
  const [closedByAgent, setClosedByAgent] = useState([]);

  useEffect(() => {
    Promise.all([
      API.get('/report/pipeline'),
      API.get('/report/last-week'),
      API.get('/report/closed-by-agent')
    ])
      .then(([pipelineRes, lastWeekRes, byAgentRes]) => {
        setPipelineCount(pipelineRes.data.totalLeadsInPipeline);
        setClosedLastWeek(lastWeekRes.data);
        setClosedByAgent(byAgentRes.data.data);
      })
      .catch(() => {
        setPipelineCount(0);
        setClosedLastWeek([]);
        setClosedByAgent([]);
      });
  }, []);

  return (
    <DashboardLayout>
      <div className="leads-header">
        <h2>Reports</h2>
        <div className="leads-toolbar">
          <button className="btn-secondary" onClick={() => navigate('/reports/status')}>
            Leads by Status
          </button>
          <button className="btn-secondary" onClick={() => navigate('/reports/agent')}>
            Leads by Agent
          </button>
        </div>
      </div>

      <div className="reports-grid">
        <Card title="Pipeline Report">
          <p className="report-subtitle">Total leads currently in pipeline</p>
          <div className="report-metric">{pipelineCount}</div>
        </Card>

        <Card title="Closed Last 7 Days">
          <p className="report-subtitle">Leads closed within the past week</p>
          <div className="report-metric">{closedLastWeek.length}</div>
        </Card>

        <Card title="Closed Leads by Agent">
          <p className="report-subtitle">Closed lead count grouped by sales agent</p>
          <div className="report-list">
            {closedByAgent.length === 0 && (
              <p className="empty-state">No closed leads found.</p>
            )}
            {closedByAgent.map(row => (
              <div key={row.salesAgent} className="report-row">
                <span>{row.salesAgent}</span>
                <strong>{row.closedLeads}</strong>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Recently Closed Leads">
          <p className="report-subtitle">Lead, owner and closure date</p>
          <div className="report-list">
            {closedLastWeek.length === 0 && (
              <p className="empty-state">No recently closed leads found.</p>
            )}
            {closedLastWeek.map(lead => (
              <div key={lead.id} className="report-row report-row-stack">
                <strong>{lead.name}</strong>
                <span>{lead.salesAgent}</span>
                <span>{new Date(lead.closedAt).toLocaleDateString()}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
