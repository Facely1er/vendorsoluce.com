/**
 * Enhanced Security utilities for production environment
 */

import DOMPurify from 'dompurify';

// Content Security Policy configuration
export const getCSPHeader = () => {
  const directives = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com https://www.googletagmanager.com",
    "style-src 'self' 'unsafe-inline' https://rsms.me https://fonts.googleapis.com",
    "font-src 'self' https://rsms.me https://fonts.gstatic.com",
    "img-src 'self' data: https: blob:",
    "connect-src 'self' https://*.supabase.co https://api.osv.dev https://api.vendorsoluce.com https://www.google-analytics.com",
    "frame-src 'none'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "upgrade-insecure-requests",
    "require-trusted-types-for 'script'"
  ];
  
  return directives.join('; ');
};

// Enhanced input sanitization using DOMPurify
export const sanitizeInput = (input: string): string => {
  if (typeof input !== 'string') {
    return '';
  }
  
  // Use DOMPurify for comprehensive sanitization
  return DOMPurify.sanitize(input, {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: [],
    KEEP_CONTENT: true
  });
};

// Sanitize HTML content with allowed tags
export const sanitizeHTML = (html: string, allowedTags: string[] = ['b', 'i', 'em', 'strong', 'a']): string => {
  if (typeof html !== 'string') {
    return '';
  }
  
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: allowedTags,
    ALLOWED_ATTR: ['href', 'target'],
    ALLOW_DATA_ATTR: false
  });
};

// Validate email format with enhanced regex
export const isValidEmail = (email: string): boolean => {
  if (typeof email !== 'string') {
    return false;
  }
  
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return emailRegex.test(email.trim());
};

// Validate URL format with security checks
export const isValidUrl = (url: string): boolean => {
  if (typeof url !== 'string') {
    return false;
  }
  
  try {
    const urlObj = new URL(url);
    // Only allow HTTPS in production
    if (import.meta.env.PROD && urlObj.protocol !== 'https:') {
      return false;
    }
    return true;
  } catch {
    return false;
  }
};

// Validate file uploads
export const validateFileUpload = (file: File, allowedTypes: string[], maxSize: number): boolean => {
  if (!file || !allowedTypes.includes(file.type)) {
    return false;
  }
  
  if (file.size > maxSize) {
    return false;
  }
  
  return true;
};

// Enhanced rate limiting for client-side
export class RateLimiter {
  private requests: Map<string, number[]> = new Map();
  
  constructor(
    private maxRequests: number = 100,
    private windowMs: number = 60000 // 1 minute
  ) {}
  
  isAllowed(key: string): boolean {
    const now = Date.now();
    const requests = this.requests.get(key) || [];
    
    // Remove old requests outside the window
    const validRequests = requests.filter(time => now - time < this.windowMs);
    
    if (validRequests.length >= this.maxRequests) {
      return false;
    }
    
    validRequests.push(now);
    this.requests.set(key, validRequests);
    return true;
  }
  
  getRemainingRequests(key: string): number {
    const requests = this.requests.get(key) || [];
    const now = Date.now();
    const validRequests = requests.filter(time => now - time < this.windowMs);
    return Math.max(0, this.maxRequests - validRequests.length);
  }
  
  reset(key: string): void {
    this.requests.delete(key);
  }
}

// Create default rate limiter instance
export const defaultRateLimiter = new RateLimiter();

// Secure storage utilities with encryption support
export const secureStorage = {
  setItem: (key: string, value: string) => {
    try {
      // In production, consider encrypting sensitive data
      if (import.meta.env.PROD) {
        // Basic obfuscation for production
        const obfuscatedValue = btoa(encodeURIComponent(value));
        localStorage.setItem(key, obfuscatedValue);
      } else {
        localStorage.setItem(key, value);
      }
    } catch (error) {
      console.warn('Failed to save to localStorage:', error);
    }
  },
  
  getItem: (key: string): string | null => {
    try {
      const value = localStorage.getItem(key);
      if (!value) return null;
      
      if (import.meta.env.PROD) {
        // Decode obfuscated value
        return decodeURIComponent(atob(value));
      }
      
      return value;
    } catch (error) {
      console.warn('Failed to read from localStorage:', error);
      return null;
    }
  },
  
  removeItem: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.warn('Failed to remove from localStorage:', error);
    }
  }
};

// CSRF token generation and validation
export const generateCSRFToken = (): string => {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
};

export const validateCSRFToken = (token: string, storedToken: string): boolean => {
  return token === storedToken && token.length === 64;
};

// Security headers for production
export const getSecurityHeaders = () => ({
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=()',
  'Content-Security-Policy': getCSPHeader(),
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload'
});