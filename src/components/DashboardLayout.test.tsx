import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

vi.mock('../services/auth', () => ({
  getSession: () => null,
  clearSession: vi.fn(),
  onAuthChange: () => () => {},
  logout: vi.fn(),
}));

import DashboardLayout from './DashboardLayout';

afterEach(cleanup);

describe('DashboardLayout', () => {
  it('redirects unauthenticated users to the sign-in route', () => {
    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <Routes>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<div>dashboard content</div>} />
          </Route>
          <Route path="/signin" element={<div>sign in page</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('sign in page')).toBeTruthy();
  });
});
