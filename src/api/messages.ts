import { API_BASE_URL } from 'Constants/api.ts';

export interface Message {
    id?: number;
    authorName: string;
    text: string;
    color: string;
    creationTime: string;
}

export interface MessageWritable {
    authorName: string;
    text: string;
    color: string;
}

export const messagesApi = {
    fetchAll: async (): Promise<Message[]> => {
        const response = await fetch(`${API_BASE_URL}/messages`);
        if (!response.ok) {
            throw new Error('Failed to fetch messages');
        }
        return response.json();
    },

    send: async (body: MessageWritable, headers: Record<string, string> = {}): Promise<Message> => {
        const response = await fetch(`${API_BASE_URL}/messages`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', ...headers },
            body: JSON.stringify(body),
        });
        if (!response.ok) {
            throw new Error('Failed to send message');
        }
        return response.json();
    },

    deleteAll: async (): Promise<void> => {
        await fetch(`${API_BASE_URL}/messages`, {
            method: 'DELETE',
        });
    },
};
