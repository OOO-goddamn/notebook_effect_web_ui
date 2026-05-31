import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Auth } from 'Features/auth/auth.tsx';
import { Chat } from 'Features/chat/chat.tsx';

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Auth />
            <Chat />
        </QueryClientProvider>
    );
}
export default App;
