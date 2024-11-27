export interface Mood {
  id: string;
  label: string;
  icon: string;
}

export interface SpotifyTrack {
  id: string;
  name: string;
  artists: Array<{ name: string }>;
  album: {
    name: string;
    images: Array<{ url: string }>;
  };
}

export interface UserSelection {
  moods: string[];
  activity?: string;
  favoriteTrack?: string;
  favoriteArtist?: string;
  favoriteSong?: string;
  favoriteMovie?: string;
}