import React, { useState } from 'react';
import { Image, Smile, Calendar, MapPin } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const CreatePost: React.FC = () => {
  const { user } = useAuth();
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    
    // Here you would typically call an API to create the post
    console.log('Creating post:', content);
    setContent('');
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
      <form onSubmit={handleSubmit}>
        <div className="flex space-x-4">
          <img
            src={user?.avatar}
            alt={user?.username}
            className="h-12 w-12 rounded-full object-cover border-2 border-gray-100 flex-shrink-0"
          />
          
          <div className="flex-1">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What's happening, Taha?"
              className="w-full p-3 text-lg placeholder-gray-500 border-0 resize-none focus:ring-0 focus:outline-none"
              rows={3}
            />
            
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex space-x-4">
                <button
                  type="button"
                  className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors"
                >
                  <Image className="h-5 w-5" />
                  <span className="text-sm">Photo</span>
                </button>
                
                <button
                  type="button"
                  className="flex items-center space-x-2 text-gray-500 hover:text-yellow-500 transition-colors"
                >
                  <Smile className="h-5 w-5" />
                  <span className="text-sm">Feeling</span>
                </button>
                
                <button
                  type="button"
                  className="flex items-center space-x-2 text-gray-500 hover:text-green-500 transition-colors"
                >
                  <MapPin className="h-5 w-5" />
                  <span className="text-sm">Location</span>
                </button>
              </div>
              
              <button
                type="submit"
                disabled={!content.trim()}
                className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full font-medium hover:from-blue-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;