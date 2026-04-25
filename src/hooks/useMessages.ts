import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { messagesApi, type Message } from '../api/messages';
import { CONFIG } from '../config';

export const useMessages = () => {
    const queryClient = useQueryClient();

    const { data: messages = [], isLoading } = useQuery<Message[]>({
        queryKey: ['messages'],
        queryFn: messagesApi.fetchAll,
        refetchInterval: CONFIG.POLLING_INTERVAL,
    });

    const sendMutation = useMutation({
        mutationFn: (message: Omit<Message, 'id'>) => messagesApi.send(message),
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