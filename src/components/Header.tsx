import React from 'react';
import { Music2 } from 'lucide-react';
import { useStore } from '../store/useStore';
import { spotifyApi } from '../lib/spotify';

export function Header() {
  const { isAuthenticated, setAuthenticated } = useStore();

  const handleLogin = async () => {
    try {
      await spotifyApi.authenticate();
      setAuthenticated(true);
    } catch (error) {
      console.error('Authentication failed:', error);
    }
  };

  return (
    <header className="fixed top-0 w-full bg-slate-900/95 backdrop-blur supports-[backdrop-filter]:bg-slate-900/75 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Music2 className="w-8 h-8 text-teal-500" />
          <span className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-blue-500 text-transparent bg-clip-text">
            Moodify
          </span>
        </div>
        <nav className="flex items-center space-x-4">
          <button
            onClick={handleLogin}
            className="px-4 py-2 rounded-full bg-teal-500 hover:bg-teal-600 text-white transition-colors"
          >
            {isAuthenticated ? 'Connected to Spotify' : 'Connect with Spotify'}
          </button>
        </nav>
      </div>
    </header>
  );
}