import API from './api';

/**
 * GET /leads/:id/comments
 * Fetch all comments for a lead
 */
export const getCommentsByLead = async (leadId) => {
  const res = await API.get(`/leads/${leadId}/comments`);
  return res.data; // array of comments
};

/**
 * POST /leads/:id/comments
 * Add a new comment to a lead
 */
export const addCommentToLead = async (leadId, commentText) => {
  const res = await API.post(`/leads/${leadId}/comments`, {
    commentText
  });
  return res.data;
};
