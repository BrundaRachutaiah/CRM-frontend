import { useCallback, useEffect, useState } from 'react';
import { useAlert } from '../hooks/useAlert';
import API from '../api/api';

export default function CommentSection({ leadId }) {
  const alert = useAlert();
  const [comments, setComments] = useState([]);
  const [text, setText] = useState('');
  const [agents, setAgents] = useState([]);
  const [author, setAuthor] = useState('');
  const [loading, setLoading] = useState(false);

  const loadComments = useCallback(async () => {
    try {
      const res = await API.get(`/leads/${leadId}/comments`);
      setComments(res.data);
    } catch (error) {
      console.error('Failed to load comments', error);
    }
  }, [leadId]);

  const loadAgents = async () => {
    try {
      const res = await API.get('/agents');
      setAgents(res.data);
      if (res.data.length > 0) {
        setAuthor(res.data[0].id);
      }
    } catch (error) {
      console.error('Failed to load agents', error);
    }
  };

  const addComment = async () => {
    if (!text.trim()) return;
    if (!author) {
      alert.error('Please select an author.');
      return;
    }

    try {
      setLoading(true);
      await API.post(`/leads/${leadId}/comments`, {
        commentText: text.trim(),
        author
      });
      setText('');
      await loadComments();
      alert.success('Comment submitted successfully.');
    } catch (error) {
      console.error('Failed to add comment', error);
      alert.error('Failed to submit comment.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!leadId) return;
    loadComments();
    loadAgents();
  }, [leadId, loadComments]);

  return (
    <div className="comment-section-wrap">
      <div className="comment-input">
        <input
          type="text"
          placeholder="Add comment..."
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <select
          value={author}
          onChange={e => setAuthor(e.target.value)}
        >
          {agents.map(agent => (
            <option key={agent.id} value={agent.id}>
              {agent.name}
            </option>
          ))}
        </select>
        <button
          type="button"
          className="btn-primary"
          disabled={loading}
          onClick={addComment}
        >
          {loading ? 'Submitting...' : 'Submit Comment'}
        </button>
      </div>

      <div className="comment-list">
        {comments.length === 0 && (
          <p className="comment-empty">No comments yet.</p>
        )}
        {comments.map(c => (
          <div key={c.id} className="comment">
            <div className="comment-meta">
              <div className="comment-author">{c.author}</div>
              <div className="comment-time">
                {new Date(c.createdAt).toLocaleString()}
              </div>
            </div>
            <div className="comment-text">{c.commentText}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
