import { describe, it, expect, vi, beforeEach } from 'vitest';
import { logger } from '../monitoring';

describe('Monitoring Utilities', () => {
  let consoleSpy: any;

  beforeEach(() => {
    consoleSpy = {
      log: vi.spyOn(console, 'log').mockImplementation(() => {}),
      warn: vi.spyOn(console, 'warn').mockImplementation(() => {}),
      error: vi.spyOn(console, 'error').mockImplementation(() => {}),
      debug: vi.spyOn(console, 'debug').mockImplementation(() => {}),
    };
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Logger', () => {
    it('logs error messages in all environments', () => {
      logger.error('Test error message', { data: 'test' });
      
      expect(consoleSpy.error).toHaveBeenCalledWith('[ERROR] Test error message', { data: 'test' });
    });

    it('handles missing user ID gracefully', () => {
      // Clear localStorage to simulate no user
      localStorage.clear();
      
      logger.info('Test message');
      
      expect(consoleSpy.log).toHaveBeenCalled();
      // Should not throw error when user ID is missing
    });

    it('accepts data objects for structured logging', () => {
      logger.warn('Test warning', { userId: '123', action: 'test' });
      
      expect(consoleSpy.warn).toHaveBeenCalledWith('[WARN] Test warning', { userId: '123', action: 'test' });
    });
  });
});