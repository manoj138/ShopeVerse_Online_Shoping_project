import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    if (!email) {
      toast.error('Email is required');
      return;
    }
    // Simulate sending password reset email
    toast.success('Password reset link sent to your email!');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#111827] flex flex-col items-center justify-center px-4">
      <div className="flex items-center gap-2 mb-6">
        <h1 className="text-2xl font-bold bg-linear-to-r from-[#4F46E5] to-[#9333EA] px-4 py-2 rounded-2xl text-white">S</h1>
        <h1 className="text-2xl font-bold tracking-wide text-[#7C3AED]">ShopVerse</h1>
      </div>

      <div className="w-full max-w-md space-y-6 bg-[#1f2937] p-8 rounded-xl shadow-lg border border-gray-700">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-white">Reset Password</h2>
          <p className="text-sm text-gray-400">Enter your email and we'll send you instructions to reset your password.</p>
        </div>

        <form className="flex flex-col gap-5" onSubmit={submitHandler}>
          <label className="flex flex-col gap-1 text-sm font-medium text-gray-300">
            Email Address
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="name@example.com"
              className="px-4 py-3 bg-[#111827] border border-gray-600 rounded-lg outline-none text-white focus:ring-2 focus:ring-indigo-500 transition-shadow mt-1"
            />
          </label>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-bold hover:bg-indigo-700 active:scale-[0.98] transition-all shadow-lg shadow-indigo-500/20 mt-2"
          >
            Send Reset Link
          </button>
        </form>

        <div className="text-center pt-4 border-t border-gray-700">
          <NavLink to="/login" className="text-sm font-medium text-indigo-400 hover:text-indigo-300 hover:underline transition-colors flex items-center justify-center gap-2">
            ← Back to Login
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
