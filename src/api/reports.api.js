import API from './api';

export const getPipelineCount = async () => {
  const res = await API.get('/report/pipeline');
  return res.data.totalLeadsInPipeline;
};

export const getClosedLastWeek = async () => {
  const res = await API.get('/report/last-week');
  return res.data;
};

export const getClosedByAgent = async () => {
  const res = await API.get('/report/closed-by-agent');
  return res.data.data;
};
