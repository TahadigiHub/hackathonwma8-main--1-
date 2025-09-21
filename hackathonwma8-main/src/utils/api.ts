import { User, Post, Comment, LoginCredentials, SignupCredentials } from '../types';
import { generateToken } from './auth';

// Extended User type with points
interface UserWithPoints extends User {
  points: number;
}

// Mock database
// Mock users with points
const mockUsersWithPoints: UserWithPoints[] = [
  {
    id: '1',
    username: 'taharoshaan',
    email: 'taha@connectify.com',
    avatar: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    bio: 'Digital creator and tech enthusiast 🚀',
    verified: true,
    createdAt: '2024-01-15T10:00:00Z',
    points: 1250
  },
  {
    id: '2',
    username: 'sarah_jones',
    email: 'sarah@example.com',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    bio: 'Travel blogger & photographer 📸',
    verified: false,
    createdAt: '2024-01-10T10:00:00Z',
    points: 980
  },
  {
    id: '3',
    username: 'mike_dev',
    email: 'mike@example.com',
    avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    bio: 'Full-stack developer 💻',
    verified: true,
    createdAt: '2024-01-08T10:00:00Z',
    points: 1560
  },
  {
    id: '4',
    username: 'alex_tech',
    email: 'alex@example.com',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    bio: 'Tech enthusiast & gamer 🎮',
    verified: false,
    createdAt: '2024-01-05T10:00:00Z',
    points: 2100
  },
  {
    id: '5',
    username: 'emma_design',
    email: 'emma@example.com',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    bio: 'UX/UI Designer creating beautiful experiences ✨',
    verified: true,
    createdAt: '2024-01-12T10:00:00Z',
    points: 1850
  },
  {
    id: '6',
    username: 'david_code',
    email: 'david@example.com',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    bio: 'Software engineer building the future 🔧',
    verified: false,
    createdAt: '2024-01-09T10:00:00Z',
    points: 1340
  },
  {
    id: '7',
    username: 'lisa_travel',
    email: 'lisa@example.com',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    bio: 'World traveler sharing adventures 🌎',
    verified: true,
    createdAt: '2024-01-14T10:00:00Z',
    points: 2450
  },
  {
    id: '8',
    username: 'john_music',
    email: 'john@example.com',
    avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    bio: 'Music producer and DJ 🎵',
    verified: false,
    createdAt: '2024-01-11T10:00:00Z',
    points: 890
  },
  {
    id: '9',
    username: 'sophia_art',
    email: 'sophia@example.com',
    avatar: 'https://images.pexels.com/photos/1024311/pexels-photo-1024311.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    bio: 'Digital artist creating magical worlds 🎨',
    verified: true,
    createdAt: '2024-01-13T10:00:00Z',
    points: 1780
  },
  {
    id: '10',
    username: 'ryan_fitness',
    email: 'ryan@example.com',
    avatar: 'https://images.pexels.com/photos/1121796/pexels-photo-1121796.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    bio: 'Fitness coach helping you reach your goals 💪',
    verified: false,
    createdAt: '2024-01-07T10:00:00Z',
    points: 1650
  }
];

// Convert to regular User array for compatibility with existing code
const mockUsers: User[] = mockUsersWithPoints.map(({ points, ...user }) => user);

// Function to get top users by points
export const getTopUsers = async (): Promise<UserWithPoints[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Sort users by points in descending order and return top 10
  return [...mockUsersWithPoints].sort((a, b) => b.points - a.points).slice(0, 10);
};

// Function to create a new post
export const createPost = async (userId: string, content: string, image?: string): Promise<Post> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const user = mockUsers.find(u => u.id === userId);
  if (!user) {
    throw new Error('User not found');
  }
  
  const newPost: Post = {
    id: String(Date.now()),
    userId: user.id,
    username: user.username,
    avatar: user.avatar,
    content,
    image: image || '',
    likes: 0,
    comments: [],
    shares: 0,
    createdAt: new Date().toISOString(),
    isLiked: false,
    verified: user.verified
  };
  
  mockPosts.unshift(newPost);
  return newPost;
};

// Function to update a post
export const updatePost = async (postId: string, userId: string, content: string, image?: string): Promise<Post> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const postIndex = mockPosts.findIndex(p => p.id === postId);
  if (postIndex === -1) {
    throw new Error('Post not found');
  }
  
  const post = mockPosts[postIndex];
  if (post.userId !== userId) {
    throw new Error('Unauthorized: You can only edit your own posts');
  }
  
  const updatedPost = {
    ...post,
    content,
    image: image !== undefined ? image : post.image,
    updatedAt: new Date().toISOString()
  };
  
  mockPosts[postIndex] = updatedPost;
  return updatedPost;
};

