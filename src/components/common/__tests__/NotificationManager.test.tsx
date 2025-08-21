import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import NotificationManager from '../NotificationManager';

// Mock the app store
const mockShowNotification = vi.fn();
const mockHideNotification = vi.fn();

vi.mock('../../../stores/appStore', () => ({
  useAppStore: () => ({
    notification: {
      show: false,
      message: '',
      type: 'info'
    },
    showNotification: mockShowNotification,
    hideNotification: mockHideNotification
  })
}));

describe('NotificationManager', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders notification when show is true', () => {
    // Mock the store to return a visible notification
    vi.mocked(require('../../../stores/appStore').useAppStore).mockReturnValue({
      notification: {
        show: true,
        message: 'Test notification',
        type: 'success'
      },
      showNotification: mockShowNotification,
      hideNotification: mockHideNotification
    });

    render(<NotificationManager />);
    
    expect(screen.getByText('Test notification')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toHaveClass('bg-green-100', 'border-green-400');
  });

  it('does not render when show is false', () => {
    vi.mocked(require('../../../stores/appStore').useAppStore).mockReturnValue({
      notification: {
        show: false,
        message: '',
        type: 'info'
      },
      showNotification: mockShowNotification,
      hideNotification: mockHideNotification
    });

    render(<NotificationManager />);
    
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('calls hideNotification when close button is clicked', () => {
    vi.mocked(require('../../../stores/appStore').useAppStore).mockReturnValue({
      notification: {
        show: true,
        message: 'Test notification',
        type: 'info'
      },
      showNotification: mockShowNotification,
      hideNotification: mockHideNotification
    });

    render(<NotificationManager />);
    
    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);
    
    expect(mockHideNotification).toHaveBeenCalled();
  });
});