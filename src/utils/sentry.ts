import * as Sentry from '@sentry/react';
import { config } from './config';

export const initSentry = () => {
  // Only initialize Sentry in production
  if (config.app.env === 'production' && import.meta.env.VITE_SENTRY_DSN) {
    Sentry.init({
      dsn: import.meta.env.VITE_SENTRY_DSN,
      environment: config.app.env,
      release: config.app.version,
      
      // Performance monitoring
      tracesSampleRate: 0.1, // Capture 10% of transactions for performance monitoring
      
      // Error filtering
      beforeSend(event, hint) {
        // Don't send console errors in development
        if (config.app.env === 'development') {
          return null;
        }
        
        // Filter out network errors that are expected
        const error = hint.originalException;
        if (error instanceof Error) {
          if (error.message.includes('Network request failed') || 
              error.message.includes('Failed to fetch')) {
            return null;
          }
        }
        
        return event;
      },
      
      // Set user context
      initialScope: {
        tags: {
          component: 'vendorsoluce-web',
        },
      },
    });
  }
};

// Enhanced error reporting
export const reportError = (error: Error, context?: Record<string, any>) => {
  if (config.app.env === 'production') {
    Sentry.withScope((scope) => {
      if (context) {
        scope.setContext('additional_info', context);
      }
      Sentry.captureException(error);
    });
  } else {
    console.error('Error:', error, context);
  }
};

// Performance monitoring
export const startTransaction = (name: string, op?: string) => {
  if (config.app.env === 'production') {
    return Sentry.startTransaction({ name, op });
  }
  return null;
};

// User context
export const setUserContext = (user: { id?: string; email?: string; role?: string }) => {
  if (config.app.env === 'production') {
    Sentry.setUser(user);
  }
};

// Custom breadcrumb
export const addBreadcrumb = (message: string, category?: string, level?: 'info' | 'warning' | 'error') => {
  if (config.app.env === 'production') {
    Sentry.addBreadcrumb({
      message,
      category: category || 'custom',
      level: level || 'info',
      timestamp: Date.now() / 1000,
    });
  }
};

export { Sentry };