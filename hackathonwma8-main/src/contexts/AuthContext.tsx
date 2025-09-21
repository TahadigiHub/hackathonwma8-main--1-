import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { AuthState, User, LoginCredentials, SignupCredentials } from '../types';
import { login as apiLogin, signup as apiSignup } from '../utils/api';
import { 
  getStoredToken, 
  setStoredToken, 
  removeStoredToken, 
  verifyToken, 
  updateLastActivity,
  getLastActivity
} from '../utils/auth';

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  signup: (credentials: SignupCredentials) => Promise<void>;
  logout: () => void;
  updateUser: (updatedUser: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: true
  });

  // Logout function defined early so it can be used in useEffect
  const logout = useCallback(() => {
    removeStoredToken();
    setState({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false
    });
  }, []);

  // Check for inactivity and auto-logout
  useEffect(() => {
    if (!state.isAuthenticated) return;
    
    // Update activity timestamp on any user interaction
    const handleUserActivity = () => {
      updateLastActivity();
    };

    // Add event listeners for user activity
    window.addEventListener('mousemove', handleUserActivity);
    window.addEventListener('keydown', handleUserActivity);
    window.addEventListener('click', handleUserActivity);
    window.addEventListener('scroll', handleUserActivity);
    
    // Set initial activity timestamp
    updateLastActivity();
    
    // Check for inactivity every minute
    const inactivityCheckInterval = setInterval(() => {
      const lastActivity = getLastActivity();
      const inactiveTime = Date.now() - lastActivity;
      
      // Auto logout after 5 minutes of inactivity
      if (inactiveTime > 5 * 60 * 1000) {
        console.log('Auto-logout due to inactivity');
        logout();
      }
    }, 60 * 1000);
    
    return () => {
      window.removeEventListener('mousemove', handleUserActivity);
      window.removeEventListener('keydown', handleUserActivity);
      window.removeEventListener('click', handleUserActivity);
      window.removeEventListener('scroll', handleUserActivity);
      clearInterval(inactivityCheckInterval);
    };
  }, [state.isAuthenticated, logout]);

  useEffect(() => {
    const token = getStoredToken();
    
    if (token) {
      const payload = verifyToken(token);
      
      if (payload) {
        setState({
          user: {
            id: payload.userId,
            username: payload.username,
            email: payload.email,
            avatar: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
            createdAt: new Date().toISOString()
          },
          token,
          isAuthenticated: true,
          isLoading: false
        });
        // Set initial activity timestamp on login
        updateLastActivity();
      } else {
        removeStoredToken();
        setState(prev => ({ ...prev, isLoading: false }));
      }
    } else {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  const login = async (credentials: LoginCredentials) => {
    setState(prev => ({ ...prev, isLoading: true }));
    
    try {
      const { user, token } = await apiLogin(credentials);
      setStoredToken(token);
      
      setState({
        user,
        token,
        isAuthenticated: true,
        isLoading: false
      });
    } catch (error) {
      setState(prev => ({ ...prev, isLoading: false }));
      throw error;
    }
  };

  const signup = async (credentials: SignupCredentials) => {
    setState(prev => ({ ...prev, isLoading: true }));
    
    try {
      const { user, token } = await apiSignup(credentials);
      setStoredToken(token);
      
      setState({
        user,
        token,
        isAuthenticated: true,
        isLoading: false
      });
    } catch (error) {
      setState(prev => ({ ...prev, isLoading: false }));
      throw error;
    }
  };

  // This logout function is now defined earlier as a useCallback

  const updateUser = (updatedUser: User) => {
    setState(prev => ({
      ...prev,
      user: updatedUser
    }));
  };

  return (
    <AuthContext.Provider value={{ ...state, login, signup, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};