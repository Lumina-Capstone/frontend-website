import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function SignUp() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{
    fullName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  // Check if form is valid for enabling button
  const isFormValid =
    fullName.trim() !== '' &&
    email.trim() !== '' &&
    password.trim() !== '' &&
    confirmPassword.trim() !== '' &&
    Object.keys(errors).length === 0;

  const validateForm = () => {
    const newErrors: typeof errors = {};

    if (!fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (fullName.trim().length < 3) {
      newErrors.fullName = 'Name must be at least 3 characters';
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Enter a valid email address';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);

    try {
      // Replace with Firebase Auth
      await new Promise(resolve => setTimeout(resolve, 1500));
      navigate('/dashboard');
    } catch (err: any) {
      setErrors({ email: err.message || 'Registration failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      navigate('/dashboard');
    } catch (err: any) {
      setErrors({ email: 'Google sign-up failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white font-body min-h-screen flex">
      {/* Left Side: Branding - improved vertical spacing */}
      <section className="hidden md:flex flex-col justify-center w-1/2 bg-gradient-to-br from-gray-900 to-gray-800 p-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-green-600/10 via-transparent to-transparent"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-green-500 rounded-full opacity-10 blur-3xl"></div>
        
        <div className="relative z-10 max-w-lg -mt-8">
          <h1 className="font-headline text-5xl font-bold text-white leading-tight tracking-tight mb-4">
            Start digitizing your <span className="text-green-400">farm records</span>
          </h1>
          <p className="text-gray-300 text-lg leading-relaxed">
            Create an account to manage production data and track expenses efficiently.
          </p>
        </div>
      </section>

      {/* Right Side: Sign Up Form */}
      <section className="w-full md:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          {/* Back to home link */}
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
              Create your Lumina account
            </h2>
            <p className="text-gray-500 text-sm">
              Start managing your digital records
            </p>
          </div>

          {/* Google Sign-Up */}
          <button
            onClick={handleGoogleSignUp}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-gray-300 rounded-xl bg-white hover:bg-gray-50 transition-all duration-200 font-medium text-gray-700 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            <span>{isLoading ? 'Signing up...' : 'Sign up with Google'}</span>
          </button>

          {/* Divider - reduced prominence */}
          <div className="relative flex items-center justify-center my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-100"></div>
            </div>
            <span className="relative px-4 bg-white text-xs text-gray-400 uppercase tracking-wider">
              Or continue with email
            </span>
          </div>

          {/* Sign Up Form */}
          <form className="space-y-5" onSubmit={handleSignUp}>
            {/* Full Name */}
            <div className="space-y-1">
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                onBlur={() => validateForm()}
                placeholder="John Farmer"
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-200 outline-none text-gray-900 placeholder:text-gray-400"
              />
              {errors.fullName && (
                <p className="text-xs text-red-600 mt-1">{errors.fullName}</p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-1">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => validateForm()}
                placeholder="farmer@example.com"
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-200 outline-none text-gray-900 placeholder:text-gray-400"
              />
              {errors.email && (
                <p className="text-xs text-red-600 mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password with visibility toggle - icon size 18px */}
            <div className="space-y-1">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={() => validateForm()}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-200 outline-none text-gray-900 placeholder:text-gray-400 pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <span className="material-symbols-outlined text-lg">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-red-600 mt-1">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password with visibility toggle - icon size 18px */}
            <div className="space-y-1">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onBlur={() => validateForm()}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-200 outline-none text-gray-900 placeholder:text-gray-400 pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <span className="material-symbols-outlined text-lg">
                    {showConfirmPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-xs text-red-600 mt-1">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Create Account Button - polished states */}
            <button
              type="submit"
              disabled={isLoading || !isFormValid}
              className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold text-sm transition-all duration-200 shadow-sm hover:bg-green-700 focus:ring-2 focus:ring-green-500/20 focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-green-600"
            >
              {isLoading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <footer className="text-center mt-8">
            <p className="text-sm text-gray-500">
              Already have an account?{' '}
              <Link to="/login" className="font-semibold text-green-600 hover:text-green-700 transition">
                Login
              </Link>
            </p>
          </footer>
        </div>
      </section>
    </div>
  );
}