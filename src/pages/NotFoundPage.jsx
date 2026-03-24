import React from 'react';
import { Link } from 'react-router-dom';
import { Home, AlertCircle } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen pt-32 bg-gradient-to-br from-[#0b1220] to-[#050814] flex flex-col items-center justify-center p-6 text-white text-center">
      <div className="bg-[#141a26] p-12 rounded-3xl border border-gray-800 shadow-2xl flex flex-col items-center max-w-lg w-full">
        <div className="bg-red-500/10 p-6 rounded-full mb-6">
          <AlertCircle className="w-20 h-20 text-red-500" />
        </div>
        <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-pink-600 mb-4">
          404
        </h1>
        <h2 className="text-2xl font-bold mb-3">Page Not Found</h2>
        <p className="text-gray-400 mb-8 leading-relaxed">
          Oops! It looks like you've wandered into an unknown galaxy. The page you are looking for doesn't exist or has been moved.
        </p>
        <Link 
          to="/" 
          className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 px-8 py-3 rounded-xl font-semibold hover:opacity-90 transition-all shadow-lg shadow-indigo-500/20 transform hover:-translate-y-1"
        >
          <Home size={20} />
          Return Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
