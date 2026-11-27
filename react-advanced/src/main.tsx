import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { ErrorBoundary } from '@/day3/ErrorBoundary.tsx'

import App from './App.tsx'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 30_000 }, // data counts as fresh for 30 s
  },
})

createRoot(document.getElementById('root')!, {
  onCaughtError: () => {
    // caught by an error boundary
    // logError(error, info.componentStack)
  },
  onUncaughtError: () => {
    // no boundary caught it: the app is gone
    // logError(error, info.componentStack)
  },
}).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ErrorBoundary
          fallback={(error, reset) => (
            <div role="alert">
              <p>Something went wrong: {error.message}</p>
              <button onClick={reset}>Try again</button>
            </div>
          )}
        >
          <App />
        </ErrorBoundary>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>,
)
