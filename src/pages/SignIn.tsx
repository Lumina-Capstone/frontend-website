import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { signInWithEmail, signInWithGoogle, setSession } from '../services/auth';

export default function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const isFormValid = email.trim() !== '' && password.trim() !== '';

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;
    setError('');
    setIsLoading(true);

    try {
      const user = await signInWithEmail(email, password);
      setSession(user);
      navigate('/dashboard');
    } catch (err: any) {
      let message = err.message;
      if (message.includes('auth/user-not-found')) message = 'Email tidak ditemukan.';
      else if (message.includes('auth/wrong-password')) message = 'Password salah.';
      else if (message.includes('auth/invalid-email')) message = 'Email tidak valid.';
      else if (message.includes('auth/too-many-requests')) message = 'Terlalu banyak percobaan. Coba lagi nanti.';
      else message = 'Login gagal. Periksa email dan password.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setError('');
    try {
      const user = await signInWithGoogle();
      setSession(user);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Google sign-in failed.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] font-['Inter',sans-serif] selection:bg-[#D1E8DA] selection:text-[#0B1A13] flex flex-col justify-center items-center p-6 relative overflow-hidden">
      
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#E8F2EC] rounded-full mix-blend-multiply filter blur-[100px] opacity-70 pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-[#F2EDE8] rounded-full mix-blend-multiply filter blur-[100px] opacity-60 pointer-events-none"></div>

      <div className="w-full max-w-md bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#E8F2EC] p-8 md:p-10 relative z-10">
        
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 py-1.5 px-2 -ml-2 text-[#7D8F85] hover:text-emerald-600 transition-colors duration-200 rounded-lg"
          >
            <span className="material-symbols-outlined text-xl">
              arrow_back
            </span>
            <span className="text-sm font-medium">Back to home</span>
          </Link>
        </div>

        <div className="mb-8 text-center">
          <div className="bg-emerald-600 text-white w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-sm">
             <span className="material-symbols-outlined text-2xl">spa</span>
          </div>
          <h2 className="font-['Manrope',sans-serif] text-3xl font-bold text-[#0B1A13] tracking-tight mb-2">
            Welcome back
          </h2>
          <p className="text-[#4A5D52] text-sm font-light">Log in to access your digital records</p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm text-center font-medium">
            {error}
          </div>
        )}

        <button
          onClick={handleGoogleSignIn}
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-3 py-3.5 px-4 border border-[#E8F2EC] rounded-xl bg-white hover:bg-[#FDFBF7] transition-colors duration-200 font-medium text-[#0B1A13] disabled:opacity-60 disabled:cursor-not-allowed shadow-sm"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          <span>{isLoading ? 'Signing in...' : 'Sign in with Google'}</span>
        </button>

        <div className="relative flex items-center justify-center my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#E8F2EC]"></div>
          </div>
          <span className="relative px-4 bg-white text-xs uppercase tracking-wider text-[#7D8F85] font-semibold">
            Or continue with email
          </span>
        </div>

        <form className="space-y-5" onSubmit={handleSignIn}>
          <div className="space-y-1.5">
            <label htmlFor="email" className="block text-sm font-medium text-[#1A2E22]">
              Email address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="farmer@example.com"
              className="w-full px-4 py-3.5 bg-[#FDFBF7] border border-[#E8F2EC] rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white transition-all duration-200 outline-none text-[#0B1A13] placeholder:text-[#7D8F85]"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label htmlFor="password" className="block text-sm font-medium text-[#1A2E22]">
                Password
              </label>
              <Link to="/forgot-password" className="text-xs text-emerald-600 hover:text-emerald-700 font-medium transition-colors">
                Forgot password?
              </Link>
            </div>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="w-full px-4 py-3.5 bg-[#FDFBF7] border border-[#E8F2EC] rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white transition-all duration-200 outline-none text-[#0B1A13] placeholder:text-[#7D8F85]"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading || !isFormValid}
            className="w-full bg-emerald-600 text-white py-3.5 rounded-xl font-bold text-sm hover:bg-emerald-500 hover:shadow-lg hover:shadow-emerald-600/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
          >
            {isLoading ? 'Logging in...' : 'Sign In'}
          </button>
        </form>

      </div>
      
      <p className="text-sm text-[#7D8F85] mt-8 relative z-10">
        Don't have an account?{' '}
        <Link to="/signup" className="font-bold text-emerald-600 hover:text-emerald-700 transition-colors">
          Create account
        </Link>
      </p>

    </div>
  );
}