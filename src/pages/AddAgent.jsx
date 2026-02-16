import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../layout/DashboardLayout';
import API from '../api/api';
import '../styles/forms.css';

export default function AddAgent() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (!name.trim() || !email.trim()) {
      setError('Name and email are required.');
      return;
    }

    setSaving(true);
    try {
      await API.post('/agents', { name, email });
      navigate('/agents');
    } catch (submitError) {
      setError(submitError.response?.data?.error || 'Failed to create sales agent.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="form-shell">
        <h2>Add New Sales Agent</h2>
        <form className="form-grid" onSubmit={onSubmit}>
          <label>
            Agent Name
            <input value={name} onChange={event => setName(event.target.value)} required />
          </label>

          <label>
            Email Address
            <input
              type="email"
              value={email}
              onChange={event => setEmail(event.target.value)}
              required
            />
          </label>

          {error && <p className="form-error">{error}</p>}

          <div className="form-actions full-width">
            <button
              type="button"
              className="btn-secondary"
              onClick={() => navigate('/agents')}
            >
              Cancel
            </button>
            <button type="submit" className="btn-primary" disabled={saving}>
              {saving ? 'Creating...' : 'Create Agent'}
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
