import styles from '../../chat.module.scss';
import clsx from 'clsx';
import type { CSSProperties, PropsWithChildren } from 'react';

export const MessageWrapper = ({
    cls,
    children,
}: PropsWithChildren<{ cls: string }>) => {
    return (
        <div className={clsx(styles.notebookLines, 'flex', 'flex-col', cls)}>
            {children}
        </div>
    );
};

interface MessageItemProps {
    style?: CSSProperties;
    cls?: string;
}

export const MessageItem = ({
    cls,
    style,
    children,
}: PropsWithChildren<MessageItemProps>) => {
    return (
        <div style={style} className={clsx('flex', cls)}>
            {children}
        </div>
    );
};
