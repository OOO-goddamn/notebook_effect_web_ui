import styles from './chat.module.scss';
import { useMessages } from '../../hooks/useMessages';
import { MessageItem } from './MessageItem';
import { MessageInput } from './MessageInput';
import { Toolbar } from './Toolbar';
import { useAuthStore } from '../../store/user';

export const Chat = () => {
    const { name, color } = useAuthStore();
    const { messages, sendMessage, deleteAllMessages } = useMessages();

    const handleLogout = () => {
        window.location.reload();
    };

    const handleSend = (text: string) => {
        sendMessage({
            authorName: name ?? '',
            text,
            color: color ?? 'black',
        });
    };

    return (
        <>
            <Toolbar onDeleteAll={deleteAllMessages} onLogout={handleLogout} />
            <div className={styles.redLine} />
            {messages.map((msg) => (
                <MessageItem
                    key={`${msg.authorName}-${msg.text}-${msg.color}`}
                    message={msg}
                />
            ))}
            <MessageInput
                userName={name}
                userColor={color}
                onSend={handleSend}
            />
        </>
    );
};
