import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatArtists(artists: Array<{ name: string }>): string {
  return artists.map(artist => artist.name).join(', ');
}