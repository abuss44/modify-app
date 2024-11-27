import { create } from 'zustand';
import { UserSelection } from '../types';

interface Store {
  isAuthenticated: boolean;
  userSelections: UserSelection;
  setAuthenticated: (value: boolean) => void;
  updateSelections: (selections: Partial<UserSelection>) => void;
}

export const useStore = create<Store>((set) => ({
  isAuthenticated: false,
  userSelections: {
    moods: [],
  },
  setAuthenticated: (value) => set({ isAuthenticated: value }),
  updateSelections: (selections) =>
    set((state) => ({
      userSelections: { ...state.userSelections, ...selections },
    })),
}));