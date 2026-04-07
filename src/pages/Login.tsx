import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Check if form is valid for enabling button
  const isFormValid = email.trim() !== '' && password.trim() !== '';

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;
    setError('');
    setIsLoading(true);

    try {
      // Replace with Firebase Auth
      await new Promise(resolve => setTimeout(resolve, 1500));
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setError('');
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      navigate('/dashboard');
    } catch (err: any) {
      setError('Google sign-in failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white font-body min-h-screen flex">
      {/* Left Side: Branding / System Description - simplified */}
      <section className="hidden md:flex flex-col justify-center w-1/2 bg-gradient-to-br from-gray-900 to-gray-800 p-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-green-600/10 via-transparent to-transparent"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-green-500 rounded-full opacity-10 blur-3xl"></div>
        
        <div className="relative z-10 max-w-lg">
          <h1 className="font-headline text-5xl font-bold text-white leading-tight tracking-tight mb-4">
            Digitizing farm records with <span className="text-green-400">OCR</span>
          </h1>
          <p className="text-gray-300 text-lg leading-relaxed">
            Convert handwritten records into structured data.<br />
            Track production and expenses in one place.
          </p>
        </div>
      </section>

      {/* Right Side: Login Form */}
      <section className="w-full md:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          {/* Back to home link - refined */}
          <div className="mb-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 py-1.5 px-2 -ml-2 text-gray-500 hover:text-green-600 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-green-500/20 rounded-md"
            >
              <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 0, 'wght' 300" }}>
                arrow_back
              </span>
              <span className="text-sm">Back to home</span>
            </Link>
          </div>

          <div className="mb-8 text-center md:text-left">
            <h2 className="font-headline text-3xl font-bold text-gray-900 tracking-tight mb-2">
              Login to Lumina
            </h2>
            <p className="text-gray-500 text-sm">
              Access your digital records
            </p>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="mb-6 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
              {error}
            </div>
          )}

          {/* Google Sign-In */}
          <button
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-gray-300 rounded-xl bg-white hover:bg-gray-50 transition-all duration-200 font-medium text-gray-700 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            <span>{isLoading ? 'Signing in...' : 'Sign in with Google'}</span>
          </button>

          <div className="relative flex items-center justify-center my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <span className="relative px-4 bg-white text-xs uppercase tracking-wider text-gray-400 font-medium">
              Or continue with email
            </span>
          </div>

          {/* Email/Password Form */}
          <form className="space-y-5" onSubmit={handleLogin}>
            <div className="space-y-1">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="farmer@example.com"
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all duration-200 outline-none text-gray-900 placeholder:text-gray-400"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-xs text-green-600 hover:text-green-700 font-medium transition"
                >
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
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all duration-200 outline-none text-gray-900 placeholder:text-gray-400"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading || !isFormValid}
              className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold text-sm hover:bg-green-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <footer className="text-center mt-8">
            <p className="text-sm text-gray-500">
              Don't have an account?{' '}
              <Link to="/signup" className="font-semibold text-green-600 hover:text-green-700 transition">
                Create account
              </Link>
            </p>
          </footer>
        </div>
      </section>
    </div>
  );
}