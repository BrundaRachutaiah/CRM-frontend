import './lead-card.css';

export default function LeadCard({ lead }) {
  return (
    <div className="lead-card">
      <div>
        <h4>{lead.name}</h4>
        <span className={`badge ${lead.status.toLowerCase()}`}>
          {lead.status}
        </span>
      </div>

      <div className="muted">
        Agent: {lead.salesAgent?.name}
      </div>
    </div>
  );
}
