import { type ReactNode, useState } from 'react';
import { NameContext } from './name.ts';

export const ProviderNameContext = ({ children }: { children: ReactNode }) => {
    const [name, setName] = useState<string | null>(
        localStorage.getItem('messenger-name'),
    );
    const [color, setColor] = useState<string | null>(
        localStorage.getItem('messenger-color'),
    );
    return (
        <NameContext value={{ name, setName, color, setColor }}>
            {children}
        </NameContext>
    );
};
