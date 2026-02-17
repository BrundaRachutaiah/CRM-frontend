import API from './api';

export const getLeads = async (filters = {}) => {
  const query = new URLSearchParams(filters).toString();
  const res = await API.get(`/leads?${query}`);
  return res.data.data;
};

export const getLeadById = async (id) => {
  const res = await API.get(`/leads/${id}`);
  return res.data.data;
};

export const createLead = async (lead) => {
  const res = await API.post('/leads', lead);
  return res.data.data;
};

export const updateLead = async (id, data) => {
  const res = await API.patch(`/leads/${id}`, data);
  return res.data.data;
};

export const deleteLead = async (id) => {
  const res = await API.delete(`/leads/${id}`);
  return res.data;
};
