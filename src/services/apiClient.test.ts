import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const state = vi.hoisted(() => ({
  user: null as null | { getIdToken: () => Promise<string> },
}));

vi.mock('./auth', () => ({
  auth: {
    get currentUser() {
      return state.user;
    },
  },
}));

import { API_BASE_URL, apiFetch } from './apiClient';

const fetchMock = vi.fn();

beforeEach(() => {
  vi.stubGlobal('fetch', fetchMock);
  fetchMock.mockResolvedValue(new Response('{}', { status: 200 }));
  state.user = { getIdToken: vi.fn().mockResolvedValue('id-token-123') };
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
  vi.resetModules();
  fetchMock.mockReset();
  state.user = null;
});

describe('apiFetch', () => {
  it('attaches the Firebase ID token as a Bearer header', async () => {
    await apiFetch('/records/');

    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe(`${API_BASE_URL}/records/`);
    expect((init.headers as Headers).get('Authorization')).toBe('Bearer id-token-123');
  });

  it('refreshes the token for every call', async () => {
    const getIdToken = vi.fn().mockResolvedValue('id-token-123');
    state.user = { getIdToken };

    await apiFetch('/records/');
    await apiFetch('/records/');

    expect(getIdToken).toHaveBeenCalledTimes(2);
  });

  it('normalizes paths with and without a leading slash', async () => {
    await apiFetch('records/');
    await apiFetch('/records/');

    expect(fetchMock.mock.calls[0][0]).toBe(`${API_BASE_URL}/records/`);
    expect(fetchMock.mock.calls[1][0]).toBe(`${API_BASE_URL}/records/`);
  });

  it('preserves caller method, body, and headers', async () => {
    await apiFetch('/ocr/save', {
      method: 'POST',
      body: '{"a":1}',
      headers: { 'Content-Type': 'application/json' },
    });

    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe(`${API_BASE_URL}/ocr/save`);
    expect(init.method).toBe('POST');
    expect(init.body).toBe('{"a":1}');
    expect((init.headers as Headers).get('Content-Type')).toBe('application/json');
  });

  it('rejects when no user is signed in', async () => {
    state.user = null;

    await expect(apiFetch('/records/')).rejects.toThrow('Not authenticated');
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('reads the base URL from VITE_API_BASE_URL when set', async () => {
    vi.stubEnv('VITE_API_BASE_URL', 'https://api.example.test/');
    vi.resetModules();

    const reloaded = await import('./apiClient');

    expect(reloaded.API_BASE_URL).toBe('https://api.example.test');
  });
});
