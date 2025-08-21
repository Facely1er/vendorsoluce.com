import { describe, it, expect, vi, beforeEach } from 'vitest';
import { updateEnvVar } from '../../test/setup';
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
    it('logs info messages in development', () => {
      updateEnvVar('DEV', true);
      
      logger.info('Test info message', { data: 'test' });
      
      expect(consoleSpy.log).toHaveBeenCalledWith('[INFO] Test info message', { data: 'test' });
      
      updateEnvVar('DEV', false);
    });

    it('logs warning messages in development', () => {
      updateEnvVar('DEV', true);
      
      logger.warn('Test warning message', { data: 'test' });
      
      expect(consoleSpy.warn).toHaveBeenCalledWith('[WARN] Test warning message', { data: 'test' });
      
      updateEnvVar('DEV', false);
    });

    it('logs error messages in all environments', () => {
      logger.error('Test error message', { data: 'test' });
      
      expect(consoleSpy.error).toHaveBeenCalledWith('[ERROR] Test error message', { data: 'test' });
    });

    it('logs debug messages only in development', () => {
      updateEnvVar('DEV', true);
      
      logger.debug('Test debug message', { data: 'test' });
      
      expect(consoleSpy.debug).toHaveBeenCalledWith('[DEBUG] Test debug message', { data: 'test' });
      
      updateEnvVar('DEV', false);
      
      logger.debug('Test debug message 2', { data: 'test' });
      
      expect(consoleSpy.debug).toHaveBeenCalledTimes(1);
    });

    it('creates structured log entries', () => {
      updateEnvVar('PROD', true);
      
      logger.info('Test message', { customData: 'value' });
      
      // In production, it should also send to monitoring service
      expect(consoleSpy.log).toHaveBeenCalledWith('Monitoring:', expect.objectContaining({
        level: 'info',
        message: 'Test message',
        data: { customData: 'value' },
        timestamp: expect.any(Number),
        userAgent: expect.any(String),
        url: expect.any(String)
      }));
      
      updateEnvVar('PROD', false);
    });

    it('handles missing user ID gracefully', () => {
      // Clear localStorage to simulate no user
      localStorage.clear();
      
      logger.info('Test message');
      
      expect(consoleSpy.log).toHaveBeenCalled();
      // Should not throw error when user ID is missing
    });
  });
});