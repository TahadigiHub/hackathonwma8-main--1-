import { User } from '../types';

const JWT_SECRET = 'connectify-secret-key';
const TOKEN_EXPIRY = 5 * 60 * 1000; // 5 minutes in milliseconds

export const generateToken = (user: User): string => {
  const payload = {
    userId: user.id,
    username: user.username,
    email: user.email,
    exp: Date.now() + TOKEN_EXPIRY,
    iat: Date.now() // issued at time
  };
  
  // Simple JWT-like token (in production, use proper JWT library)
  return btoa(JSON.stringify(payload));
};

// Track user activity
export const updateLastActivity = (): void => {
  localStorage.setItem('last_activity', Date.now().toString());
};

export const getLastActivity = (): number => {
  const lastActivity = localStorage.getItem('last_activity');
  return lastActivity ? parseInt(lastActivity, 10) : 0;
};

export const verifyToken = (token: string): { userId: string; username: string; email: string } | null => {
  try {
    const payload = JSON.parse(atob(token));
    
    if (payload.exp < Date.now()) {
      return null; // Token expired
    }
    
    return {
      userId: payload.userId,
      username: payload.username,
      email: payload.email
    };
  } catch {
    return null;
  }
};

export const isTokenValid = (token: string | null): boolean => {
  if (!token) return false;
  return verifyToken(token) !== null;
};

export const getStoredToken = (): string | null => {
  return localStorage.getItem('connectify_token');
};

export const setStoredToken = (token: string): void => {
  localStorage.setItem('connectify_token', token);
};

export const removeStoredToken = (): void => {
  localStorage.removeItem('connectify_token');
};