import { Button } from 'Shared/ui/button.tsx';
import { usePushNotification } from 'Hooks/usePushNotification.ts';
import { Bell, BellCheck } from 'lucide-react';

export const NotificationToggle = () => {
    const { isSupported, isSubscribed, subscribeUser } = usePushNotification();
    return (
        isSupported && (
            <Button
                onClick={subscribeUser}
                variant='ghost'
                className='h-auto w-auto p-0 hover:scale-105 hover:bg-transparent'
            >
                {isSubscribed ? <BellCheck className='size-18.75 text-green-700' /> : <Bell className='size-18.75' />}
            </Button>
        )
    );
};
