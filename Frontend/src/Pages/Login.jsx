import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Facebook, Chrome } from 'lucide-react';
import { authApi } from '../services/api';
import { toast } from 'react-hot-toast';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await authApi.login({
        email: formData.email,
        password: formData.password
      });
      
      toast.success('Login successful!');
      navigate('/'); // Redirect to home page after successful login
    } catch (error) {
      console.error('Login error:', error);
      toast.error(error.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center pt-24 justify-center bg-gradient-to-br from-[#7C3AED] via-[#5B21B6] to-[#4338CA]">
      <div className="max-w-md w-full m-4 space-y-6 bg-white/5 backdrop-blur-md p-8 rounded-3xl shadow-2xl border border-white/10">
        {/* Header */}
        <div className="space-y-2">
          <h2 className="text-center text-4xl font-bold text-white tracking-tight">
            Welcome Back
          </h2>
          <p className="text-center text-base text-gray-200">
            Don't have an account?{' '}
            <Link to="/register" className="font-semibold text-[#A78BFA] hover:text-[#8B5CF6] transition-colors duration-300">
              Sign up
            </Link>
          </p>
        </div>

        {/* Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="relative group">
              <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-1">
                Email address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="block w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-300 
                           focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent transition duration-200
                           hover:bg-white/10"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="relative group">
              <label htmlFor="password" className="block text-sm font-medium text-gray-200 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="block w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-300 
                           focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent transition duration-200
                           hover:bg-white/10"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="rememberMe"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500 bg-white/10"
                checked={formData.rememberMe}
                onChange={handleChange}
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-200">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <Link to="/forgot-password" className="font-medium text-blue-300 hover:text-blue-200 transition-colors duration-300">
                Forgot password?
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-3 px-4 rounded-xl text-white text-lg font-semibold
                       bg-gradient-to-r from-[#8B5CF6] to-[#6D28D9] hover:from-[#7C3AED] hover:to-[#5B21B6]
                       focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:ring-offset-2 focus:ring-offset-[#5B21B6]
                       transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-lg"
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>

          {/* Social Login */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-6 py-1.5 bg-[#5B21B6]/50 text-gray-200 rounded-full border border-white/10 backdrop-blur-sm">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <button
                type="button"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl
                         bg-white/5 hover:bg-white/10 border border-white/10
                         text-white transition duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-md"
              >
                <Chrome className="w-5 h-5 text-red-500" />
                <span>Google</span>
              </button>

              <button
                type="button"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl
                         bg-white/5 hover:bg-white/10 border border-white/10
                         text-white transition duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-md"
              >
                <Facebook className="w-5 h-5 text-blue-500" />
                <span>Facebook</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
