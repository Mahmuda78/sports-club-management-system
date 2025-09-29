import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from 'react-router'
import { router } from './Router/router.jsx'
import AuthProvider from './Provider/AuthProvider.jsx'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Aos from 'aos'
import { Toaster } from 'react-hot-toast'
Aos.init();
const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className='max-w-7xl mx-auto'>
      <QueryClientProvider client={queryClient}>
       <Toaster position="top-right" reverseOrder={false} />
        <AuthProvider><RouterProvider router={router} /></AuthProvider>
      </QueryClientProvider>
    </div>
  </StrictMode>,
)
