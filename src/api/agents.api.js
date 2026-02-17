import API from './api';

export const getAgents = async () => {
  const res = await API.get('/agents');
  return res.data;
};

export const createAgent = async (agent) => {
  const res = await API.post('/agents', agent);
  return res.data;
};

export const deleteAgent = async (id) => {
  const res = await API.delete(`/agents/${id}`);
  return res.data;
};
