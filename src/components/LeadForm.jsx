import { useState } from 'react';
import API from '../api/api';

export default function LeadForm({ onSuccess }) {
  const [form, setForm] = useState({
    name: '',
    source: '',
    priority: 'Medium',
    timeToClose: 30,
    tags: []
  });

  const submit = async () => {
    await API.post('/leads', form);
    onSuccess && onSuccess();
  };

  return (
    <>
      <input placeholder="Lead Name"
        onChange={e => setForm({...form, name: e.target.value})} />
      <button onClick={submit}>Create Lead</button>
    </>
  );
}
