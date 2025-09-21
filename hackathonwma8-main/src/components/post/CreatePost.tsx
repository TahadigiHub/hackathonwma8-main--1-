import React, { useState } from 'react';
import { Image, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { createPost } from '../../utils/api';

interface CreatePostProps {
  onPostCreated?: () => void;
}
Sconst CreatePost: React.FC<CreatePostProps> = ({ onPostCreated }) => {
  const { user } = useAuth();
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [showImageInput, setShowImageInput] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!content.trim()) {
      setError('Post content cannot be empty');
      return;
    }
    
    if (!user?.id) {
      setError('You must be logged in to create a post');
      return;
    }
    
    setIsSubmitting(true);
    setError('');
    
    try {
      await createPost(user.id, content, imageUrl);
      setContent('');
      setImageUrl('');
      setShowImageInput(false);
      if (onPostCreated) {
        onPostCreated();
      }
    } catch (err) {
      setError('Failed to create post. Please try again.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
      <form onSubmit={handleSubmit}>
        <div className="flex items-start space-x-3">
          <img
            src={user?.avatar || "https://via.placeholder.com/40"}
            alt="User avatar"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="flex-1">
            <textarea
              className="w-full border border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder="What's on your mind?"
              rows={3}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              disabled={isSubmitting}
            />
            
            {showImageInput && (
              <div className="mt-2 relative">
                <input
                  type="text"
                  className="w-full border border-gray-200 rounded-lg p-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter image URL"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  disabled={isSubmitting}
                />
                <button
                  type="button"
                  className="absolute right-2 top-2 text-gray-500 hover:text-gray-700"
                  onClick={() => {
                    setShowImageInput(false);
                    setImageUrl('');
                  }}
                >
                  <X size={18} />
                </button>
              </div>
            )}
            
            {imageUrl && (
              <div className="mt-2 relative">
                <img
                  src={imageUrl}
                  alt="Post preview"
                  className="w-full h-48 object-cover rounded-lg"
                  onError={() => {
                    setError('Invalid image URL');
                    setImageUrl('');
                  }}
                />
              </div>
            )}
            
            {error && (
              <div className="mt-2 text-red-500 text-sm">{error}</div>
            )}
            
            <div className="mt-3 flex justify-between items-center">
              <div>
                {!showImageInput && (
                  <button
                    type="button"
                    className="text-gray-500 hover:text-blue-500 p-2 rounded-full hover:bg-gray-100"
                    onClick={() => setShowImageInput(true)}
                  >
                    <Image size={20} />
                  </button>
                )}
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isSubmitting || !content.trim()}
              >
                {isSubmitting ? 'Posting...' : 'Post'}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;