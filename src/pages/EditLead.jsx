import { useEffect, useState } from 'react';
import { useAlert } from '../hooks/useAlert';
import { useNavigate, useParams } from 'react-router-dom';
import DashboardLayout from '../layout/DashboardLayout';
import API from '../api/api';
import '../styles/forms.css';

const initialForm = {
  name: '',
  source: 'Website',
  salesAgent: '',
  status: 'New',
  priority: 'Medium',
  timeToClose: 30
};

export default function EditLead() {
  const alert = useAlert();
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [agents, setAgents] = useState([]);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([API.get('/agents'), API.get(`/leads/${id}`)])
      .then(([agentsRes, leadRes]) => {
        const lead = leadRes.data.data;
        setAgents(agentsRes.data);
        setForm({
          name: lead.name || '',
          source: lead.source || 'Website',
          salesAgent: lead.salesAgent?._id || '',
          status: lead.status || 'New',
          priority: lead.priority || 'Medium',
          timeToClose: lead.timeToClose || 30
        });
      })
      .catch(() => setError('Failed to load lead details.'))
      .finally(() => setLoading(false));
  }, [id]);

  const onChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (!form.name.trim() || !form.salesAgent) {
      setError('Lead name and sales agent are required.');
      return;
    }

    setSaving(true);
    try {
      await API.patch(`/leads/${id}`, {
        ...form,
        timeToClose: Number(form.timeToClose)
      });
      alert.success('Lead updated successfully.');
      navigate(`/leads/${id}`);
    } catch (submitError) {
      setError(submitError.response?.data?.message || 'Failed to update lead.');
      alert.error('Failed to update lead.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <p>Loading lead...</p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="form-shell">
        <h2>Edit Lead</h2>
        <form className="form-grid" onSubmit={onSubmit}>
          <label>
            Lead Name
            <input
              value={form.name}
              onChange={event => onChange('name', event.target.value)}
              required
            />
          </label>

          <label>
            Lead Source
            <select
              value={form.source}
              onChange={event => onChange('source', event.target.value)}
            >
              <option value="Website">Website</option>
              <option value="Referral">Referral</option>
              <option value="Cold Call">Cold Call</option>
              <option value="Advertisement">Advertisement</option>
              <option value="Email">Email</option>
              <option value="Other">Other</option>
            </select>
          </label>

          <label>
            Sales Agent
            <select
              value={form.salesAgent}
              onChange={event => onChange('salesAgent', event.target.value)}
              required
            >
              <option value="">Select an agent</option>
              {agents.map(agent => (
                <option key={agent.id} value={agent.id}>
                  {agent.name}
                </option>
              ))}
            </select>
          </label>

          <label>
            Lead Status
            <select
              value={form.status}
              onChange={event => onChange('status', event.target.value)}
            >
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Qualified">Qualified</option>
              <option value="Proposal Sent">Proposal Sent</option>
              <option value="Closed">Closed</option>
            </select>
          </label>

          <label>
            Priority
            <select
              value={form.priority}
              onChange={event => onChange('priority', event.target.value)}
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </label>

          <label>
            Time to Close (days)
            <input
              type="number"
              min="1"
              value={form.timeToClose}
              onChange={event => onChange('timeToClose', event.target.value)}
              required
            />
          </label>

          {error && <p className="form-error">{error}</p>}

          <div className="form-actions full-width">
            <button
              type="button"
              className="btn-secondary"
              onClick={() => navigate(`/leads/${id}`)}
            >
              Cancel
            </button>
            <button type="submit" className="btn-primary" disabled={saving}>
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
