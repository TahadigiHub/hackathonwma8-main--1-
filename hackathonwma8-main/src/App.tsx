import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import AuthPage from './components/auth/AuthPage';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import RightSidebar from './components/layout/RightSidebar';
import Feed from './components/feed/Feed';
import UserProfile from './components/profile/UserProfile';
import ProfileEdit from './components/profile/ProfileEdit';
import Leaderboard from './components/leaderboard/Leaderboard';
import { Loader2 } from 'lucide-react';

function App() {
  const { isAuthenticated, isLoading, user } = useAuth();
  const [activeTab, setActiveTab] = useState('feed');

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="animate-spin h-12 w-12 text-blue-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-orange-500 bg-clip-text text-transparent">
            Connectify
          </h1>
          <p className="text-gray-600 mt-2">Loading your experience...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AuthPage />;
  }

  const renderMainContent = () => {
    switch (activeTab) {
      case 'feed':
        return <Feed />;
      case 'explore':
        return (
          <div className="text-center py-10">
            <h2 className="text-2xl font-bold text-gray-800">Explore</h2>
            <p className="text-gray-600 mt-2">Discover new content and communities</p>
          </div>
        );
      case 'trending':
        return (
          <div className="text-center py-10">
            <h2 className="text-2xl font-bold text-gray-800">Trending</h2>
            <p className="text-gray-600 mt-2">See what's popular right now</p>
          </div>
        );
      case 'leaderboard':
        return (
          <div className="max-w-3xl mx-auto py-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Leaderboard</h2>
            <Leaderboard />
          </div>
        );
      case 'profile':
        return <Navigate to={`/profile/${user?.id}`} replace />;
      case 'communities':
        return (
          <div className="text-center py-10">
            <h2 className="text-2xl font-bold text-gray-800">Communities</h2>
            <p className="text-gray-600 mt-2">Join and participate in communities</p>
          </div>
        );
      case 'bookmarks':
        return (
          <div className="text-center py-10">
            <h2 className="text-2xl font-bold text-gray-800">Bookmarks</h2>
            <p className="text-gray-600 mt-2">Your saved posts and content</p>
          </div>
        );
      case 'settings':
        return (
          <div className="text-center py-10">
            <h2 className="text-2xl font-bold text-gray-800">Settings</h2>
            <p className="text-gray-600 mt-2">Manage your account and preferences</p>
          </div>
        );
      default:
        return <Feed />;
    }
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        <div className="flex">
          <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
          
          <main className="flex-1 min-h-screen p-6">
            <Routes>
              <Route path="/" element={renderMainContent()} />
              <Route path="/profile/:userId" element={<UserProfile />} />
              <Route path="/profile/edit" element={<ProfileEdit />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          
          <div className="hidden xl:block">
            <div className="sticky top-20 p-6">
              <RightSidebar />
            </div>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;