import { CONFIG } from '../config';

export const storage = {
    getName: () => localStorage.getItem(CONFIG.STORAGE_KEYS.NAME),
    setName: (name: string) => localStorage.setItem(CONFIG.STORAGE_KEYS.NAME, name),
    getColor: () => localStorage.getItem(CONFIG.STORAGE_KEYS.COLOR),
    setColor: (color: string) => localStorage.setItem(CONFIG.STORAGE_KEYS.COLOR, color),
    clear: () => {
        localStorage.removeItem(CONFIG.STORAGE_KEYS.NAME);
        localStorage.removeItem(CONFIG.STORAGE_KEYS.COLOR);
    },
};