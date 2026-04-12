import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { signUpWithEmail, signInWithGoogle, setSession } from '../services/auth';

export default function SignUp() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); 
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{
    fullName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    general?: string;
  }>({});

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
    return Object.keys(newErrors).filter(k => k !== 'general').length === 0;
  };

  const isFormValid =
    fullName.trim() !== '' &&
    email.trim() !== '' &&
    password.trim() !== '' &&
    confirmPassword.trim() !== '' &&
    !errors.fullName &&
    !errors.email &&
    !errors.password &&
    !errors.confirmPassword;

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    setErrors({});

    try {
      await signUpWithEmail(email, password);
      navigate('/login');
    } catch (err: any) {
      let message = err.message;
      if (message.includes('auth/email-already-in-use')) message = 'Email sudah terdaftar. Silakan login.';
      else if (message.includes('auth/weak-password')) message = 'Password terlalu lemah. Minimal 6 karakter.';
      else message = 'Pendaftaran gagal. Coba lagi.';
      setErrors({ general: message });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setIsLoading(true);
    setErrors({});
    try {
      const user = await signInWithGoogle();
      setSession(user);
      navigate('/login');
    } catch (err: any) {
      setErrors({ general: err.message || 'Google sign-up failed.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] font-['Inter',sans-serif] selection:bg-[#D1E8DA] selection:text-[#0B1A13] flex flex-col justify-center items-center py-12 px-6 relative overflow-hidden">
      
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#E8F2EC] rounded-full mix-blend-multiply filter blur-[100px] opacity-70 pointer-events-none fixed"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-[#F2EDE8] rounded-full mix-blend-multiply filter blur-[100px] opacity-60 pointer-events-none fixed"></div>

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
            Create an account
          </h2>
          <p className="text-[#4A5D52] text-sm font-light">Start managing your digital records</p>
        </div>

        {errors.general && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm text-center font-medium">
            {errors.general}
          </div>
        )}

        <button
          onClick={handleGoogleSignUp}
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-3 py-3.5 px-4 border border-[#E8F2EC] rounded-xl bg-white hover:bg-[#FDFBF7] transition-colors duration-200 font-medium text-[#0B1A13] disabled:opacity-60 disabled:cursor-not-allowed shadow-sm"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          <span>{isLoading ? 'Signing up...' : 'Sign up with Google'}</span>
        </button>

        <div className="relative flex items-center justify-center my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#E8F2EC]"></div>
          </div>
          <span className="relative px-4 bg-white text-xs text-[#7D8F85] font-semibold uppercase tracking-wider">
            Or continue with email
          </span>
        </div>

        <form className="space-y-5" onSubmit={handleSignUp}>
          <div className="space-y-1.5">
            <label htmlFor="fullName" className="block text-sm font-medium text-[#1A2E22]">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              onBlur={validateForm}
              placeholder="John Farmer"
              className="w-full px-4 py-3.5 bg-[#FDFBF7] border border-[#E8F2EC] rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:bg-white transition-all duration-200 outline-none text-[#0B1A13] placeholder:text-[#7D8F85]"
            />
            {errors.fullName && <p className="text-xs text-red-500 font-medium mt-1">{errors.fullName}</p>}
          </div>

          <div className="space-y-1.5">
            <label htmlFor="email" className="block text-sm font-medium text-[#1A2E22]">
              Email address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={validateForm}
              placeholder="farmer@example.com"
              className="w-full px-4 py-3.5 bg-[#FDFBF7] border border-[#E8F2EC] rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:bg-white transition-all duration-200 outline-none text-[#0B1A13] placeholder:text-[#7D8F85]"
            />
            {errors.email && <p className="text-xs text-red-500 font-medium mt-1">{errors.email}</p>}
          </div>

          <div className="space-y-1.5">
            <label htmlFor="password" className="block text-sm font-medium text-[#1A2E22]">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={validateForm}
                placeholder="••••••••"
                className="w-full px-4 py-3.5 bg-[#FDFBF7] border border-[#E8F2EC] rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:bg-white transition-all duration-200 outline-none text-[#0B1A13] placeholder:text-[#7D8F85]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-4 text-[#7D8F85] hover:text-[#0B1A13] transition-colors"
              >
                <span className="material-symbols-outlined text-xl">
                  {showPassword ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>
            {errors.password && <p className="text-xs text-red-500 font-medium mt-1">{errors.password}</p>}
          </div>

          <div className="space-y-1.5">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#1A2E22]">
              Confirm Password
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onBlur={validateForm}
              placeholder="••••••••"
              className="w-full px-4 py-3.5 bg-[#FDFBF7] border border-[#E8F2EC] rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:bg-white transition-all duration-200 outline-none text-[#0B1A13] placeholder:text-[#7D8F85]"
            />
            {errors.confirmPassword && <p className="text-xs text-red-500 font-medium mt-1">{errors.confirmPassword}</p>}
          </div>

          <button
            type="submit"
            disabled={isLoading || !isFormValid}
            className="w-full bg-emerald-600 text-white py-3.5 rounded-xl font-bold text-sm transition-all duration-300 shadow-sm hover:bg-emerald-500 hover:shadow-lg hover:shadow-emerald-600/20 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed mt-4"
          >
            {isLoading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

      </div>

      <p className="text-sm text-[#7D8F85] mt-8 relative z-10">
        Already have an account?{' '}
        <Link to="/signin" className="font-bold text-emerald-600 hover:text-emerald-700 transition-colors">
          Sign In
        </Link>
      </p>

    </div>
  );
}