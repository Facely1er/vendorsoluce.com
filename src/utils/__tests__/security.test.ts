import { describe, it, expect, vi } from 'vitest';
import { updateEnvVar } from '../../test/setup';
import {
  sanitizeInput,
  sanitizeHTML,
  isValidEmail,
  isValidUrl,
  validateFileUpload,
  RateLimiter,
  secureStorage,
  generateCSRFToken,
  validateCSRFToken,
  getSecurityHeaders
} from '../security';

describe('Security Utilities', () => {
  describe('sanitizeInput', () => {
    it('sanitizes HTML input', () => {
      const input = '<script>alert("xss")</script>Hello World';
      const result = sanitizeInput(input);
      expect(result).toBe('Hello World');
    });

    it('handles empty input', () => {
      expect(sanitizeInput('')).toBe('');
      expect(sanitizeInput(null as any)).toBe('');
      expect(sanitizeInput(undefined as any)).toBe('');
    });

    it('sanitizes malicious input', () => {
      const maliciousInput = '<img src="x" onerror="alert(1)">';
      const result = sanitizeInput(maliciousInput);
      expect(result).toBe('');
    });
  });

  describe('sanitizeHTML', () => {
    it('allows safe HTML tags', () => {
      const html = '<b>Bold</b> <i>Italic</i> <a href="https://example.com">Link</a>';
      const result = sanitizeHTML(html);
      expect(result).toContain('<b>Bold</b>');
      expect(result).toContain('<i>Italic</i>');
      expect(result).toContain('<a href="https://example.com">Link</a>');
    });

    it('removes unsafe tags', () => {
      const html = '<script>alert("xss")</script><b>Safe</b>';
      const result = sanitizeHTML(html);
      expect(result).not.toContain('<script>');
      expect(result).toContain('<b>Safe</b>');
    });

    it('handles empty input', () => {
      expect(sanitizeHTML('')).toBe('');
      expect(sanitizeHTML(null as any)).toBe('');
    });
  });

  describe('isValidEmail', () => {
    it('validates correct email addresses', () => {
      expect(isValidEmail('test@example.com')).toBe(true);
      expect(isValidEmail('user.name+tag@domain.co.uk')).toBe(true);
      expect(isValidEmail('123@numbers.com')).toBe(true);
    });

    it('rejects invalid email addresses', () => {
      expect(isValidEmail('invalid-email')).toBe(false);
      expect(isValidEmail('@domain.com')).toBe(false);
      expect(isValidEmail('user@')).toBe(false);
      expect(isValidEmail('')).toBe(false);
      expect(isValidEmail(null as any)).toBe(false);
    });
  });

  describe('isValidUrl', () => {
    it('validates correct URLs', () => {
      expect(isValidUrl('https://example.com')).toBe(true);
      expect(isValidUrl('http://localhost:3000')).toBe(true);
      expect(isValidUrl('https://sub.domain.co.uk/path?param=value')).toBe(true);
    });

    it('rejects invalid URLs', () => {
      expect(isValidUrl('not-a-url')).toBe(false);
      expect(isValidUrl('')).toBe(false);
      expect(isValidUrl(null as any)).toBe(false);
    });

    it('enforces HTTPS in production', () => {
      // Update environment to production
      updateEnvVar('PROD', true);
      
      expect(isValidUrl('http://example.com')).toBe(false);
      expect(isValidUrl('https://example.com')).toBe(true);
      
      // Restore test environment
      updateEnvVar('PROD', false);
    });
  });

  describe('validateFileUpload', () => {
    it('validates file uploads correctly', () => {
      const file = new File(['content'], 'test.pdf', { type: 'application/pdf' });
      const allowedTypes = ['application/pdf', 'text/plain'];
      const maxSize = 1024 * 1024; // 1MB

      expect(validateFileUpload(file, allowedTypes, maxSize)).toBe(true);
    });

    it('rejects files with invalid types', () => {
      const file = new File(['content'], 'test.exe', { type: 'application/x-executable' });
      const allowedTypes = ['application/pdf', 'text/plain'];
      const maxSize = 1024 * 1024;

      expect(validateFileUpload(file, allowedTypes, maxSize)).toBe(false);
    });

    it('rejects files that are too large', () => {
      const file = new File(['x'.repeat(1024 * 1024 + 1)], 'large.txt', { type: 'text/plain' });
      const allowedTypes = ['text/plain'];
      const maxSize = 1024 * 1024; // 1MB

      expect(validateFileUpload(file, allowedTypes, maxSize)).toBe(false);
    });
  });

  describe('RateLimiter', () => {
    it('allows requests within limits', () => {
      const limiter = new RateLimiter(5, 1000); // 5 requests per second
      
      expect(limiter.isAllowed('user1')).toBe(true);
      expect(limiter.isAllowed('user1')).toBe(true);
      expect(limiter.isAllowed('user1')).toBe(true);
      expect(limiter.isAllowed('user1')).toBe(true);
      expect(limiter.isAllowed('user1')).toBe(true);
      expect(limiter.isAllowed('user1')).toBe(false);
    });

    it('tracks different users separately', () => {
      const limiter = new RateLimiter(2, 1000);
      
      expect(limiter.isAllowed('user1')).toBe(true);
      expect(limiter.isAllowed('user2')).toBe(true);
      expect(limiter.isAllowed('user1')).toBe(true);
      expect(limiter.isAllowed('user2')).toBe(true);
      expect(limiter.isAllowed('user1')).toBe(false);
      expect(limiter.isAllowed('user2')).toBe(false);
    });

    it('resets rate limiter', () => {
      const limiter = new RateLimiter(1, 1000);
      
      expect(limiter.isAllowed('user1')).toBe(true);
      expect(limiter.isAllowed('user1')).toBe(false);
      
      limiter.reset('user1');
      expect(limiter.isAllowed('user1')).toBe(true);
    });
  });

  describe('secureStorage', () => {
    beforeEach(() => {
      localStorage.clear();
    });

    it('stores and retrieves data', () => {
      secureStorage.setItem('test-key', 'test-value');
      expect(secureStorage.getItem('test-key')).toBe('test-value');
    });

    it('handles missing keys', () => {
      expect(secureStorage.getItem('missing-key')).toBe(null);
    });

    it('removes items', () => {
      secureStorage.setItem('test-key', 'test-value');
      secureStorage.removeItem('test-key');
      expect(secureStorage.getItem('test-key')).toBe(null);
    });
  });

  describe('CSRF Protection', () => {
    it('generates valid CSRF tokens', () => {
      const token1 = generateCSRFToken();
      const token2 = generateCSRFToken();
      
      expect(token1).toHaveLength(64);
      expect(token2).toHaveLength(64);
      expect(token1).not.toBe(token2);
    });

    it('validates CSRF tokens correctly', () => {
      const token = generateCSRFToken();
      expect(validateCSRFToken(token, token)).toBe(true);
      expect(validateCSRFToken('invalid', token)).toBe(false);
      expect(validateCSRFToken(token, 'invalid')).toBe(false);
    });
  });

  describe('Security Headers', () => {
    it('generates security headers', () => {
      const headers = getSecurityHeaders();
      
      expect(headers['X-Content-Type-Options']).toBe('nosniff');
      expect(headers['X-Frame-Options']).toBe('DENY');
      expect(headers['X-XSS-Protection']).toBe('1; mode=block');
      expect(headers['Content-Security-Policy']).toBeDefined();
      expect(headers['Strict-Transport-Security']).toBeDefined();
    });
  });
});