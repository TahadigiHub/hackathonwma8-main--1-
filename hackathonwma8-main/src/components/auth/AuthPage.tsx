import React, { useState } from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-orange-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl flex rounded-2xl overflow-hidden shadow-2xl bg-white">
        {/* Left side - Form */}
        <div className="flex-1 p-8 lg:p-12">
          {isLogin ? (
            <LoginForm onToggleMode={() => setIsLogin(false)} />
          ) : (
            <SignupForm onToggleMode={() => setIsLogin(true)} />
          )}
        </div>

        {/* Right side - Decorative */}
        <div className="hidden lg:flex lg:flex-1 bg-gradient-to-br from-blue-600 via-purple-600 to-orange-500 items-center justify-center p-12">
          <div className="text-center text-white">
            <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <div className="text-5xl">🌐</div>
            </div>
            <h2 className="text-3xl font-bold mb-4">
              Connect with the world
            </h2>
            <p className="text-xl opacity-90">
              Share your moments, discover amazing content, and build meaningful connections
            </p>
            <div className="mt-8 flex justify-center space-x-4">
              <div className="w-3 h-3 bg-white rounded-full opacity-60"></div>
              <div className="w-3 h-3 bg-white rounded-full"></div>
              <div className="w-3 h-3 bg-white rounded-full opacity-60"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;