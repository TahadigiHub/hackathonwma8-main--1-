import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { Story } from '../../types';

const mockStories: Story[] = [
  {
    id: '1',
    userId: '1',
    username: 'Your Story',
    avatar: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    image: '',
    createdAt: new Date().toISOString(),
    viewed: false
  },
  {
    id: '2',
    userId: '2',
    username: 'sarah_jones',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    image: 'https://images.pexels.com/photos/1566909/pexels-photo-1566909.jpeg?auto=compress&cs=tinysrgb&w=300&h=500&fit=crop',
    createdAt: '2024-01-20T10:00:00Z',
    viewed: false
  },
  {
    id: '3',
    userId: '3',
    username: 'mike_dev',
    avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    image: 'https://images.pexels.com/photos/574069/pexels-photo-574069.jpeg?auto=compress&cs=tinysrgb&w=300&h=500&fit=crop',
    createdAt: '2024-01-20T08:30:00Z',
    viewed: true
  },
  {
    id: '4',
    userId: '4',
    username: 'alex_travel',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    image: 'https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg?auto=compress&cs=tinysrgb&w=300&h=500&fit=crop',
    createdAt: '2024-01-20T09:15:00Z',
    viewed: false
  },
  {
    id: '5',
    userId: '5',
    username: 'emma_design',
    avatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    image: 'https://images.pexels.com/photos/1918290/pexels-photo-1918290.jpeg?auto=compress&cs=tinysrgb&w=300&h=500&fit=crop',
    createdAt: '2024-01-20T11:45:00Z',
    viewed: false
  },
  {
    id: '6',
    userId: '6',
    username: 'david_chef',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=300&h=500&fit=crop',
    createdAt: '2024-01-20T12:30:00Z',
    viewed: false
  },
  {
    id: '7',
    userId: '7',
    username: 'sophia_art',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    image: 'https://images.pexels.com/photos/1194420/pexels-photo-1194420.jpeg?auto=compress&cs=tinysrgb&w=300&h=500&fit=crop',
    createdAt: '2024-01-20T13:15:00Z',
    viewed: false
  },
  {
    id: '8',
    userId: '8',
    username: 'james_music',
    avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    image: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=300&h=500&fit=crop',
    createdAt: '2024-01-20T14:00:00Z',
    viewed: false
  },
  {
    id: '9',
    userId: '9',
    username: 'olivia_fit',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    image: 'https://images.pexels.com/photos/2294361/pexels-photo-2294361.jpeg?auto=compress&cs=tinysrgb&w=300&h=500&fit=crop',
    createdAt: '2024-01-20T15:30:00Z',
    viewed: false
  },
  {
    id: '10',
    userId: '10',
    username: 'noah_tech',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    image: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=300&h=500&fit=crop',
    createdAt: '2024-01-20T16:15:00Z',
    viewed: false
  }
];

const Stories: React.FC = () => {
  const [activeStory, setActiveStory] = useState<Story | null>(null);
  const [storyProgress, setStoryProgress] = useState(0);

  const openStory = (story: Story) => {
    if (story.id !== '1') { // Don't open "Your Story"
      setActiveStory(story);
      setStoryProgress(0);
    }
  };

  const closeStory = () => {
    setActiveStory(null);
    setStoryProgress(0);
  };

  // Auto-progress the story
  React.useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (activeStory) {
      timer = setInterval(() => {
        setStoryProgress(prev => {
          if (prev >= 100) {
            clearInterval(timer);
            setTimeout(() => closeStory(), 500);
            return 100;
          }
          return prev + 1;
        });
      }, 50); // 5 seconds total (50ms * 100)
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [activeStory]);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Stories</h2>
      
      <div className="flex space-x-4 overflow-x-auto pb-2">
        {mockStories.map((story) => (
          <div 
            key={story.id} 
            className="flex-shrink-0 text-center cursor-pointer group"
            onClick={() => openStory(story)}
          >
            <div className={`relative w-16 h-16 rounded-full p-1 ${
              story.id === '1' 
                ? 'bg-gradient-to-tr from-gray-300 to-gray-400' 
                : story.viewed 
                  ? 'bg-gray-300' 
                  : 'bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500'
            }`}>
              <div className="w-full h-full rounded-full overflow-hidden bg-white p-0.5">
                {story.id === '1' ? (
                  <div className="w-full h-full rounded-full bg-gray-100 flex items-center justify-center">
                    <Plus className="w-6 h-6 text-gray-600" />
                  </div>
                ) : (
                  <img
                    src={story.avatar}
                    alt={story.username}
                    className="w-full h-full rounded-full object-cover"
                  />
                )}
              </div>
            </div>
            
            <p className="mt-2 text-xs text-gray-600 truncate max-w-[64px] group-hover:text-blue-600 transition-colors">
              {story.username}
            </p>
          </div>
        ))}
      </div>

      {/* Story Viewer Modal */}
      {activeStory && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
          <div className="relative w-full max-w-md h-[80vh] overflow-hidden rounded-lg">
            {/* Progress bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gray-700 z-10">
              <div 
                className="h-full bg-white transition-all duration-50 ease-linear" 
                style={{ width: `${storyProgress}%` }}
              ></div>
            </div>
            
            {/* User info */}
            <div className="absolute top-4 left-4 right-4 flex items-center z-10">
              <img 
                src={activeStory.avatar} 
                alt={activeStory.username}
                className="w-10 h-10 rounded-full border-2 border-white"
              />
              <div className="ml-3 text-white">
                <p className="font-semibold">{activeStory.username}</p>
                <p className="text-xs opacity-80">
                  {new Date(activeStory.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </p>
              </div>
            </div>
            
            {/* Close button */}
            <button 
              onClick={closeStory}
              className="absolute top-4 right-4 z-10 text-white p-1 rounded-full hover:bg-white hover:bg-opacity-20"
            >
              <X className="w-6 h-6" />
            </button>
            
            {/* Story image */}
            <img 
              src={activeStory.image} 
              alt="Story"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Stories;