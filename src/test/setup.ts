import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock environment variables using vi.stubEnv
vi.stubEnv('VITE_SUPABASE_URL', 'https://test.supabase.co');
vi.stubEnv('VITE_SUPABASE_ANON_KEY', 'test-key');
vi.stubEnv('VITE_APP_ENV', 'test');
vi.stubEnv('VITE_APP_VERSION', '1.0.0');

// Mock import.meta.env properties
vi.mock('import.meta.env', () => ({
  VITE_SUPABASE_URL: 'https://test.supabase.co',
  VITE_SUPABASE_ANON_KEY: 'test-key',
  VITE_APP_ENV: 'test',
  VITE_APP_VERSION: '1.0.0',
  PROD: false,
  DEV: true
}));

// Mock Supabase
vi.mock('@/lib/supabase', () => ({
  supabase: {
    auth: {
      getSession: vi.fn(),
      onAuthStateChange: vi.fn(),
      getUser: vi.fn(),
      signOut: vi.fn()
    },
    from: vi.fn(() => ({
      select: vi.fn(),
      insert: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
      eq: vi.fn(),
      single: vi.fn()
    }))
  }
}));

// Mock Vercel Analytics
vi.mock('@vercel/analytics/react', () => ({
  Analytics: vi.fn(() => null)
}));

// Mock DOMPurify
vi.mock('dompurify', () => ({
  default: {
    sanitize: vi.fn((input: string, options: any) => {
      if (options?.ALLOWED_TAGS?.length === 0) {
        return input.replace(/<[^>]*>/g, '');
      }
      return input;
    })
  }
}));

// Global test utilities
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock IntersectionObserver
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock crypto for CSRF token generation
Object.defineProperty(global, 'crypto', {
  value: {
    getRandomValues: vi.fn((array) => {
      for (let i = 0; i < array.length; i++) {
        array[i] = Math.floor(Math.random() * 256);
      }
      return array;
    })
  }
});

// Helper function to update environment variables in tests
export const updateEnvVar = (key: string, value: any) => {
  // For now, we'll use a simpler approach
  if (key === 'PROD' || key === 'DEV') {
    // These are handled by the mock above
    return;
  }
  
  // Update process.env for other variables
  process.env[key] = value;
};