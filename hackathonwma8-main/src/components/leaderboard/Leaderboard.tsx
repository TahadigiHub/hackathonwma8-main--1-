import React, { useEffect, useState } from 'react';
import { getTopUsers } from '../../utils/api';
import { Trophy, Medal } from 'lucide-react';

interface UserWithPoints {
  id: string;
  username: string;
  avatar: string;
  verified: boolean;
  points: number;
}

const Leaderboard: React.FC = () => {
  const [topUsers, setTopUsers] = useState<UserWithPoints[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopUsers = async () => {
      try {
        const users = await getTopUsers();
        setTopUsers(users);
      } catch (error) {
        console.error('Error fetching top users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopUsers();
  }, []);

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Trophy className="h-5 w-5 text-yellow-500" />;
      case 1:
        return <Trophy className="h-5 w-5 text-gray-400" />;
      case 2:
        return <Trophy className="h-5 w-5 text-amber-700" />;
      default:
        return <Medal className="h-5 w-5 text-blue-500" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-xl font-bold mb-4 text-center">Leaderboard</h2>
      <p className="text-sm text-gray-500 mb-4 text-center">Top 10 users by points</p>
      
      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="space-y-3">
          {topUsers.map((user, index) => (
            <div 
              key={user.id} 
              className="flex items-center p-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center justify-center w-8 mr-2">
                {getRankIcon(index)}
              </div>
              <div className="flex items-center flex-1">
                <img 
                  src={user.avatar} 
                  alt={user.username} 
                  className="h-10 w-10 rounded-full object-cover mr-3"
                />
                <div>
                  <div className="flex items-center">
                    <span className="font-medium">{user.username}</span>
                    {user.verified && (
                      <span className="ml-1 text-blue-500">
                        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                        </svg>
                      </span>
                    )}
                  </div>
                  <span className="text-sm text-gray-500">#{index + 1}</span>
                </div>
              </div>
              <div className="font-bold text-blue-600">{user.points} pts</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Leaderboard;