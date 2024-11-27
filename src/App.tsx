import React, { useState } from 'react';
import { Header } from './components/Header';
import { MoodSelector } from './components/MoodSelector';
import { AdditionalInputs } from './components/AdditionalInputs';
import { useStore } from './store/useStore';
import { createMoodPlaylist } from './lib/spotify';

export default function App() {
  const { userSelections, updateSelections, isAuthenticated } = useStore();
  const [selectedInput, setSelectedInput] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [playlistId, setPlaylistId] = useState<string | null>(null);

  const handleMoodSelect = (moodId: string) => {
    updateSelections({ moods: [moodId] });
  };

  const handleInputChange = (type: 'artist' | 'song' | 'movie', value: string) => {
    updateSelections({
      [type === 'artist' ? 'favoriteArtist' : type === 'song' ? 'favoriteSong' : 'favoriteMovie']: value
    });
  };

  const handleGeneratePlaylist = async () => {
    if (!isAuthenticated || !userSelections.moods[0]) return;
    
    setIsGenerating(true);
    try {
      const id = await createMoodPlaylist(
        userSelections.moods[0],
        userSelections.favoriteArtist,
        userSelections.favoriteSong,
        userSelections.favoriteMovie
      );
      setPlaylistId(id);
    } catch (error) {
      console.error('Failed to generate playlist:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const canGeneratePlaylist = userSelections.moods.length === 1 && isAuthenticated;

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Header />
      <main className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold">
              Le bon son qui tombe à pic
            </h1>
            <p className="text-slate-400 text-lg">
              On part sur quel mood ?
            </p>
          </div>
          
          <MoodSelector
            selectedMoods={userSelections.moods}
            onMoodSelect={handleMoodSelect}
          />

          <AdditionalInputs
            artist={userSelections.favoriteArtist || ''}
            song={userSelections.favoriteSong || ''}
            movie={userSelections.favoriteMovie || ''}
            onInputChange={handleInputChange}
            selectedInput={selectedInput}
            onSelectInput={setSelectedInput}
          />
          
          {canGeneratePlaylist && (
            <div className="flex flex-col items-center space-y-4">
              <button
                onClick={handleGeneratePlaylist}
                disabled={isGenerating}
                className="px-8 py-3 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full 
                         font-semibold hover:opacity-90 transition-opacity disabled:opacity-50
                         disabled:cursor-not-allowed"
              >
                {isGenerating ? 'Generating...' : 'Generate Playlist'}
              </button>
              {playlistId && (
                <a
                  href={`https://open.spotify.com/playlist/${playlistId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-500 hover:text-teal-400 transition-colors"
                >
                  Open Playlist in Spotify
                </a>
              )}
            </div>
          )}

          {!isAuthenticated && canGeneratePlaylist && (
            <p className="text-center text-amber-500">
              Please connect with Spotify to generate playlists
            </p>
          )}
        </div>
      </main>
    </div>
  );
}