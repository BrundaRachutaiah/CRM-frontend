import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../layout/DashboardLayout';
import Card from '../components/Card';
import PipelinePieChart from '../components/PipelinePieChart';
import ClosedByAgentBarChart from '../components/ClosedByAgentBarChart';
import API from '../api/api';
import '../styles/reports.css';

export default function Reports() {
  const navigate = useNavigate();
  const [pipelineCount, setPipelineCount] = useState(0);
  const [closedCount, setClosedCount] = useState(0);
  const [closedByAgent, setClosedByAgent] = useState([]);

  useEffect(() => {
    API.get('/report/pipeline').then(res => {
      setPipelineCount(res.data.totalLeadsInPipeline);
    });

    API.get('/report/last-week').then(res => {
      setClosedCount(res.data.length);
    });

    API.get('/report/closed-by-agent').then(res => {
      setClosedByAgent(res.data.data);
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
        {/* PIPELINE REPORT */}
        <Card>
          <div className="report-card">
            <h3>Pipeline Overview</h3>
            <div className="report-subtitle">
              Leads in pipeline vs closed
            </div>
            <PipelinePieChart
              pipelineCount={pipelineCount}
              closedCount={closedCount}
            />
          </div>
        </Card>

        {/* CLOSED BY AGENT */}
        <Card>
          <div className="report-card">
            <h3>Closed Leads by Sales Agent</h3>
            <div className="report-subtitle">
              Performance comparison across agents
            </div>
            <ClosedByAgentBarChart data={closedByAgent} />
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
