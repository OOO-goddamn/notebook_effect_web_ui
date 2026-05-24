import { Chat } from './components/chat/chat.tsx';
import { Auth } from './components/auth/auth.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
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
