import React from 'react';
import { Home, Compass, Users, Bookmark, Settings, TrendingUp, User, Award } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  const { user } = useAuth();
  
  const menuItems = [
    { id: 'feed', label: 'Home', icon: Home },
    { id: 'explore', label: 'Explore', icon: Compass },
    { id: 'trending', label: 'Trending', icon: TrendingUp },
    { id: 'leaderboard', label: 'Leaderboard', icon: Award },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-full overflow-y-auto">
      <nav className="p-4">
        <div className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-left transition-all duration-200 ${
                  activeTab === item.id
                    ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600 border border-blue-200'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Icon className={`h-5 w-5 ${
                  activeTab === item.id ? 'text-blue-600' : 'text-gray-500'
                }`} />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* User Profile Section */}
        <div className="mt-8 p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg border border-blue-100">
          <Link to={`/profile/${user?.id}`} className="block">
            <div className="flex items-center space-x-3">
              <img
                src={user?.avatar || "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"}
                alt={user?.name || "User"}
                className="h-12 w-12 rounded-full object-cover border-2 border-blue-200"
              />
              <div>
                <p className="font-semibold text-gray-900">{user?.name || "User"}</p>
                <p className="text-sm text-gray-600">@{user?.username || "username"}</p>
              </div>
            </div>
          </Link>
          <div className="mt-3 flex space-x-4 text-sm">
            <div>
              <span className="font-semibold text-gray-900">1,234</span>
              <span className="text-gray-600 ml-1">Following</span>
            </div>
            <div>
              <span className="font-semibold text-gray-900">5,678</span>
              <span className="text-gray-600 ml-1">Followers</span>
            </div>
          </div>
          <Link to="/profile/edit" className="mt-3 block w-full text-center py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors">
            Edit Profile
          </Link>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;