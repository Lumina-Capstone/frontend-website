import { describe, expect, it } from 'vitest';
import { getAuthErrorMessage } from './authErrors';

describe('getAuthErrorMessage', () => {
  it('maps firebase error code to Indonesian message for sign-in', () => {
    expect(getAuthErrorMessage({ code: 'auth/user-not-found' }, 'signin')).toBe(
      'Email tidak ditemukan.'
    );
    expect(
      getAuthErrorMessage({ code: 'auth/invalid-credential' }, 'signin')
    ).toBe('Email atau password salah.');
    expect(getAuthErrorMessage({ code: 'auth/wrong-password' }, 'signin')).toBe(
      'Email atau password salah.'
    );
    expect(getAuthErrorMessage({ code: 'auth/invalid-email' }, 'signin')).toBe(
      'Email tidak valid.'
    );
    expect(
      getAuthErrorMessage({ code: 'auth/too-many-requests' }, 'signin')
    ).toBe('Terlalu banyak percobaan. Coba lagi nanti.');
  });

  it('returns sign-in fallback for unknown codes', () => {
    expect(getAuthErrorMessage({ code: 'auth/something-else' }, 'signin')).toBe(
      'Login gagal. Periksa email dan password.'
    );
    expect(getAuthErrorMessage(new Error('network down'), 'signin')).toBe(
      'Login gagal. Periksa email dan password.'
    );
  });

  it('maps firebase error code to message for sign-up', () => {
    expect(
      getAuthErrorMessage({ code: 'auth/email-already-in-use' }, 'signup')
    ).toBe('Email sudah terdaftar. Silakan login.');
    expect(getAuthErrorMessage({ code: 'auth/weak-password' }, 'signup')).toBe(
      'Password terlalu lemah. Minimal 6 karakter.'
    );
    expect(getAuthErrorMessage({ code: 'auth/user-not-found' }, 'signup')).toBe(
      'Pendaftaran gagal. Coba lagi.'
    );
  });

  it('maps firebase error code to English message for password reset', () => {
    expect(getAuthErrorMessage({ code: 'auth/user-not-found' }, 'reset')).toBe(
      'No account found with this email.'
    );
    expect(getAuthErrorMessage({ code: 'auth/invalid-email' }, 'reset')).toBe(
      'Failed to send reset email. Please try again.'
    );
  });
});
