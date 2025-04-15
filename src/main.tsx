import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'
import { BookmarkProvider } from './contexts/BookmarkContext.tsx'

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, 
      gcTime: 1000 * 60 * 15, 
      refetchOnWindowFocus: false, 
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
    <BookmarkProvider> 
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </BookmarkProvider> 
    </QueryClientProvider>
  </StrictMode>,
)
