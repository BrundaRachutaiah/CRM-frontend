import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../layout/DashboardLayout';
import LeadList from '../components/LeadList';
import Filters from '../components/Filters';
import API from '../api/api';
import '../styles/leads.css';

export default function Leads() {
  const [leads, setLeads] = useState([]);
  const navigate = useNavigate();

  const fetchLeads = async (filters = {}) => {
    const query = new URLSearchParams(filters).toString();
    const res = await API.get(`/leads?${query}`);
    setLeads(res.data.data);
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  return (
    <DashboardLayout>
      <div className="leads-header">
        <h2>Leads</h2>
        <button className="btn-primary" onClick={() => navigate('/leads/new')}>
          + Add New Lead
        </button>
      </div>

      <div className="leads-toolbar">
        <Filters onApply={fetchLeads} />
      </div>

      <LeadList leads={leads} />
    </DashboardLayout>
  );
}
