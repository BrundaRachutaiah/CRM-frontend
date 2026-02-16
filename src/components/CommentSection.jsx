import { useEffect, useState } from 'react';
import API from '../api/api';

export default function CommentSection({ leadId }) {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  const loadComments = async () => {
    try {
      const res = await API.get(`/leads/${leadId}/comments`);
      setComments(res.data);
    } catch (error) {
      console.error('Failed to load comments', error);
    }
  };

  const addComment = async () => {
    if (!text.trim()) return;

    try {
      setLoading(true);
      await API.post(`/leads/${leadId}/comments`, {
        commentText: text
      });
      setText('');
      await loadComments();
    } catch (error) {
      console.error('Failed to add comment', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (leadId) {
      loadComments();
    }
  }, [leadId]);

  return (
    <div style={{ marginTop: '20px' }}>
      <h3>Comments</h3>

      <div className="comment-input">
  <input
    type="text"
    placeholder="Add comment..."
    value={text}
    onChange={e => setText(e.target.value)}
  />
  <button className="btn-primary" onClick={addComment}>
    Submit
  </button>
</div>

<div>
  {comments.map(c => (
    <div key={c.id} className="comment">
      <div className="comment-author">{c.author}</div>
      <div className="comment-time">{c.createdAt}</div>
      <div>{c.commentText}</div>
    </div>
  ))}
</div>

    </div>
  );
}
