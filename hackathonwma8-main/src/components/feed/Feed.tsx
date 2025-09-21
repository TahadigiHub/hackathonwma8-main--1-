import React, { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { Post as PostType } from '../../types';
import { getPosts } from '../../utils/api';
import Post from '../posts/Post';
import Stories from '../stories/Stories';
import CreatePost from './CreatePost';

const Feed: React.FC = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedPosts = await getPosts();
        setPosts(fetchedPosts);
      } catch (err: any) {
        setError(err.message || 'Failed to load posts');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handlePostUpdate = (updatedPost: PostType) => {
    setPosts(posts.map(post => 
      post.id === updatedPost.id ? updatedPost : post
    ));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="animate-spin h-8 w-8 text-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Stories />
      <CreatePost />
      
      <div className="space-y-6">
        {posts.map((post) => (
          <Post 
            key={post.id} 
            post={post} 
            onPostUpdate={handlePostUpdate}
          />
        ))}
      </div>

      {posts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No posts to show. Start following people to see their posts!</p>
        </div>
      )}
    </div>
  );
};

export default Feed;