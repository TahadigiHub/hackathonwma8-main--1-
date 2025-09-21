export interface User {
  id: string;
  username: string;
  email: string;
  avatar: string;
  bio?: string;
  verified?: boolean;
  createdAt: string;
}

export interface Post {
  id: string;
  userId: string;
  username: string;
  avatar: string;
  content: string;
  image?: string;
  likes: number;
  comments: Comment[];
  shares: number;
  createdAt: string;
  isLiked: boolean;
  verified?: boolean;
}

export interface Comment {
  id: string;
  postId: string;
  userId: string;
  username: string;
  avatar: string;
  content: string;
  createdAt: string;
  likes: number;
  isLiked: boolean;
}

export interface Story {
  id: string;
  userId: string;
  username: string;
  avatar: string;
  image: string;
  createdAt: string;
  viewed: boolean;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}