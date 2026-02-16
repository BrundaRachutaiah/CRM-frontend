import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import DashboardLayout from '../layout/DashboardLayout';
import CommentSection from '../components/CommentSection';
import API from '../api/api';
import '../styles/lead-details.css';
import '../styles/lead-card.css';

export default function LeadDetails() {
  const { id } = useParams();
  const [lead, setLead] = useState(null);

  useEffect(() => {
    API.get(`/leads/${id}`).then(res => {
      setLead(res.data.data);
    });
  }, [id]);

  if (!lead) return null;

  return (
    <DashboardLayout>
      {/* HEADER */}
      <div className="lead-header">
        <h2>{lead.name}</h2>

        <div className="lead-badges">
          <span className={`badge ${lead.status.toLowerCase()}`}>
            {lead.status}
          </span>

          <span className={`badge ${lead.priority?.toLowerCase()}`}>
            {lead.priority}
          </span>
        </div>
      </div>

      {/* LEAD INFO */}
      <div className="lead-info-grid">
        <div className="lead-info-item">
          <label>Sales Agent</label>
          {lead.salesAgent?.name || 'Unassigned'}
        </div>

        <div className="lead-info-item">
          <label>Lead Source</label>
          {lead.source || '—'}
        </div>

        <div className="lead-info-item">
          <label>Time to Close</label>
          {lead.timeToClose} days
        </div>

        <div className="lead-info-item">
          <label>Priority</label>
          {lead.priority}
        </div>
      </div>

      {/* COMMENTS */}
      <div className="comments-section">
        <h3>Comments</h3>
        <CommentSection leadId={id} />
      </div>
    </DashboardLayout>
  );
}
