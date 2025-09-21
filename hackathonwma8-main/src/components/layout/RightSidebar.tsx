import React from 'react';
import { TrendingUp, Users } from 'lucide-react';

const RightSidebar: React.FC = () => {
  const trendingTopics = [
    { tag: '#TechInnovation', posts: '12.5K posts' },
    { tag: '#Connectify', posts: '8.2K posts' },
    { tag: '#DigitalLife', posts: '5.7K posts' },
    { tag: '#Networking', posts: '4.1K posts' },
    { tag: '#SocialMedia', posts: '3.8K posts' }
  ];

  const suggestedUsers = [
    {
      id: '4',
      username: 'alex_designer',
      avatar: 'https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      bio: 'UI/UX Designer',
      verified: false
    },
    {
      id: '5',
      username: 'emma_writer',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      bio: 'Content Creator',
      verified: true
    },
    {
      id: '6',
      username: 'david_photo',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      bio: 'Photographer',
      verified: false
    }
  ];

  return (
    <div className="w-80 space-y-6">
      {/* Trending Topics */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-2 mb-4">
          <TrendingUp className="h-5 w-5 text-orange-500" />
          <h2 className="text-lg font-semibold text-gray-900">Trending for you</h2>
        </div>
        
        <div className="space-y-3">
          {trendingTopics.map((topic, index) => (
            <div key={index} className="cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
              <p className="font-semibold text-blue-600 hover:text-blue-700">{topic.tag}</p>
              <p className="text-sm text-gray-500">{topic.posts}</p>
            </div>
          ))}
        </div>
        
        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium mt-4">
          Show more
        </button>
      </div>

      {/* Suggested Users */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Users className="h-5 w-5 text-purple-500" />
          <h2 className="text-lg font-semibold text-gray-900">Who to follow</h2>
        </div>
        
        <div className="space-y-4">
          {suggestedUsers.map((user) => (
            <div key={user.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <img
                  src={user.avatar}
                  alt={user.username}
                  className="h-10 w-10 rounded-full object-cover"
                />
                <div>
                  <div className="flex items-center space-x-1">
                    <p className="font-semibold text-gray-900">{user.username}</p>
                    {user.verified && (
                      <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">{user.bio}</p>
                </div>
              </div>
              
              <button className="px-4 py-1.5 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm rounded-full hover:from-blue-600 hover:to-purple-600 transition-all duration-200">
                Follow
              </button>
            </div>
          ))}
        </div>
        
        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium mt-4">
          Show more
        </button>
      </div>

      {/* Footer */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="text-xs text-gray-500 space-y-2">
          <div className="flex flex-wrap gap-x-3">
            <a href="#" className="hover:text-blue-600">About</a>
            <a href="#" className="hover:text-blue-600">Privacy</a>
            <a href="#" className="hover:text-blue-600">Terms</a>
            <a href="#" className="hover:text-blue-600">Help</a>
          </div>
          <p>© 2024 Connectify. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;