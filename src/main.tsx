import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import './context/I18nContext'; // Import i18n configuration

// Initialize performance monitoring
if (import.meta.env.PROD) {
  import('./hooks/usePerformanceMonitoring').then(() => {
    // Performance monitoring will be initialized when components mount
  });
}

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Failed to find the root element');
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);