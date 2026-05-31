import { useEffect, useMemo, useState } from 'react';
import { urlBase64ToUint8Array } from 'Utils/encode.ts';
import { VAPID_PUBLIC_KEY } from 'Constants/api.ts';
import { notificationApi } from 'Api/notification.ts';

export const usePushNotification = () => {
    const [isSubscribed, setIsSubscribed] = useState(false);

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
            registration.pushManager.getSubscription().then((subscription) => {
                if (subscription) {
                    setIsSubscribed(true);
                } else {
                    setIsSubscribed(false);
                }
            });
        });
    }, [isSupported]);

    const subscribeUser = async () => {
        if (isSupported) {
            try {
                // 1. Register Service Worker
                const registration = await navigator.serviceWorker.register('/workers/notification_sw.js');

                // 2. Requesting permission to push messages
                const permission = await Notification.requestPermission();
                setPermission(Notification.permission);
                if (permission !== 'granted') {
                    alert('Разрешение на уведомления отклонено');
                    return;
                }

                // 3. Signing up the user
                const convertedKey = urlBase64ToUint8Array(VAPID_PUBLIC_KEY);
                const subscription = await registration.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: convertedKey,
                });

                // 4. We are sending a subscription to the backend
                await notificationApi.subscribe(subscription);

                alert('Подписка на уведомления оформлена');
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
