import { useState, useCallback } from 'react';
import { useName } from './useName';
import { getRandomColor } from '../utils/colors';
import { storage } from '../lib/storage';

export const useAuth = () => {
    const { name, setName, color, setColor } = useName();
    const [inputName, setInputName] = useState('');

    const login = useCallback(() => {
        const newName = inputName.trim();
        if (!newName) return;

        setName(newName);
        storage.setName(newName);

        const newColor = getRandomColor();
        setColor(newColor);
        storage.setColor(newColor);
    }, [inputName, setName, setColor]);

    const logout = useCallback(() => {
        storage.clear();
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