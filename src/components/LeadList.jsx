import { Link } from 'react-router-dom';
import '../styles/leads.css';
import '../styles/lead-card.css';

export default function LeadList({ leads }) {
  return (
    <div className="leads-list">
      {leads.map(lead => (
        <div key={lead._id} className="lead-row">
          <div className="lead-info">
            <h4>{lead.name}</h4>

            <div className="lead-meta">
              Agent: {lead.salesAgent?.name || 'Unassigned'}
            </div>
          </div>

          <span className={`badge ${lead.status.toLowerCase()}`}>
            {lead.status}
          </span>

          <div className="lead-actions">
            <Link to={`/leads/${lead._id}`}>View</Link>
          </div>
        </div>
      ))}
    </div>
  );
}
