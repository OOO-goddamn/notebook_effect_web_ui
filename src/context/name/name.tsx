import { type ReactNode, useState } from 'react';
import { NameContext } from './name.ts';

export const ProviderNameContext = ({ children }: { children: ReactNode }) => {
    const [name, setName] = useState<string | null>(
        localStorage.getItem('messenger-name'),
    );
    return <NameContext value={{ name, setName }}>{children}</NameContext>;
};