// Function to delete a post
export const deletePost = async (postId: string, userId: string): Promise<boolean> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const postIndex = mockPosts.findIndex(p => p.id === postId);
  if (postIndex === -1) {
    throw new Error('Post not found');
  }
  
  const post = mockPosts[postIndex];
  if (post.userId !== userId) {
    throw new Error('Unauthorized: You can only delete your own posts');
  }
  
  mockPosts.splice(postIndex, 1);
  return true;
};

const mockPosts: Post[] = [
  {
    id: '1',
    userId: '1',
    username: 'taharoshaan',
    avatar: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    content: 'Just launched my new project on Connectify! The future of social networking is here 🚀 #Innovation #TechLife',
    image: 'https://images.pexels.com/photos/1181216/pexels-photo-1181216.jpeg?auto=compress&cs=tinysrgb&w=600',
    likes: 128,
    comments: [],
    shares: 24,
    createdAt: '2024-01-20T14:30:00Z',
    isLiked: false,
    verified: true
  },
  {
    id: '2',
    userId: '2',
    username: 'sarah_jones',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    content: 'Amazing sunset from my latest adventure in Santorini! Sometimes you need to disconnect to reconnect ✨',
    image: 'https://images.pexels.com/photos/1566909/pexels-photo-1566909.jpeg?auto=compress&cs=tinysrgb&w=600',
    likes: 342,
    comments: [],
    shares: 67,
    createdAt: '2024-01-20T12:15:00Z',
    isLiked: true,
    verified: false
  },
  {
    id: '3',
    userId: '3',
    username: 'mike_dev',
    avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    content: 'Coffee, code, repeat ☕ Working on an exciting new feature for our platform. Can\'t wait to share it with you all!',
    likes: 89,
    comments: [],
    shares: 12,
    createdAt: '2024-01-20T09:45:00Z',
    isLiked: false,
    verified: true
  },
  {
    id: '4',
    userId: '2',
    username: 'sarah_jones',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    content: 'Just finished reading this amazing book on mindfulness. Highly recommend it to anyone looking to reduce stress and improve focus 📚',
    image: 'https://images.pexels.com/photos/590493/pexels-photo-590493.jpeg?auto=compress&cs=tinysrgb&w=600',
    likes: 156,
    comments: [],
    shares: 28,
    createdAt: '2024-01-19T17:30:00Z',
    isLiked: false,
    verified: false
  },
  {
    id: '5',
    userId: '3',
    username: 'mike_dev',
    avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    content: 'Just solved a complex algorithm problem that\'s been bugging me for days! The key was using dynamic programming instead of a greedy approach 💡 #CodingLife',
    likes: 201,
    comments: [],
    shares: 45,
    createdAt: '2024-01-19T14:20:00Z',
    isLiked: true,
    verified: true
  },
  {
    id: '6',
    userId: '1',
    username: 'taharoshaan',
    avatar: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    content: 'Attended an amazing tech conference today! Met so many brilliant minds and got inspired by the future of AI and machine learning 🤖 #TechConference',
    image: 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=600',
    likes: 278,
    comments: [],
    shares: 56,
    createdAt: '2024-01-19T10:15:00Z',
    isLiked: false,
    verified: true
  },
  {
    id: '7',
    userId: '2',
    username: 'sarah_jones',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    content: 'Morning hike with the most breathtaking view! Nature always has a way of putting things into perspective 🏞️ #MorningHike #NatureLover',
    image: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=600',
    likes: 312,
    comments: [],
    shares: 78,
    createdAt: '2024-01-18T08:45:00Z',
    isLiked: true,
    verified: false
  },
  {
    id: '8',
    userId: '3',
    username: 'mike_dev',
    avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    content: 'Just released a new open-source library for React developers! Check it out on GitHub and let me know what you think 🚀 #OpenSource #ReactJS',
    likes: 189,
    comments: [],
    shares: 92,
    createdAt: '2024-01-18T16:30:00Z',
    isLiked: false,
    verified: true
  },
  {
    id: '9',
    userId: '1',
    username: 'taharoshaan',
    avatar: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    content: 'Just finished my morning workout routine. Starting the day with exercise really sets a positive tone for everything else! 💪 #FitnessJourney',
    image: 'https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?auto=compress&cs=tinysrgb&w=600',
    likes: 145,
    comments: [],
    shares: 23,
    createdAt: '2024-01-17T07:30:00Z',
    isLiked: true,
    verified: true
  },
  {
    id: '10',
    userId: '2',
    username: 'sarah_jones',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    content: 'Exploring the local farmers market today! Supporting local businesses and getting fresh produce is a win-win 🥕🍎 #ShopLocal',
    image: 'https://images.pexels.com/photos/95425/pexels-photo-95425.jpeg?auto=compress&cs=tinysrgb&w=600',
    likes: 167,
    comments: [],
    shares: 34,
    createdAt: '2024-01-17T11:20:00Z',
    isLiked: false,
    verified: false
  },
  {
    id: '11',
    userId: '3',
    username: 'mike_dev',
    avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    content: 'Working from a cozy cafe today. Sometimes a change of environment is all you need to boost productivity! ☕💻 #RemoteWork',
    image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=600',
    likes: 203,
    comments: [],
    shares: 41,
    createdAt: '2024-01-16T13:45:00Z',
    isLiked: true,
    verified: true
  },
  {
    id: '12',
    userId: '1',
    username: 'taharoshaan',
    avatar: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    content: 'Just watched an incredible documentary on space exploration. The universe is so vast and mysterious! 🌌 #SpaceLovers',
    likes: 231,
    comments: [],
    shares: 67,
    createdAt: '2024-01-16T20:10:00Z',
    isLiked: false,
    verified: true
  },
  {
    id: '13',
    userId: '2',
    username: 'sarah_jones',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    content: 'Trying out a new vegan recipe today! Surprised by how delicious plant-based meals can be 🌱 #VeganCooking',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600',
    likes: 178,
    comments: [],
    shares: 39,
    createdAt: '2024-01-15T18:30:00Z',
    isLiked: true,
    verified: false
  },
  {
    id: '14',
    userId: '3',
    username: 'mike_dev',
    avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    content: 'Just upgraded my development setup with a new mechanical keyboard. The typing experience is on another level! ⌨️ #DevSetup',
    image: 'https://images.pexels.com/photos/1772123/pexels-photo-1772123.jpeg?auto=compress&cs=tinysrgb&w=600',
    likes: 156,
    comments: [],
    shares: 28,
    createdAt: '2024-01-15T14:15:00Z',
    isLiked: false,
    verified: true
  },
  {
    id: '15',
    userId: '1',
    username: 'taharoshaan',
    avatar: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    content: 'Spent the weekend mentoring young coders at a local hackathon. So inspiring to see the next generation of tech talent! 👩‍💻👨‍💻 #GivingBack',
    likes: 289,
    comments: [],
    shares: 76,
    createdAt: '2024-01-14T19:45:00Z',
    isLiked: true,
    verified: true
  },
  {
    id: '16',
    userId: '2',
    username: 'sarah_jones',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    content: 'Just finished my first pottery class! There\'s something so therapeutic about creating with your hands 🏺 #NewHobby',
    image: 'https://images.pexels.com/photos/1098365/pexels-photo-1098365.jpeg?auto=compress&cs=tinysrgb&w=600',
    likes: 201,
    comments: [],
    shares: 42,
    createdAt: '2024-01-14T16:20:00Z',
    isLiked: false,
    verified: false
  },
  {
    id: '17',
    userId: '3',
    username: 'mike_dev',
    avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    content: 'Just discovered this amazing productivity technique that\'s changed my workflow completely! Anyone else tried the Pomodoro method? ⏱️ #Productivity',
    likes: 167,
    comments: [],
    shares: 53,
    createdAt: '2024-01-13T11:30:00Z',
    isLiked: true,
    verified: true
  },
  {
    id: '18',
    userId: '1',
    username: 'taharoshaan',
    avatar: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    content: 'Celebrating 5 years at my company today! Grateful for the amazing journey, challenges, and growth opportunities 🎉 #WorkAnniversary',
    image: 'https://images.pexels.com/photos/3184183/pexels-photo-3184183.jpeg?auto=compress&cs=tinysrgb&w=600',
    likes: 312,
    comments: [],
    shares: 87,
    createdAt: '2024-01-13T09:15:00Z',
    isLiked: false,
    verified: true
  },
  {
    id: '19',
    userId: '2',
    username: 'sarah_jones',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    content: 'Just adopted this adorable rescue puppy! Meet Max, the newest member of our family 🐶 #AdoptDontShop',
    image: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=600',
    likes: 423,
    comments: [],
    shares: 112,
    createdAt: '2024-01-12T15:40:00Z',
    isLiked: true,
    verified: false
  },
  {
    id: '20',
    userId: '3',
    username: 'mike_dev',
    avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    content: 'Just published my first technical article on Medium! It\'s about optimizing React performance. Would love your feedback! 📝 #TechWriting',
    image: 'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=600',
    likes: 245,
    comments: [],
    shares: 89,
    createdAt: '2024-01-12T10:25:00Z',
    isLiked: false,
    verified: true
  }
];

