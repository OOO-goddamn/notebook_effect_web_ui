import { useState, useCallback } from 'react';
import { getRandomColor } from '../utils/colors';
import { useAuthStore } from '../store/user';

export const useAuth = () => {
    const { setUser, name, color } = useAuthStore();
    const [inputName, setInputName] = useState('');

    const login = useCallback(() => {
        const newName = inputName.trim();
        if (!newName) return;

        const newColor = getRandomColor();
        setUser(newName, newColor);
    }, [inputName, setUser]);

    const logout = useCallback(() => {
        window.location.reload();
    }, []);

    const isAuthenticated = !!name;

    return {
        inputName,
        setInputName,
        login,
        logout,
        isAuthenticated,
        userName: name,
        userColor: color,
    };
};
