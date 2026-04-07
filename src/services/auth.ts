import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

if (!firebaseConfig.apiKey) {
  console.error('Firebase config missing. Check your .env file.');
}

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

const API_BASE = 'https://backend-production-b816.up.railway.app';

async function apiRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || `Request failed: ${response.status}`);
  }
  return response.json();
}

export async function loginWithFirebaseToken(email: string, password: string) {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  const idToken = await userCredential.user.getIdToken();
  const data = await apiRequest<{ email: string; uid: string; message: string }>(
    '/login',
    {
      method: 'POST',
      body: JSON.stringify({ id_token: idToken }),
    }
  );
  return { ...data, idToken };
}

export async function loginWithGoogle() {
  const result = await signInWithPopup(auth, googleProvider);
  const idToken = await result.user.getIdToken();
  const data = await apiRequest<{ email: string; uid: string; message: string }>(
    '/login',
    {
      method: 'POST',
      body: JSON.stringify({ id_token: idToken }),
    }
  );
  return { ...data, idToken };
}

export async function signUpWithEmail(email: string, password: string) {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const idToken = await userCredential.user.getIdToken();
  return { user: userCredential.user, idToken };
}

export async function logout(idToken: string) {
  await apiRequest('/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${idToken}`,
    },
  });
  await auth.signOut();
}

export function setSession(email: string, uid: string, idToken?: string) {
  localStorage.setItem('lumina_user', JSON.stringify({ email, uid, idToken }));
}

export function getSession() {
  const data = localStorage.getItem('lumina_user');
  return data ? JSON.parse(data) : null;
}

export function clearSession() {
  localStorage.removeItem('lumina_user');
}