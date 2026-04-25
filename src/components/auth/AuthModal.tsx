import styles from './auth.module.scss';

interface AuthModalProps {
    name: string;
    onNameChange: (value: string) => void;
    onSubmit: () => void;
}

export const AuthModal = ({ name, onNameChange, onSubmit }: AuthModalProps) => {
    return (
        <div className={styles.auth}>
            <div className={styles.modal}>
                <h3 className='text-2xl'>Имя</h3>
                <input
                    className={styles.input}
                    value={name}
                    onChange={(e) => onNameChange(e.target.value)}
                />
                <button onClick={onSubmit} className={styles.btn}>
                    Окей
                </button>
            </div>
        </div>
    );
};