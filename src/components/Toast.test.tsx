import { afterEach, describe, expect, it, vi } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import Toast from './Toast';

afterEach(cleanup);

describe('Toast', () => {
  it('renders nothing without a toast', () => {
    const { container } = render(<Toast toast={null} onDismiss={() => {}} />);
    expect(container.innerHTML).toBe('');
  });

  it('renders success message with check icon', () => {
    render(<Toast toast={{ message: 'Saved!', type: 'success' }} onDismiss={() => {}} />);
    expect(screen.getByText('Saved!')).toBeTruthy();
  });

  it('renders error message with error icon', () => {
    render(<Toast toast={{ message: 'Failed!', type: 'error' }} onDismiss={() => {}} />);
    expect(screen.getByText('Failed!')).toBeTruthy();
  });

  it('auto-dismisses after 3 seconds', () => {
    vi.useFakeTimers();
    const onDismiss = vi.fn();
    render(<Toast toast={{ message: 'Saved!', type: 'success' }} onDismiss={onDismiss} />);
    vi.advanceTimersByTime(3000);
    expect(onDismiss).toHaveBeenCalledTimes(1);
    vi.useRealTimers();
  });
});
