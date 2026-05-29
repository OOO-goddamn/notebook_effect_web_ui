import styles from './chat.module.scss';
import { useMessages } from '../../hooks/useMessages';
import {
    MessageItem,
    MessageWrapper,
} from './components/messageItem/messageItem';
import { MessageInput } from './components/messageInput/messageInput';
import { Toolbar } from './components/toolbar/toolbar';
import { useAuthStore } from '../../store/user';
import { Page } from 'Components/page/page';
import { CONFIG } from 'Config/index';
import { Fragment } from 'react';

export const Chat = () => {
    const { name, color } = useAuthStore();
    const { messages, sendMessage, deleteAllMessages } = useMessages();

    const handleLogout = () => {
        localStorage.removeItem(CONFIG.STORAGE_KEYS.NAME);
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
        <Page>
            <Toolbar onDeleteAll={deleteAllMessages} onLogout={handleLogout} />
            <div className={styles.redLine} />
            <MessageWrapper>
                {messages.map((msg, index) => {
                    const date = new Date(msg.creationTime);
                    const prevDate =
                        index !== 0
                            ? new Date(messages[index - 1].creationTime)
                            : date;

                    const time = date.toLocaleTimeString('ru-RU', {
                        hour: '2-digit',
                        minute: '2-digit',
                    });
                    const showAuthor =
                        index === 0 ||
                        msg.authorName !== messages[index - 1].authorName;
                    return (
                        <Fragment
                            key={`${msg.authorName}-${msg.text}-${msg.color}`}
                        >
                            {(!compareDates(prevDate, date) || index === 0) && (
                                <>
                                    <MessageItem
                                        style={{
                                            height: 32,
                                        }}
                                    />
                                    <MessageItem
                                        cls='justify-center'
                                        style={{
                                            color: '#0095B6',
                                        }}
                                    >
                                        {date.toLocaleDateString('ru-RU', {
                                            day: 'numeric',
                                            month: 'long',
                                        })}
                                    </MessageItem>
                                    <MessageItem
                                        style={{
                                            height: 32,
                                        }}
                                    />
                                </>
                            )}
                            {showAuthor && (
                                <MessageItem style={{ color: msg.color }}>
                                    {msg.authorName}
                                </MessageItem>
                            )}
                            <MessageItem
                                style={{ color: msg.color }}
                                cls='ml-8 gap-4'
                            >
                                <div>{time}</div>
                                <div>{msg.text}</div>
                            </MessageItem>
                        </Fragment>
                    );
                })}
            </MessageWrapper>

            {!!name && (
                <MessageInput
                    userName={name}
                    userColor={color}
                    onSend={handleSend}
                />
            )}
        </Page>
    );
};

// compare dates if day, month and year equals return true
function compareDates(date1: Date, date2: Date) {
    if (date1.getDate() !== date2.getDate()) {
        return false;
    }

    if (date1.getFullYear() !== date2.getFullYear()) {
        return false;
    }

    if (date1.getMonth() !== date2.getMonth()) {
        return false;
    }

    return true;
}
