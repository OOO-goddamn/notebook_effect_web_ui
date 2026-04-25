import { useContext } from 'react';
import { NameContext } from '../context/name';

export const useName = () => {
    const context = useContext(NameContext);
    if (!context) {
        throw new Error('useName must be used within ProviderNameContext');
    }
    return context;
};