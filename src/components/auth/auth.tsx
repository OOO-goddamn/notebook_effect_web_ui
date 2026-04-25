import { useAuth } from '../../hooks/useAuth';
import { AuthModal } from './AuthModal';

export const Auth = () => {
    const { inputName, setInputName, login, isAuthenticated } = useAuth();

    if (isAuthenticated) return null;

    return (
        <AuthModal
            name={inputName}
            onNameChange={setInputName}
            onSubmit={login}
        />
    );
};