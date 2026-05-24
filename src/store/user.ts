import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { CONFIG } from '../config';

// Define types for state & actions
interface UserState {
    name: string | null;
    color: string | null;
    setUser: (name: string, color: string) => void;
    resetUser: () => void;
}

export const useAuthStore = create<UserState>()(
    persist(
        (set) => ({
            name: null,
            color: null,
            setUser: (name: string, color: string) =>
                set(() => ({ name, color })),
            resetUser: () => set({ name: null, color: null }),
        }),
        {
            name: CONFIG.STORAGE_KEYS.NAME,
            storage: createJSONStorage(() => localStorage),
        },
    ),
);
