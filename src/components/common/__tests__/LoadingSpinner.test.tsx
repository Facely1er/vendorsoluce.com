import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import LoadingSpinner from '../LoadingSpinner';

describe('LoadingSpinner', () => {
  it('renders loading spinner with default size', () => {
    render(<LoadingSpinner />);
    const spinner = screen.getByTestId('loading-spinner');
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass('h-8', 'w-8'); // medium size default
  });

  it('renders loading spinner with custom size', () => {
    render(<LoadingSpinner size="large" />);
    const spinner = screen.getByTestId('loading-spinner');
    expect(spinner).toHaveClass('h-12', 'w-12');
  });

  it('renders loading spinner with small size', () => {
    render(<LoadingSpinner size="small" />);
    const spinner = screen.getByTestId('loading-spinner');
    expect(spinner).toHaveClass('h-4', 'w-4');
  });

  it('applies custom className', () => {
    render(<LoadingSpinner className="custom-class" />);
    const spinner = screen.getByTestId('loading-spinner');
    expect(spinner).toHaveClass('custom-class');
  });

  it('has correct base classes', () => {
    render(<LoadingSpinner />);
    const spinner = screen.getByTestId('loading-spinner');
    expect(spinner).toHaveClass('animate-spin', 'rounded-full', 'border-b-2', 'border-t-2');
  });
});