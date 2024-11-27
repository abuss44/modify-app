import React from 'react';
import { Mic, Music, Film } from 'lucide-react';
import { cn } from '../lib/utils';

interface AdditionalInputsProps {
  artist: string;
  song: string;
  movie: string;
  onInputChange: (type: 'artist' | 'song' | 'movie', value: string) => void;
  selectedInput: string | null;
  onSelectInput: (type: string | null) => void;
}

export function AdditionalInputs({
  artist,
  song,
  movie,
  onInputChange,
  selectedInput,
  onSelectInput,
}: AdditionalInputsProps) {
  const inputs = [
    { id: 'artist', label: '1 artiste', icon: Mic, value: artist },
    { id: 'song', label: '1 chanson', icon: Music, value: song },
    { id: 'movie', label: '1 film', icon: Film, value: movie },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-base font-semibold text-center text-slate-200">
        Et pour plus de précision...
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {inputs.map(({ id, label, icon: Icon, value }) => (
          <div key={id} className="space-y-2">
            <button
              onClick={() => onSelectInput(selectedInput === id ? null : id)}
              className={cn(
                "w-full p-4 rounded-lg flex items-center justify-center space-x-3 transition-all",
                "border-2 hover:border-teal-500",
                selectedInput === id
                  ? "bg-teal-500 border-teal-500 text-white"
                  : "bg-slate-800 border-slate-700 text-slate-300"
              )}
            >
              <Icon className="w-5 h-5 text-teal-500" />
              <span className="font-medium">{label}</span>
            </button>
            {selectedInput === id && (
              <input
                type="text"
                value={value}
                onChange={(e) => onInputChange(id as 'artist' | 'song' | 'movie', e.target.value)}
                placeholder={`Enter ${label.toLowerCase()}`}
                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg 
                          text-white placeholder-slate-400 focus:outline-none focus:border-teal-500
                          transition-colors"
                autoFocus
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}