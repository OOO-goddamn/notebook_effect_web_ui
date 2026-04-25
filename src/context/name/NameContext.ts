import { createContext } from 'react';

interface NameContextType {
    name: string | null;
    setName: (name: string) => void;
    color: string | null;
    setColor: (color: string) => void;
}

export const NameContext = createContext<NameContextType>({
    name: null,
    setName: () => {},
    color: null,
    setColor: () => {},
});

export type { NameContextType };