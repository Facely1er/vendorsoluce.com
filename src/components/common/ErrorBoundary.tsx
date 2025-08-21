import React from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { Button } from '../ui/Button';
import { Link } from 'react-router-dom';
import { logger } from '../../utils/monitoring';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
  errorId?: string;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{
    error?: Error;
    resetError: () => void;
  }>;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Generate unique error ID for tracking
    const errorId = `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    this.setState({
      error,
      errorInfo,
      errorId,
    });

    // Log error with structured data
    logger.error('ErrorBoundary caught an error', {
      error: {
        message: error.message,
        stack: error.stack,
        name: error.name,
      },
      errorInfo: {
        componentStack: errorInfo.componentStack,
      },
      errorId,
      url: window.location.href,
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString(),
    });

    // Send to external error monitoring service in production
    if (import.meta.env.PROD) {
      // Sentry integration
      if (window.Sentry) {
        window.Sentry.captureException(error, {
          contexts: { react: errorInfo },
          tags: { errorId, component: 'ErrorBoundary' },
        });
      }
      
      // Google Analytics error tracking
      if (window.gtag) {
        window.gtag('event', 'exception', {
          description: error.message,
          fatal: true,
          custom_parameter: errorId,
        });
      }
    }
  }

  resetError = () => {
    this.setState({ 
      hasError: false, 
      error: undefined, 
      errorInfo: undefined,
      errorId: undefined 
    });
  };

  render() {
    if (this.state.hasError) {
      const CustomFallback = this.props.fallback;
      
      if (CustomFallback) {
        return <CustomFallback error={this.state.error} resetError={this.resetError} />;
      }

      return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
          <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="h-8 w-8 text-red-600 dark:text-red-400" />
            </div>
            
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Something went wrong
            </h2>
            
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              We're sorry, but something unexpected happened. Our team has been notified.
              {this.state.errorId && (
                <span className="block text-sm text-gray-500 mt-2">
                  Error ID: {this.state.errorId}
                </span>
              )}
            </p>
            
            {import.meta.env.DEV && this.state.error && (
              <details className="text-left mb-6 p-4 bg-gray-100 dark:bg-gray-700 rounded-md">
                <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                  Error Details (Development)
                </summary>
                <pre className="mt-2 text-xs text-red-600 dark:text-red-400 overflow-auto">
                  {this.state.error.message}
                  {this.state.error.stack}
                </pre>
              </details>
            )}
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button variant="primary" onClick={this.resetError}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Try Again
              </Button>
              <Link to="/">
                <Button variant="outline">
                  <Home className="h-4 w-4 mr-2" />
                  Go Home
                </Button>
              </Link>
            </div>
            
            {/* Contact support link */}
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                Still having issues?
              </p>
              <Link 
                to="/contact" 
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;