import { StrictMode } from 'react';
<<<<<<< HEAD
=======

>>>>>>> 94bc266f6658a65dcbbfd75692e31a1c521d0dca
import * as ReactDOM from 'react-dom/client';
import { NextUIProvider } from '@nextui-org/react';
import App from './app/app';
<<<<<<< HEAD
import { BrowserRouter } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
=======
import { NextUIProvider } from '@nextui-org/react';
>>>>>>> 94bc266f6658a65dcbbfd75692e31a1c521d0dca

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const queryClient = new QueryClient();
root.render(
  <StrictMode>
<<<<<<< HEAD
    <QueryClientProvider client={queryClient}>
       <NextUIProvider>
      <App />
    </NextUIProvider>
         
    </QueryClientProvider>
=======
    <NextUIProvider>
      <App />
    </NextUIProvider>
>>>>>>> 94bc266f6658a65dcbbfd75692e31a1c521d0dca
  </StrictMode>
);
