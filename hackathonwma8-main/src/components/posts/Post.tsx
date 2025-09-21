import React, { useState } from 'react';
import { Heart, MessageCircle, Share, Bookmark, MoreHorizontal, BadgeCheck, Trash2, ArrowUp, ArrowDown } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Post as PostType } from '../../types';
import { votePost, unvotePost } from '../../utils/api';
import { useAuth } from '../../contexts/AuthContext';
import Comments from '../comments/Comments';
import { Link } from 'react-router-dom';

interface PostProps {
  post: PostType;
  onPostUpdate: (updatedPost: PostType) => void;
}

const Post: React.FC<PostProps> = ({ post, onPostUpdate }) => {
  const { user } = useAuth();
  const [showComments, setShowComments] = useState(false);
  const [isVoting, setIsVoting] = useState(false);

  const handleVote = async () => {
    if (isVoting) return;
    
    setIsVoting(true);
    try {
      if (!post.isLiked) {
        await votePost(post.id);
        const updatedPost = {
          ...post,
          isLiked: true,
          likes: post.likes + 10
        };
        onPostUpdate(updatedPost);
      }
    } catch (error) {
      console.error('Error voting post:', error);
    } finally {
      setIsVoting(false);
    }
  };

  const handleUnvote = async () => {
    if (isVoting) return;
    
    setIsVoting(true);
    try {
      if (post.isLiked) {
        await unvotePost(post.id);
        const updatedPost = {
          ...post,
          isLiked: false,
          likes: post.likes - 10
        };
        onPostUpdate(updatedPost);
      }
    } catch (error) {
      console.error('Error unvoting post:', error);
    } finally {
      setIsVoting(false);
    }
  };

  const handleCommentsUpdate = (comments: any[]) => {
    const updatedPost = { ...post, comments };
    onPostUpdate(updatedPost);
  };

  return (
    <article className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
      {/* Post Header */}
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <Link to={`/profile/${post.userId}`} className="block">
              <img
                src={post.avatar}
                alt={post.username}
                className="h-12 w-12 rounded-full object-cover border-2 border-gray-100"
              />
            </Link>
            <div>
              <div className="flex items-center space-x-2">
                <Link to={`/profile/${post.userId}`} className="font-semibold text-gray-900 hover:underline">
                  {post.username}
                </Link>
                {post.verified && <BadgeCheck className="h-5 w-5 text-blue-500" />}
              </div>
              <p className="text-sm text-gray-500">
                {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
              </p>
            </div>
          </div>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <MoreHorizontal className="h-5 w-5 text-gray-500" />
          </button>
        </div>
      </div>

      {/* Post Content */}
      <div className="px-6 pb-4">
        <p className="text-gray-900 text-lg leading-relaxed">{post.content}</p>
      </div>

      {/* Post Image */}
      {post.image && (
        <div className="px-6 pb-4">
          <img
            src={post.image}
            alt="Post content"
            className="w-full rounded-lg object-cover max-h-96"
          />
        </div>
      )}

      {/* Post Actions */}
      <div className="px-6 py-4 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <button
                onClick={handleVote}
                disabled={isVoting}
                className={`flex items-center transition-colors ${
                  post.isLiked
                    ? 'text-blue-500 hover:text-blue-600'
                    : 'text-gray-600 hover:text-blue-500'
                }`}
              >
                <ArrowUp className={`h-5 w-5 ${post.isLiked ? 'fill-current' : ''}`} />
              </button>
              <span>{post.likes}</span>
              <button
                onClick={handleUnvote}
                disabled={isVoting || !post.isLiked}
                className="flex items-center text-gray-600 hover:text-red-500 transition-colors"
              >
                <ArrowDown className="h-5 w-5" />
              </button>
            </div>

            <button
              onClick={() => setShowComments(!showComments)}
              className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors"
            >
              <MessageCircle className="h-6 w-6" />
              <span className="text-sm font-medium">{post.comments.length}</span>
            </button>

            <button className="flex items-center space-x-2 text-gray-500 hover:text-green-500 transition-colors">
              <Share className="h-6 w-6" />
              <span className="text-sm font-medium">{post.shares}</span>
            </button>
          </div>

          <button className="text-gray-500 hover:text-yellow-500 transition-colors">
            <Bookmark className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="border-t border-gray-100">
          <Comments
            postId={post.id}
            comments={post.comments}
            onCommentsUpdate={handleCommentsUpdate}
          />
        </div>
      )}
    </article>
  );
};

export default Post;