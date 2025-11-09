import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Phone, Chrome, Facebook } from 'lucide-react';
import { authApi } from '../services/api';
import { toast } from 'react-hot-toast';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
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
    
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      setIsLoading(true);
      await authApi.register({
        username: formData.username,
        email: formData.email,
        password: formData.password,
        phone: formData.phone
      });
      
      toast.success('Account created successfully!');
      navigate('/login'); // Redirect to login page after successful registration
    } catch (error) {
      console.error('Registration error:', error);
      toast.error(error.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex pt-24 items-center justify-center bg-gradient-to-br from-[#7C3AED] via-[#5B21B6] to-[#4338CA]">
      <div className="max-w-md w-full m-4 space-y-6 bg-white/5 backdrop-blur-md p-8 rounded-3xl shadow-2xl border border-white/10">
        {/* Header */}
        <div className="space-y-2">
          <h2 className="text-center text-4xl font-bold text-white tracking-tight">
            Create Account
          </h2>
          <p className="text-center text-base text-gray-200">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-[#A78BFA] hover:text-[#8B5CF6] transition-colors duration-300">
              Sign in
            </Link>
          </p>
        </div>

        {/* Form */}
        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="relative group">
              <label htmlFor="username" className="block text-sm font-medium text-gray-200 mb-1">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="block w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-300 
                           focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent transition duration-200
                           hover:bg-white/10"
                  placeholder="Enter your username"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>
            </div>

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
              <label htmlFor="phone" className="block text-sm font-medium text-gray-200 mb-1">
                Phone number
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  className="block w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-300 
                           focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent transition duration-200
                           hover:bg-white/10"
                  placeholder="Enter your phone number"
                  value={formData.phone}
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
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="relative group">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-200 mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  className="block w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-300 
                           focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent transition duration-200
                           hover:bg-white/10"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="flex items-center">
            <input
              id="acceptTerms"
              name="acceptTerms"
              type="checkbox"
              required
              className="h-4 w-4 rounded border-gray-300 text-[#8B5CF6] focus:ring-[#8B5CF6] bg-white/5"
              checked={formData.acceptTerms}
              onChange={handleChange}
            />
            <label htmlFor="acceptTerms" className="ml-2 block text-sm text-gray-200">
              I accept the{' '}
              <Link to="/terms" className="font-semibold text-[#A78BFA] hover:text-[#8B5CF6] transition-colors duration-300">
                Terms and Conditions
              </Link>
            </label>
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
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>
          </div>

          {/* Social Signup */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-6 py-1.5 bg-[#5B21B6]/50 text-gray-200 rounded-full border border-white/10 backdrop-blur-sm">
                  Or sign up with
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

export default Signup;
