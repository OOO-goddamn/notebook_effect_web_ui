import { CONFIG } from '../config';

export const storage = {
    getName: () => localStorage.getItem(CONFIG.STORAGE_KEYS.NAME),
};
