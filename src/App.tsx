import { Chat } from './components/chat/chat.tsx';
import { ProviderNameContext } from './context/name/name.tsx';
import { Auth } from './components/auth/auth.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient();
function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <ProviderNameContext>
                <Auth />
                <Chat />
            </ProviderNameContext>
        </QueryClientProvider>
    );
}
export default App;
