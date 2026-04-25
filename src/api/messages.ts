import { CONFIG } from '../config';

export interface Message {
    id?: number;
    authorName: string;
    text: string;
    color: string;
}

export const messagesApi = {
    fetchAll: async (): Promise<Message[]> => {
        const response = await fetch(`${CONFIG.API_BASE_URL}/messages`);
        if (!response.ok) {
            throw new Error('Failed to fetch messages');
        }
        return response.json();
    },

    send: async (body: Omit<Message, 'id'>): Promise<Message> => {
        const response = await fetch(`${CONFIG.API_BASE_URL}/messages`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });
        if (!response.ok) {
            throw new Error('Failed to send message');
        }
        return response.json();
    },

    deleteAll: async (): Promise<void> => {
        await fetch(`${CONFIG.API_BASE_URL}/messages`, {
            method: 'DELETE',
        });
    },
};