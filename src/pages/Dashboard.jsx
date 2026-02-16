import { useEffect, useState } from 'react';
import DashboardLayout from '../layout/DashboardLayout';
import Card from '../components/Card';
import PipelinePieChart from '../components/PipelinePieChart';
import ClosedByAgentBarChart from '../components/ClosedByAgentBarChart';
import API from '../api/api';
import '../styles/dashboard.css';
import '../styles/reports.css';

export default function Dashboard() {
  const [totalLeads, setTotalLeads] = useState(0);
  const [pipeline, setPipeline] = useState(0);
  const [closed, setClosed] = useState(0);
  const [closedByAgent, setClosedByAgent] = useState([]);

  useEffect(() => {
    // TOTAL LEADS
    API.get('/leads')
      .then(res => {
        setTotalLeads(res.data.data.length);
      })
      .catch(err => console.error(err));

    // PIPELINE COUNT
    API.get('/report/pipeline')
      .then(res => {
        setPipeline(res.data.totalLeadsInPipeline);
      })
      .catch(err => console.error(err));

    // CLOSED LAST WEEK
    API.get('/report/last-week')
      .then(res => {
        setClosed(res.data.length);
      })
      .catch(err => console.error(err));

    // CLOSED BY AGENT
    API.get('/report/closed-by-agent')
      .then(res => {
        setClosedByAgent(res.data.data);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <DashboardLayout>
      <h2>Dashboard</h2>

      <div className="stats-grid">
        <Card title="Total Leads">{totalLeads}</Card>
        <Card title="In Pipeline">{pipeline}</Card>
        <Card title="Closed">{closed}</Card>
      </div>

      <div className="reports-grid">
        <Card title="Pipeline Overview">
          <PipelinePieChart
            pipelineCount={pipeline}
            closedCount={closed}
          />
        </Card>

        <Card title="Closed by Agent">
          <ClosedByAgentBarChart data={closedByAgent} />
        </Card>
      </div>
    </DashboardLayout>
  );
}
