import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute';

// Mock the AuthContext
const mockUseAuth = vi.fn();

vi.mock('../../../context/AuthContext', () => ({
  useAuth: mockUseAuth
}));

const MockComponent = () => <div>Protected Content</div>;

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>
    {children}
  </BrowserRouter>
);

describe('ProtectedRoute', () => {
  beforeEach(() => {
    mockUseAuth.mockClear();
  });

  it('renders protected content when user is authenticated', () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      isLoading: false,
      user: { id: '123', email: 'test@example.com' }
    });

    render(
      <TestWrapper>
        <ProtectedRoute>
          <MockComponent />
        </ProtectedRoute>
      </TestWrapper>
    );

    expect(screen.getByText('Protected Content')).toBeInTheDocument();
  });

  it('shows loading state when authentication is in progress', () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: false,
      isLoading: true,
      user: null
    });

    render(
      <TestWrapper>
        <ProtectedRoute>
          <MockComponent />
        </ProtectedRoute>
      </TestWrapper>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('redirects to signin when user is not authenticated', () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
      user: null
    });

    render(
      <TestWrapper>
        <ProtectedRoute>
          <MockComponent />
        </ProtectedRoute>
      </TestWrapper>
    );

    // Should redirect to signin page
    expect(window.location.pathname).toBe('/signin');
  });
});