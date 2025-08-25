import { create } from 'zustand';
export const useAppStore = create((set) => ({
    version: '0.1.0',
    darkMode: false,
    toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
    setVersion: (v) => set({ version: v }),
}));
