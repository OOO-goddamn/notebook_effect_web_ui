import { useEffect, useMemo, useState } from 'react';
import { urlBase64ToUint8Array } from 'Utils/encode.ts';
import { VAPID_PUBLIC_KEY } from 'Constants/api.ts';
import { notificationApi } from 'Api/notification.ts';
import { usePushStore } from 'Store/pushStore.ts';

export const usePushNotification = () => {
    const setSubscriptionData = usePushStore((state) => state.setSubscriptionData);
    const clearSubscriptionData = usePushStore((state) => state.clearSubscriptionData);
    const isSubscribed = usePushStore((state) => state.isSubscribed);

    const isSupported = useMemo(() => {
        if ('serviceWorker' in navigator && 'PushManager' in window) {
            return true;
        }
        return false;
    }, []);
    const [permission, setPermission] = useState<NotificationPermission>(
        isSupported ? Notification.permission : 'default',
    );

    useEffect(() => {
        if (!isSupported) {
            return;
        }

        navigator.serviceWorker.ready.then((registration) => {
            registration?.pushManager.getSubscription().then((subscription) => {
                if (subscription) {
                    setSubscriptionData(subscription.endpoint, true);
                } else {
                    clearSubscriptionData();
                }
            });
        });
    }, [isSupported]);

    const subscribeUser = async () => {
        if (isSupported) {
            try {
                // 1. Requesting permission to push messages
                const permission = await Notification.requestPermission();
                setPermission(Notification.permission);
                if (permission !== 'granted') {
                    alert('Разрешение на уведомления отклонено');
                    return;
                }

                // 2. Register Service Worker
                const registration = await registrationServiceWorker('/notification_sw.js');

                // 3. Signing up the user
                const convertedKey = urlBase64ToUint8Array(VAPID_PUBLIC_KEY);
                const subscription = await registration.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: convertedKey,
                });

                // 4. We are sending a subscription to the backend
                await notificationApi.subscribe(subscription);
                setSubscriptionData(subscription.endpoint, true);
            } catch (error) {
                console.error('Ошибка:', error);
            }
        } else {
            alert('Браузер не поддерживает Push-уведомления');
        }
    };

    return {
        isSupported,
        isSubscribed,
        permission,
        subscribeUser,
    };
};

const registrationServiceWorker = async (url: string) => {
    const registration = await navigator.serviceWorker.register(url);

    const serviceWorker = registration.active || registration.installing || registration.waiting;

    if (registration.active?.state !== 'activated') {
        await new Promise<void>((resolve) => {
            // eslint-disable-next-line
            serviceWorker?.addEventListener('statechange', (e: any) => {
                if (e.target.state === 'activated') {
                    resolve();
                }
            });
            if (registration.active?.state === 'activated') {
                resolve();
            }
        });
    }
    return registration;
};