let mockComments: Comment[] = [
  {
    id: '1',
    postId: '1',
    userId: '2',
    username: 'sarah_jones',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    content: 'This looks incredible! Can\'t wait to try it out 🔥',
    createdAt: '2024-01-20T15:00:00Z',
    likes: 12,
    isLiked: false
  },
  {
    id: '2',
    postId: '2',
    userId: '3',
    username: 'mike_dev',
    avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    content: 'Absolutely stunning! Greece is definitely on my travel list now 🏛️',
    createdAt: '2024-01-20T13:30:00Z',
    likes: 8,
    isLiked: true
  }
];

// Update posts with comments
mockPosts.forEach(post => {
  post.comments = mockComments.filter(comment => comment.postId === post.id);
});

export const login = async (credentials: LoginCredentials): Promise<{ user: User; token: string }> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const user = mockUsers.find(u => u.email === credentials.email);
  
  if (!user || credentials.password !== 'password123') {
    throw new Error('Invalid email or password');
  }
  
  const token = generateToken(user);
  
  return { user, token };
};

export const signup = async (credentials: SignupCredentials): Promise<{ user: User; token: string }> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  if (mockUsers.some(u => u.email === credentials.email)) {
    throw new Error('Email already exists');
  }
  
  if (mockUsers.some(u => u.username === credentials.username)) {
    throw new Error('Username already taken');
  }
  
  if (credentials.password !== credentials.confirmPassword) {
    throw new Error('Passwords do not match');
  }
  
  const newUser: User = {
    id: String(mockUsers.length + 1),
    username: credentials.username,
    email: credentials.email,
    avatar: `https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop`,
    bio: 'New to Connectify! 👋',
    verified: false,
    createdAt: new Date().toISOString()
  };
  
  mockUsers.push(newUser);
  const token = generateToken(newUser);
  
  return { user: newUser, token };
};

