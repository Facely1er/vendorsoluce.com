import { useEffect } from 'react';

interface PerformanceMetric {
  name: string;
  value: number;
  timestamp: number;
}

export const usePerformanceMonitoring = () => {
  useEffect(() => {
    // Track Core Web Vitals
    const trackWebVitals = () => {
      // Largest Contentful Paint (LCP)
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'largest-contentful-paint') {
            const metric: PerformanceMetric = {
              name: 'LCP',
              value: entry.startTime,
              timestamp: Date.now()
            };
            sendMetric(metric);
          }
        }
      });
      
      try {
        observer.observe({ entryTypes: ['largest-contentful-paint'] });
      } catch (e) {
        // Browser doesn't support this metric
      }

      // First Input Delay (FID)
      const fidObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const metric: PerformanceMetric = {
            name: 'FID',
            value: entry.processingStart - entry.startTime,
            timestamp: Date.now()
          };
          sendMetric(metric);
        }
      });
      
      try {
        fidObserver.observe({ entryTypes: ['first-input'] });
      } catch (e) {
        // Browser doesn't support this metric
      }

      // Cumulative Layout Shift (CLS)
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!(entry as any).hadRecentInput) {
            clsValue += (entry as any).value;
          }
        }
      });
      
      try {
        clsObserver.observe({ entryTypes: ['layout-shift'] });
      } catch (e) {
        // Browser doesn't support this metric
      }

      // Report CLS on page hide
      const reportCLS = () => {
        const metric: PerformanceMetric = {
          name: 'CLS',
          value: clsValue,
          timestamp: Date.now()
        };
        sendMetric(metric);
      };

      window.addEventListener('pagehide', reportCLS, { once: true });
    };

    // Track page load performance
    const trackPageLoad = () => {
      window.addEventListener('load', () => {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        
        const metrics: PerformanceMetric[] = [
          {
            name: 'TTFB',
            value: navigation.responseStart - navigation.requestStart,
            timestamp: Date.now()
          },
          {
            name: 'PageLoad',
            value: navigation.loadEventEnd - navigation.loadEventStart,
            timestamp: Date.now()
          },
          {
            name: 'DOMContentLoaded',
            value: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
            timestamp: Date.now()
          }
        ];

        metrics.forEach(sendMetric);
      });
    };

    if (import.meta.env.PROD) {
      trackWebVitals();
      trackPageLoad();
    }
  }, []);

  const sendMetric = (metric: PerformanceMetric) => {
    // In production, send to analytics service
    if (import.meta.env.PROD) {
      // Example: Send to Google Analytics, DataDog, or custom analytics
      console.log('Performance metric:', metric);
      
      // You could send to your analytics service here:
      // analytics.track('performance_metric', metric);
    } else {
      console.log('Performance metric (dev):', metric);
    }
  };

  return { sendMetric };
};