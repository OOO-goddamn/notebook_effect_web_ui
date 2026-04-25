import { createContext } from 'react';

interface NameContext {
    name: string | null;
    setName: (name: string) => void;
}

export const NameContext = createContext<NameContext>({
    name: null,
    setName: () => {},
});
