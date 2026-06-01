import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { messagesApi, type Message, type MessageWritable } from '../api/messages';
import { CONFIG } from '../config';
import { usePushStore } from 'Store/pushStore.ts';

export const useMessages = () => {
    const queryClient = useQueryClient();
    const pushEndpoint = usePushStore((state) => state.endpoint);
    const { data: messages = [], isLoading } = useQuery<Message[]>({
        queryKey: ['messages'],
        queryFn: messagesApi.fetchAll,
        refetchInterval: CONFIG.POLLING_INTERVAL,
    });

    const sendMutation = useMutation({
        mutationFn: (message: MessageWritable) => messagesApi.send(message, { 'X-Exclude-Endpoint': pushEndpoint }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['messages'] });
        },
    });

    const deleteMutation = useMutation({
        mutationFn: messagesApi.deleteAll,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['messages'] });
        },
    });

    return {
        messages,
        isLoading,
        sendMessage: sendMutation.mutate,
        deleteAllMessages: deleteMutation.mutate,
    };
};
