import { createContext } from 'react';

interface NameContext {
    name: string | null;
    setName: (name: string) => void;
    color: string | null;
    setColor: (color: string) => void;
}

export const NameContext = createContext<NameContext>({
    name: null,
    setName: () => {},
    color: null,
    setColor: () => {},
});
