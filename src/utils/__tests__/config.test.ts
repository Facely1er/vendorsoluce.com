import { describe, it, expect, vi, beforeEach } from 'vitest';
import { updateEnvVar } from '../../test/setup';

describe('Configuration', () => {
  beforeEach(() => {
    // Reset environment variables to test defaults
    updateEnvVar('VITE_SUPABASE_URL', 'https://test.supabase.co');
    updateEnvVar('VITE_SUPABASE_ANON_KEY', 'test-key');
    updateEnvVar('VITE_APP_ENV', 'test');
    updateEnvVar('VITE_APP_VERSION', '1.0.0');
    updateEnvVar('PROD', false);
    updateEnvVar('DEV', true);
  });

  it('loads required environment variables', () => {
    // Re-import config to get fresh instance
    const { config } = require('../config');
    
    expect(config.supabase.url).toBe('https://test.supabase.co');
    expect(config.supabase.anonKey).toBe('test-key');
  });

  it('sets default values for optional environment variables', () => {
    const { config } = require('../config');
    
    expect(config.app.env).toBe('test');
    expect(config.app.version).toBe('1.0.0');
    expect(config.app.name).toBe('VendorSoluce');
  });

  it('configures API settings with defaults', () => {
    const { config } = require('../config');
    
    expect(config.api.baseUrl).toBe('https://api.vendorsoluce.com');
    expect(config.api.timeout).toBe(30000);
    expect(config.api.retries).toBe(3);
  });

  it('configures feature flags based on environment', () => {
    const { config } = require('../config');
    
    expect(config.features.vendorAssessments).toBe(false);
    expect(config.features.advancedAnalytics).toBe(false);
    expect(config.features.performanceMonitoring).toBe(false);
  });

  it('enables performance monitoring in production', () => {
    updateEnvVar('PROD', true);
    
    // Re-import to get updated config
    const { config: prodConfig } = require('../config');
    expect(prodConfig.features.performanceMonitoring).toBe(true);
    
    updateEnvVar('PROD', false);
  });

  it('configures analytics based on environment', () => {
    const { config } = require('../config');
    
    expect(config.analytics.enabled).toBe(false);
    expect(config.analytics.gaId).toBeUndefined();
  });

  it('enables analytics in production with GA ID', () => {
    updateEnvVar('PROD', true);
    updateEnvVar('VITE_GA_MEASUREMENT_ID', 'GA-123456789');
    
    // Re-import to get updated config
    const { config: prodConfig } = require('../config');
    expect(prodConfig.analytics.enabled).toBe(true);
    expect(prodConfig.analytics.gaId).toBe('GA-123456789');
    
    updateEnvVar('PROD', false);
    updateEnvVar('VITE_GA_MEASUREMENT_ID', undefined);
  });

  it('configures rate limiting with defaults', () => {
    const { config } = require('../config');
    
    expect(config.rateLimiting.maxRequests).toBe(100);
    expect(config.rateLimiting.windowMs).toBe(60000);
  });

  it('configures rate limiting from environment variables', () => {
    updateEnvVar('VITE_API_RATE_LIMIT', '200');
    updateEnvVar('VITE_API_RATE_WINDOW', '120000');
    
    // Re-import to get updated config
    const { config: updatedConfig } = require('../config');
    expect(updatedConfig.rateLimiting.maxRequests).toBe(200);
    expect(updatedConfig.rateLimiting.windowMs).toBe(120000);
    
    // Reset to defaults
    updateEnvVar('VITE_API_RATE_LIMIT', undefined);
    updateEnvVar('VITE_API_RATE_WINDOW', undefined);
  });

  it('exposes config in development for debugging', () => {
    updateEnvVar('DEV', true);
    
    // Mock window object
    const mockWindow = {} as any;
    global.window = mockWindow;
    
    // Re-import to trigger debug exposure
    require('../config');
    
    expect(mockWindow.__APP_CONFIG__).toBeDefined();
    expect(mockWindow.__APP_CONFIG__.app.name).toBe('VendorSoluce');
    
    updateEnvVar('DEV', false);
  });
});