import styles from './chat.module.scss';
import clsx from 'clsx';
import { useState, type KeyboardEvent } from 'react';

interface MessageInputProps {
    userName: string | null;
    userColor: string | null;
    onSend: (text: string) => void;
}

export const MessageInput = ({
    userName,
    userColor,
    onSend,
}: MessageInputProps) => {
    const [message, setMessage] = useState('');

    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key !== 'Enter' || !message.trim()) return;

        onSend(message);
        setMessage('');
        e.preventDefault();
    };

    return (
        <div
            className={clsx(styles.notebookLines, styles.input, 'flex')}
            style={{ color: userColor ?? 'black' }}
        >
            <div>{userName}:</div>
            <textarea
                className={styles.textarea}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
            />
        </div>
    );
};