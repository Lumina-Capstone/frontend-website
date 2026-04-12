import { Link } from 'react-router-dom';
import { useState } from 'react';
import { resetPassword } from '../services/auth'; 

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    
    setIsLoading(true);
    setError('');

    try {
      await resetPassword(email);
      setIsSent(true);
    } catch (err: any) {
      let message = err.message;
      if (message.includes('auth/user-not-found')) message = 'No account found with this email.';
      else message = 'Failed to send reset email. Please try again.';
      setError(message);
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
            to="/login"
            className="inline-flex items-center gap-2 py-1.5 px-2 -ml-2 text-[#7D8F85] hover:text-emerald-600 transition-colors duration-200 rounded-lg"
          >
            <span className="material-symbols-outlined text-xl">
              arrow_back
            </span>
            <span className="text-sm font-medium">Back to login</span>
          </Link>
        </div>

        {!isSent ? (
          <>
            <div className="mb-8 text-center">
              <div className="bg-[#E8F2EC] text-emerald-600 w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-sm border border-white">
                 <span className="material-symbols-outlined text-2xl">lock_reset</span>
              </div>
              <h2 className="font-['Manrope',sans-serif] text-3xl font-bold text-[#0B1A13] tracking-tight mb-2">
                Reset password
              </h2>
              <p className="text-[#4A5D52] text-sm font-light leading-relaxed max-w-[280px] mx-auto">
                Enter your email address and we'll send you a link to get back into your account.
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm text-center font-medium">
                {error}
              </div>
            )}

            <form className="space-y-5" onSubmit={handleReset}>
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
                  className="w-full px-4 py-3.5 bg-[#FDFBF7] border border-[#E8F2EC] rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:bg-white transition-all duration-200 outline-none text-[#0B1A13] placeholder:text-[#7D8F85]"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading || !email.trim()}
                className="w-full bg-emerald-600 text-white py-3.5 rounded-xl font-bold text-sm transition-all duration-300 shadow-sm hover:bg-emerald-500 hover:shadow-lg hover:shadow-emerald-600/20 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed mt-4"
              >
                {isLoading ? 'Sending...' : 'Send Reset Link'}
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-4">
            <div className="bg-emerald-50 text-emerald-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_20px_-5px_rgba(16,185,129,0.3)]">
               <span className="material-symbols-outlined text-3xl">mark_email_read</span>
            </div>
            <h2 className="font-['Manrope',sans-serif] text-2xl font-bold text-[#0B1A13] tracking-tight mb-3">
              Check your inbox
            </h2>
            <p className="text-[#4A5D52] text-sm font-light leading-relaxed mb-8">
              We've sent a password recovery link to <span className="font-medium text-[#1A2E22]">{email}</span>. Please check your spam folder if you don't see it within a few minutes.
            </p>
            <button
              onClick={() => setIsSent(false)}
              className="text-sm font-bold text-emerald-600 hover:text-emerald-700 transition-colors"
            >
              Try another email address
            </button>
          </div>
        )}

      </div>

      <p className="text-sm text-[#7D8F85] mt-8 relative z-10">
        Remember your password?{' '}
        <Link to="/signin" className="font-bold text-emerald-600 hover:text-emerald-700 transition-colors">
          Sign In
        </Link>
      </p>

    </div>
  );
}