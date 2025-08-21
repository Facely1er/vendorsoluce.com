import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useApi } from '../useApi';

// Mock fetch globally
const mockFetch = vi.fn();
global.fetch = mockFetch;

describe('useApi', () => {
  beforeEach(() => {
    mockFetch.mockClear();
  });

  it('should handle successful API calls', async () => {
    const mockData = { id: 1, name: 'Test' };
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    const { result } = renderHook(() => useApi());

    const response = await result.current.call('/test-endpoint', { method: 'GET' });

    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining('/test-endpoint'),
      expect.objectContaining({
        method: 'GET',
        headers: expect.objectContaining({
          'Content-Type': 'application/json',
        }),
      })
    );

    expect(response).toEqual(mockData);
  });

  it('should handle API errors', async () => {
    // Mock multiple failed attempts to avoid timeout
    mockFetch
      .mockResolvedValueOnce({ ok: false, status: 404, statusText: 'Not Found' })
      .mockResolvedValueOnce({ ok: false, status: 404, statusText: 'Not Found' })
      .mockResolvedValueOnce({ ok: false, status: 404, statusText: 'Not Found' })
      .mockResolvedValueOnce({ ok: false, status: 404, statusText: 'Not Found' });

    const { result } = renderHook(() => useApi());

    await expect(result.current.call('/not-found')).rejects.toThrow();
  }, 10000);

  it('should handle network errors', async () => {
    // Mock multiple failed attempts to avoid timeout
    mockFetch
      .mockRejectedValueOnce(new Error('Network error'))
      .mockRejectedValueOnce(new Error('Network error'))
      .mockRejectedValueOnce(new Error('Network error'))
      .mockRejectedValueOnce(new Error('Network error'));

    const { result } = renderHook(() => useApi());

    await expect(result.current.call('/network-error')).rejects.toThrow();
  }, 10000);

  it('should make POST requests with data', async () => {
    const mockData = { success: true };
    const postData = { name: 'Test Item' };
    
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    const { result } = renderHook(() => useApi());

    await result.current.call('/test-endpoint', { 
      method: 'POST', 
      body: postData 
    });

    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining('/test-endpoint'),
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          'Content-Type': 'application/json',
        }),
        body: JSON.stringify(postData),
      })
    );
  });

  it('should track loading state', async () => {
    mockFetch.mockImplementation(() => 
      new Promise(resolve => setTimeout(() => resolve({
        ok: true,
        json: async () => ({ data: 'test' })
      }), 100))
    );

    const { result } = renderHook(() => useApi());

    expect(result.current.loading).toBe(false);

    const promise = result.current.call('/slow-endpoint');
    
    await waitFor(() => {
      expect(result.current.loading).toBe(true);
    });

    await promise;

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
  });
});