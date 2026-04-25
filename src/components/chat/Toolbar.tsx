import styles from './chat.module.scss';
import clsx from 'clsx';

interface ToolbarProps {
    onDeleteAll: () => void;
    onLogout: () => void;
}

export const Toolbar = ({ onDeleteAll, onLogout }: ToolbarProps) => {
    return (
        <>
            <button
                className={clsx(styles.btn, styles.erase)}
                onClick={onDeleteAll}
            >
                <img width={100} src='/erase.png' />
            </button>
            <button
                className={clsx(styles.btn, styles.ruler)}
                onClick={onLogout}
            >
                <img width={100} src='/ruler.png' />
            </button>
        </>
    );
};