export const getPosts = async (): Promise<Post[]> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockPosts.map(post => ({
    ...post,
    comments: mockComments.filter(comment => comment.postId === post.id)
  }));
};

export const addComment = async (postId: string, content: string, userId: string): Promise<Comment> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const user = mockUsers.find(u => u.id === userId);
  if (!user) throw new Error('User not found');
  
  const newComment: Comment = {
    id: String(mockComments.length + 1),
    postId,
    userId,
    username: user.username,
    avatar: user.avatar,
    content,
    createdAt: new Date().toISOString(),
    likes: 0,
    isLiked: false
  };
  
  mockComments.push(newComment);
  return newComment;
};

export const deleteComment = async (commentId: string): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const index = mockComments.findIndex(c => c.id === commentId);
  if (index > -1) {
    mockComments.splice(index, 1);
  }
};

export const editComment = async (commentId: string, content: string): Promise<Comment> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const comment = mockComments.find(c => c.id === commentId);
  if (!comment) throw new Error('Comment not found');
  
  comment.content = content;
  return comment;
};

// Vote on a post
export const votePost = async (postId: string): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 200));
  
  const post = mockPosts.find(p => p.id === postId);
  if (post && !post.isLiked) {
    post.isLiked = true;
    post.likes += 10; // Add 10 points for upvote
  }
};

// Unvote a post
export const unvotePost = async (postId: string): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 200));
  
  const post = mockPosts.find(p => p.id === postId);
  if (post && post.isLiked) {
    post.isLiked = false;
    post.likes -= 10; // Subtract 10 points for downvote
  }
};

export const getUserById = async (userId: string): Promise<User> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const user = mockUsers.find(u => u.id === userId);
  if (!user) throw new Error('User not found');
  
  return user;
};

export const getUserPosts = async (userId: string): Promise<Post[]> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return mockPosts
    .filter(post => post.userId === userId)
    .map(post => ({
      ...post,
      comments: mockComments.filter(comment => comment.postId === post.id)
    }));
};

export const updateUserProfile = async (userId: string, profileData: { username: string; bio: string; avatar: string }): Promise<User> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const userIndex = mockUsers.findIndex(u => u.id === userId);
  if (userIndex === -1) throw new Error('User not found');
  
  // Update user data
  mockUsers[userIndex] = {
    ...mockUsers[userIndex],
    username: profileData.username,
    bio: profileData.bio,
    avatar: profileData.avatar
  };
  
  // Update username in posts
  mockPosts.forEach(post => {
    if (post.userId === userId) {
      post.username = profileData.username;
      post.avatar = profileData.avatar;
    }
  });
  
  // Update username in comments
  mockComments.forEach(comment => {
    if (comment.userId === userId) {
      comment.username = profileData.username;
      comment.avatar = profileData.avatar;
    }
  });
  
  return mockUsers[userIndex];
};