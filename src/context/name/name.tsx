import { type ReactNode, useState } from 'react';
import { NameContext } from './NameContext';
import { storage } from '../../lib/storage.ts';

export const ProviderNameContext = ({ children }: { children: ReactNode }) => {
    const [name, setName] = useState<string | null>(storage.getName());
    const [color, setColor] = useState<string | null>(storage.getColor());

    return (
        <NameContext value={{ name, setName, color, setColor }}>
            {children}
        </NameContext>
    );
};
