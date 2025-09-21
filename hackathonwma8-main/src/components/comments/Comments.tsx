import React, { useState } from 'react';
import { Send, Heart, Edit, Trash2, MoreHorizontal } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Comment as CommentType } from '../../types';
import { addComment, deleteComment, editComment } from '../../utils/api';
import { useAuth } from '../../contexts/AuthContext';

interface CommentsProps {
  postId: string;
  comments: CommentType[];
  onCommentsUpdate: (comments: CommentType[]) => void;
}

const Comments: React.FC<CommentsProps> = ({ postId, comments, onCommentsUpdate }) => {
  const { user } = useAuth();
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || loading) return;

    setLoading(true);
    try {
      const comment = await addComment(postId, newComment.trim(), user!.id);
      onCommentsUpdate([...comments, comment]);
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    if (!window.confirm('Are you sure you want to delete this comment?')) return;

    try {
      await deleteComment(commentId);
      onCommentsUpdate(comments.filter(c => c.id !== commentId));
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const handleEditComment = async (commentId: string) => {
    if (!editContent.trim()) return;

    try {
      const updatedComment = await editComment(commentId, editContent.trim());
      onCommentsUpdate(comments.map(c => 
        c.id === commentId ? updatedComment : c
      ));
      setEditingId(null);
      setEditContent('');
    } catch (error) {
      console.error('Error editing comment:', error);
    }
  };

  const startEditing = (comment: CommentType) => {
    setEditingId(comment.id);
    setEditContent(comment.content);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditContent('');
  };

  return (
    <div className="p-6 pt-4">
      {/* Comments List */}
      <div className="space-y-4 mb-6">
        {comments.map((comment) => (
          <div key={comment.id} className="flex space-x-3">
            <img
              src={comment.avatar}
              alt={comment.username}
              className="h-8 w-8 rounded-full object-cover flex-shrink-0"
            />
            
            <div className="flex-1 min-w-0">
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-sm font-semibold text-gray-900">{comment.username}</h4>
                  
                  {comment.userId === user?.id && (
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => startEditing(comment)}
                        className="text-gray-400 hover:text-blue-500 transition-colors"
                        title="Edit comment"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteComment(comment.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                        title="Delete comment"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </div>
                
                {editingId === comment.id ? (
                  <div className="space-y-2">
                    <textarea
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      className="w-full p-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                      rows={2}
                      autoFocus
                    />
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditComment(comment.id)}
                        className="px-3 py-1 bg-blue-500 text-white text-xs rounded-lg hover:bg-blue-600 transition-colors"
                      >
                        Save
                      </button>
                      <button
                        onClick={cancelEditing}
                        className="px-3 py-1 bg-gray-300 text-gray-700 text-xs rounded-lg hover:bg-gray-400 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-gray-800">{comment.content}</p>
                )}
              </div>
              
              <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                <span>{formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}</span>
                <button className="flex items-center space-x-1 hover:text-red-500 transition-colors">
                  <Heart className={`h-3 w-3 ${comment.isLiked ? 'fill-current text-red-500' : ''}`} />
                  <span>{comment.likes}</span>
                </button>
                <button className="hover:text-blue-500 transition-colors">Reply</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Comment Form */}
      <form onSubmit={handleSubmitComment} className="flex space-x-3">
        <img
          src={user?.avatar}
          alt={user?.username}
          className="h-8 w-8 rounded-full object-cover flex-shrink-0"
        />
        
        <div className="flex-1">
          <div className="flex items-end space-x-2">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
              className="flex-1 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
              rows={2}
              disabled={loading}
            />
            
            <button
              type="submit"
              disabled={!newComment.trim() || loading}
              className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Comments;