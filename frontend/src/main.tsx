import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './main.css';

import App from './App.tsx';
import Providers from './context/Providers.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Providers>
      <App />
    </Providers>
  </StrictMode>,
);
