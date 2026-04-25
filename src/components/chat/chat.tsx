import styles from './chat.module.scss';
import clsx from 'clsx';
import { useContext, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { NameContext } from '../../context/name/name.ts';
import {
    fetchMessages,
    sendMessage,
    type Message,
} from '../../api/messages.ts';

export const Chat = () => {
    const { color, name } = useContext(NameContext);
    const queryClient = useQueryClient();
    const [message, setMessage] = useState('');

    const { data: messages = [] } = useQuery<Message[]>({
        queryKey: ['messages'],
        queryFn: fetchMessages,
        refetchInterval: 3000,
    });

    const mutation = useMutation({
        mutationFn: (text: string) =>
            sendMessage({
                authorName: name ?? '',
                text: text,
                color: color ?? 'black',
            }),
        onSettled: (_data, _error, _variables, _onMutateResult, context) =>
            context.client.invalidateQueries({ queryKey: ['messages'] }),
    });
    console.log(messages);
    return (
        <>
            <div className={styles.redLine} />
            {messages.map((msg, index) => {
                return (
                    <div
                        key={index}
                        className={clsx(styles.notebookLines, 'flex')}
                        style={{
                            color: msg.color,
                        }}
                    >
                        <div>{msg.authorName}:</div>
                        <div>{msg.text}</div>
                    </div>
                );
            })}
            <div
                className={clsx(styles.notebookLines, styles.input, 'flex')}
                style={{ color: color ?? 'black' }}
            >
                <div>{name}:</div>
                <textarea
                    className={styles.textarea}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            mutation.mutate(message);
                            queryClient.setQueryData<Message[]>(
                                ['messages'],
                                (old) => [
                                    ...(old ?? []),
                                    {
                                        authorName: name ?? '',
                                        text: message,
                                        color: color ?? '',
                                    },
                                ],
                            );
                            setMessage('');
                            e.preventDefault();
                        }
                    }}
                />
            </div>
        </>
    );
};
