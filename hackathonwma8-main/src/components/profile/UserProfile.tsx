import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { User, Post } from '../../types';
import { getUserById, getUserPosts } from '../../utils/api';
import { Loader2, ArrowLeft, MapPin, Link, Calendar, BadgeCheck, Settings } from 'lucide-react';
import PostItem from '../posts/Post';
import { useAuth } from '../../contexts/AuthContext';

const UserProfile: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const { user: currentUser } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('posts');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        if (!userId) return;
        
        const userData = await getUserById(userId);
        setUser(userData);
        
        const userPosts = await getUserPosts(userId);
        setPosts(userPosts);
      } catch (err: any) {
        setError(err.message || 'Failed to load user profile');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  const handlePostUpdate = (updatedPost: Post) => {
    setPosts(posts.map(post => 
      post.id === updatedPost.id ? updatedPost : post
    ));
  };

  const isOwnProfile = currentUser?.id === userId;

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="animate-spin h-8 w-8 text-blue-500" />
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">{error || 'User not found'}</p>
        <button 
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm">
      {/* Header with back button */}
      <div className="p-4 border-b flex items-center">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 text-gray-700" />
        </button>
        <div className="ml-4">
          <h1 className="text-xl font-bold flex items-center">
            {user.username}
            {user.verified && <BadgeCheck className="h-5 w-5 text-blue-500 ml-1" />}
          </h1>
          <p className="text-sm text-gray-500">{posts.length} posts</p>
        </div>
      </div>

      {/* Profile header */}
      <div className="relative">
        {/* Cover photo */}
        <div className="h-48 bg-gradient-to-r from-blue-400 to-purple-500 rounded-t-xl"></div>
        
        {/* Profile picture */}
        <div className="absolute -bottom-16 left-8">
          <img 
            src={user.avatar} 
            alt={user.username}
            className="h-32 w-32 rounded-full border-4 border-white object-cover"
          />
        </div>
      </div>

      {/* Profile actions */}
      <div className="pt-20 px-8 pb-4 flex justify-end">
        {isOwnProfile ? (
          <button 
            onClick={() => navigate('/profile/edit')}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-full transition-colors"
          >
            <Settings className="h-4 w-4" />
            <span>Edit Profile</span>
          </button>
        ) : (
          <button className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors">
            Follow
          </button>
        )}
      </div>

      {/* Profile info */}
      <div className="px-8 pb-6">
        <h1 className="text-2xl font-bold flex items-center">
          {user.username}
          {user.verified && <BadgeCheck className="h-5 w-5 text-blue-500 ml-1" />}
        </h1>
        <p className="text-gray-500">@{user.username}</p>
        
        {user.bio && (
          <p className="mt-4 text-gray-800">{user.bio}</p>
        )}
        
        <div className="mt-4 flex flex-wrap gap-y-2">
          <div className="flex items-center text-gray-500 mr-4">
            <MapPin className="h-4 w-4 mr-1" />
            <span>New York, USA</span>
          </div>
          <div className="flex items-center text-gray-500 mr-4">
            <Link className="h-4 w-4 mr-1" />
            <a href="#" className="text-blue-500 hover:underline">connectify.com/{user.username}</a>
          </div>
          <div className="flex items-center text-gray-500">
            <Calendar className="h-4 w-4 mr-1" />
            <span>Joined {new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
          </div>
        </div>
        
        <div className="mt-4 flex space-x-4">
          <div>
            <span className="font-bold">245</span> <span className="text-gray-500">Following</span>
          </div>
          <div>
            <span className="font-bold">12.4K</span> <span className="text-gray-500">Followers</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b">
        <div className="flex">
          <button 
            onClick={() => setActiveTab('posts')}
            className={`px-4 py-4 font-medium text-sm flex-1 text-center ${
              activeTab === 'posts' 
                ? 'text-blue-500 border-b-2 border-blue-500' 
                : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            Posts
          </button>
          <button 
            onClick={() => setActiveTab('media')}
            className={`px-4 py-4 font-medium text-sm flex-1 text-center ${
              activeTab === 'media' 
                ? 'text-blue-500 border-b-2 border-blue-500' 
                : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            Media
          </button>
          <button 
            onClick={() => setActiveTab('likes')}
            className={`px-4 py-4 font-medium text-sm flex-1 text-center ${
              activeTab === 'likes' 
                ? 'text-blue-500 border-b-2 border-blue-500' 
                : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            Likes
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="divide-y">
        {activeTab === 'posts' && (
          <>
            {posts.length > 0 ? (
              posts.map(post => (
                <div key={post.id} className="py-4">
                  <PostItem post={post} onPostUpdate={handlePostUpdate} />
                </div>
              ))
            ) : (
              <div className="py-12 text-center">
                <p className="text-gray-500">No posts yet</p>
              </div>
            )}
          </>
        )}
        
        {activeTab === 'media' && (
          <div className="py-12 text-center">
            <p className="text-gray-500">Media content will appear here</p>
          </div>
        )}
        
        {activeTab === 'likes' && (
          <div className="py-12 text-center">
            <p className="text-gray-500">Liked posts will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;