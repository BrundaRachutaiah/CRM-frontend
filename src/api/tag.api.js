import API from './api';

/**
 * GET /tags
 * Fetch all tags
 */
export const getTags = async () => {
  const res = await API.get('/tags');
  return res.data; // array of tags
};

/**
 * POST /tags
 * Create a new tag
 */
export const createTag = async (tagName) => {
  const res = await API.post('/tags', { name: tagName });
  return res.data;
};
