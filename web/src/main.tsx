import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './app.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import './index.css'

const container = document.getElementById('root')
if (!container) throw new Error('root tag not found on index.html')

const queryClient = new QueryClient()

createRoot(container).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>
)
