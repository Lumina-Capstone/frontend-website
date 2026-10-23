type AuthErrorLike = { code?: string; message?: string };
export type AuthErrorContext = 'signin' | 'signup' | 'reset';

const MESSAGES_BY_CONTEXT: Record<AuthErrorContext, Record<string, string>> = {
  signin: {
    'auth/user-not-found': 'Email tidak ditemukan.',
    'auth/wrong-password': 'Email atau password salah.',
    'auth/invalid-credential': 'Email atau password salah.',
    'auth/invalid-email': 'Email tidak valid.',
    'auth/too-many-requests': 'Terlalu banyak percobaan. Coba lagi nanti.',
  },
  signup: {
    'auth/email-already-in-use': 'Email sudah terdaftar. Silakan login.',
    'auth/weak-password': 'Password terlalu lemah. Minimal 6 karakter.',
  },
  reset: {
    'auth/user-not-found': 'No account found with this email.',
    'auth/invalid-email': 'Failed to send reset email. Please try again.',
  },
};

const FALLBACK: Record<AuthErrorContext, string> = {
  signin: 'Login gagal. Periksa email dan password.',
  signup: 'Pendaftaran gagal. Coba lagi.',
  reset: 'Failed to send reset email. Please try again.',
};

export function getAuthErrorMessage(error: unknown, context: AuthErrorContext): string {
  const err = error as AuthErrorLike;
  const message = MESSAGES_BY_CONTEXT[context][err?.code ?? ''];
  return message ?? FALLBACK[context];
}
