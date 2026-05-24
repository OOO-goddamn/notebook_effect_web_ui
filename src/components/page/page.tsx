import type { ReactNode } from 'react';
import styles from './page.module.scss';

interface PageProps {
    children: ReactNode;
}

export const Page = ({ children }: PageProps) => {
    return <div className={styles.page}>{children}</div>;
};
