import React from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { Button } from '../ui/Button';
import { Link } from 'react-router-dom';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
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
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    this.setState({
      error,
      errorInfo,
    });

    // Log to external error monitoring service in production
    if (import.meta.env.PROD) {
      // Example: Sentry.captureException(error, { contexts: { react: errorInfo } });
    }
  }

  resetError = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
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
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;