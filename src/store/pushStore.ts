import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface PushState {
    endpoint: string;
    isSubscribed: boolean;
    setSubscriptionData: (endpoint: string, isSubscribed: boolean) => void;
    clearSubscriptionData: () => void;
}

export const usePushStore = create<PushState>()(
    persist(
        (set) => ({
            endpoint: '',
            isSubscribed: false,

            setSubscriptionData: (endpoint, isSubscribed) => set({ endpoint, isSubscribed }),
            clearSubscriptionData: () => set({ endpoint: '', isSubscribed: false }),
        }),
        {
            name: 'push-notification-storage', // todo consts
        },
    ),
);
