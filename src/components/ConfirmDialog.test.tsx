import { afterEach, describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import ConfirmDialog from './ConfirmDialog';

afterEach(cleanup);

const baseProps = {
  title: 'Sign Out?',
  body: 'Are you sure?',
  confirmLabel: 'Sign Out',
  icon: 'logout',
  tone: 'red' as const,
  loading: false,
  onCancel: vi.fn(),
  onConfirm: vi.fn(),
};

describe('ConfirmDialog', () => {
  it('renders title, body and action buttons', () => {
    render(<ConfirmDialog {...baseProps} />);
    expect(screen.getByText('Sign Out?')).toBeTruthy();
    expect(screen.getByText('Are you sure?')).toBeTruthy();
    expect(screen.getByText('Cancel')).toBeTruthy();
    expect(screen.getByText('Sign Out')).toBeTruthy();
  });

  it('calls onConfirm when confirm is clicked', () => {
    const onConfirm = vi.fn();
    render(<ConfirmDialog {...baseProps} onConfirm={onConfirm} />);
    fireEvent.click(screen.getByText('Sign Out'));
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  it('calls onCancel when cancel is clicked', () => {
    const onCancel = vi.fn();
    render(<ConfirmDialog {...baseProps} onCancel={onCancel} />);
    fireEvent.click(screen.getByText('Cancel'));
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it('disables buttons while loading and shows spinner state', () => {
    render(<ConfirmDialog {...baseProps} loading={true} loadingLabel="Signing out..." />);
    const confirm = screen.getByText('Signing out...');
    expect(confirm.closest('button')?.disabled).toBe(true);
    expect((screen.getByText('Cancel') as HTMLButtonElement).disabled).toBe(true);
  });
});
