import { useEffect, useState } from 'react';
import DashboardLayout from '../layout/DashboardLayout';
import Card from '../components/Card';
import LeadList from '../components/LeadList';
import API from '../api/api';
import '../styles/dashboard.css';
import '../styles/leads.css';

export default function Dashboard() {
  const [totalLeads, setTotalLeads] = useState(0);
  const [pipeline, setPipeline] = useState(0);
  const [closed, setClosed] = useState(0);
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    // TOTAL LEADS
    API.get('/leads')
      .then(res => {
        setLeads(res.data.data);
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

  }, []);

  return (
    <DashboardLayout>
      <h2>Dashboard</h2>

      <div className="stats-grid">
        <Card title="Total Leads">{totalLeads}</Card>
        <Card title="In Pipeline">{pipeline}</Card>
        <Card title="Closed">{closed}</Card>
      </div>

      <Card title="Leads">
        {leads.length > 0 ? (
          <LeadList leads={leads} />
        ) : (
          <p className="empty-state">No leads available.</p>
        )}
      </Card>
    </DashboardLayout>
  );
}
