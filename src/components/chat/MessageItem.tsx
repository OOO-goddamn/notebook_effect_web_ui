import styles from './chat.module.scss';
import clsx from 'clsx';
import type { Message } from '../../api/messages';

interface MessageItemProps {
    message: Message;
}

export const MessageItem = ({ message }: MessageItemProps) => {
    const key = `${message.authorName}-${message.text}-${message.color}`;

    return (
        <div
            key={key}
            className={clsx(styles.notebookLines, 'flex')}
            style={{ color: message.color }}
        >
            <div>{message.authorName}:</div>
            <div>{message.text}</div>
        </div>
    );
};