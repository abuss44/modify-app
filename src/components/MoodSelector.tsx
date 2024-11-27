import React from 'react';
import { Brush, Book, PartyPopper, Moon, Building2, Landmark } from 'lucide-react';
import { cn } from '../lib/utils';
import { Mood } from '../types';

const moods: Mood[] = [
  { id: 'energetic', label: 'Le grand ménage', icon: 'Brush' },
  { id: 'relaxed', label: 'Canapbook', icon: 'Book' },
  { id: 'happy', label: 'Youpi Friday', icon: 'PartyPopper' },
  { id: 'melancholic', label: 'Sadsongs', icon: 'Moon' },
  { id: 'focused', label: 'On bosse !', icon: 'Building2' },
  { id: 'french', label: 'French time', icon: 'Landmark' },
];

const iconMap = {
  Brush,
  Book,
  PartyPopper,
  Moon,
  Building2,
  Landmark,
};

interface MoodSelectorProps {
  selectedMoods: string[];
  onMoodSelect: (mood: string) => void;
}

export function MoodSelector({ selectedMoods, onMoodSelect }: MoodSelectorProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {moods.map((mood) => {
        const Icon = iconMap[mood.icon as keyof typeof iconMap];
        const isSelected = selectedMoods.includes(mood.id);
        
        return (
          <button
            key={mood.id}
            onClick={() => onMoodSelect(mood.id)}
            className={cn(
              "p-4 rounded-lg flex flex-col items-center space-y-2 transition-all",
              "border-2 hover:border-teal-500",
              isSelected
                ? "bg-teal-500 border-teal-500 text-white"
                : "bg-slate-800 border-slate-700 text-slate-300"
            )}
          >
            <Icon className="w-8 h-8" />
            <span className="font-medium">{mood.label}</span>
          </button>
        );
      })}
    </div>
  );
}