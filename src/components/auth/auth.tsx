import styles from './auth.module.scss';
import { useContext, useState } from 'react';
import { NameContext } from '../../context/name/name.ts';
const colorsPens = ['#FF0000', '#006400', '#FFA500', '#005BAC', '#800080'];

export const Auth = () => {
    const [newName, setNewName] = useState<string>('');
    const { name, setName } = useContext(NameContext);
    const { setColor } = useContext(NameContext);
    return (
        !name && (
            <div className={styles.auth}>
                <div className={styles.modal}>
                    <h3 className='text-2xl'>Имя</h3>
                    <input
                        className={styles.input}
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                    />
                    <button
                        onClick={() => {
                            setName(newName);
                            localStorage.setItem('messenger-name', newName);
                            const randomColor =
                                colorsPens[
                                    Math.floor(
                                        Math.random() * colorsPens.length,
                                    )
                                ];
                            setColor(randomColor);
                            localStorage.setItem(
                                'messenger-color',
                                randomColor,
                            );
                        }}
                        className={styles.btn}
                    >
                        Окей
                    </button>
                </div>
            </div>
        )
    );
};
