export interface Message {
    authorName: string;
    text: string;
    color: string;
}

const BASE_URL = 'https://notebook-effect.onrender.com';

export const fetchMessages = async (): Promise<Message[]> => {
    const response = await fetch(`${BASE_URL}/messages`);
    if (!response.ok) {
        throw new Error('Failed to fetch messages');
    }
    return response.json();
};

export const sendMessage = async (body: Message): Promise<Message> => {
    const response = await fetch(`${BASE_URL}/messages`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });
    if (!response.ok) {
        throw new Error('Failed to send message');
    }
    return response.json();
};
