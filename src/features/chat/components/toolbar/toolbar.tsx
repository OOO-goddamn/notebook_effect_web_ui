import { useAuthStore } from 'Store/user';
import styles from '../../chat.module.scss';
import clsx from 'clsx';
import { NotificationToggle } from 'Components/notificationToggle/notificationToggle.tsx';
import { Button } from 'Shared/ui/button.tsx';

interface ToolbarProps {
    onDeleteAll: () => void;
    onLogout: () => void;
}

export const Toolbar = ({ onDeleteAll, onLogout }: ToolbarProps) => {
    const { name } = useAuthStore();
    return (
        <div className={clsx(styles.toolbar, 'flex', 'flex-col', 'gap-10')}>
            {!!name && (
                <>
                    <Button
                        className='h-auto w-auto p-0 hover:bg-transparent hover:scale-105 transition-transform'
                        variant='ghost'
                        onClick={onDeleteAll}
                    >
                        <img alt='eraser' width={100} height={100} src='/erase.png' />
                    </Button>
                    <Button
                        className='h-auto w-auto p-0 hover:bg-transparent hover:scale-105 transition-transform'
                        variant='ghost'
                        onClick={onLogout}
                    >
                        <img alt='ruler' width={100} height={100} className={styles.ruler} src='/ruler.png' />
                    </Button>
                </>
            )}
            <NotificationToggle />
        </div>
    );
};
