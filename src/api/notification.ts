import { API_BASE_URL } from 'Constants/api.ts';

export const notificationApi = {
    subscribe: async (subscription: PushSubscription) => {
        const response = await fetch(`${API_BASE_URL}/api/subscribe`, {
            method: 'POST',
            body: JSON.stringify(subscription),
            headers: { 'Content-Type': 'application/json' },
        });
        if (!response.ok) {
            throw new Error('Failed to subscribe notification');
        }
    },
};
