import { describe, it, expect } from 'vitest';
import { config } from '../config';

describe('Configuration', () => {
  it('loads required environment variables', () => {
    expect(config.supabase.url).toBeDefined();
    expect(config.supabase.anonKey).toBeDefined();
    expect(typeof config.supabase.url).toBe('string');
    expect(typeof config.supabase.anonKey).toBe('string');
  });

  it('sets default values for optional environment variables', () => {
    expect(config.app.name).toBe('VendorSoluce');
    expect(typeof config.app.version).toBe('string');
    expect(typeof config.app.env).toBe('string');
  });

  it('configures API settings with defaults', () => {
    expect(config.api.baseUrl).toBe('https://api.vendorsoluce.com');
    expect(config.api.timeout).toBe(30000);
    expect(config.api.retries).toBe(3);
  });

  it('configures feature flags based on environment', () => {
    expect(typeof config.features.vendorAssessments).toBe('boolean');
    expect(typeof config.features.advancedAnalytics).toBe('boolean');
    expect(typeof config.features.performanceMonitoring).toBe('boolean');
  });

  it('configures analytics based on environment', () => {
    expect(typeof config.analytics.enabled).toBe('boolean');
  });

  it('configures rate limiting with defaults', () => {
    expect(config.rateLimiting.maxRequests).toBe(100);
    expect(config.rateLimiting.windowMs).toBe(60000);
  });
});