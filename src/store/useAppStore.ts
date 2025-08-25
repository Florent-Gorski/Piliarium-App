import { create } from 'zustand';

type AppState = {
  version: string;
  darkMode: boolean;
  toggleDarkMode: () => void;
  setVersion: (v: string) => void;
};

export const useAppStore = create<AppState>((set) => ({
  version: '0.1.0',
  darkMode: false,
  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
  setVersion: (v) => set({ version: v }),
}));
