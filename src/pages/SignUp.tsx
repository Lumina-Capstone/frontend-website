import { Link, useNavigate } from 'react-router-dom';

export default function SignUp() {
  const navigate = useNavigate();

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="bg-background font-body text-on-surface antialiased overflow-hidden h-screen flex">
      {/* Left Side: Editorial Image & Brand Identity */}
      <section className="hidden lg:flex lg:w-1/2 relative bg-surface-variant overflow-hidden items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=2564"
            data-alt="Abstract minimalist background with soft teal and lime gradients, fluid organic shapes, and a sophisticated editorial mood."
            className="w-full h-full object-cover"
            alt="Abstract background"
          />
          <div className="absolute inset-0 bg-on-surface/10 backdrop-blur-3xl"></div>
        </div>

        <div className="relative z-10 p-16 max-w-xl">
          <div className="flex items-center gap-2 mb-8">
            <div className="prism-node"></div>
            <span className="font-headline font-extrabold text-2xl tracking-tighter text-on-surface uppercase pl-4">Lumina</span>
          </div>
          <h1 className="font-headline text-6xl font-extrabold tracking-tight text-on-surface leading-none mb-6">
            Enter the <br/>Digital Atheneum.
          </h1>
          <p className="text-on-surface-variant text-lg leading-relaxed max-w-md">
            Join a community of forward-thinkers curating the future through technical precision and atmospheric warmth.
          </p>

          <div className="mt-12 flex gap-4">
            <div className="w-12 h-1 bg-primary-container"></div>
            <div className="w-12 h-1 bg-secondary-container/30"></div>
            <div className="w-12 h-1 bg-secondary-container/30"></div>
          </div>
        </div>

        {/* Abstract Signature Elements */}
        <div className="absolute bottom-10 right-10 flex gap-2">
          <div className="prism-node opacity-50 relative top-0 left-0"></div>
          <div className="prism-node relative top-0 left-0"></div>
        </div>
      </section>

      {/* Right Side: Registration Form */}
      <section className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-surface-container-low relative">
        {/* Background "Prism" bleed */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-secondary-container/10 blur-[100px] rounded-full"></div>

        <div className="w-full max-w-md bg-surface-container-lowest p-10 lg:p-12 shadow-[0_40px_60px_-15px_rgba(25,28,30,0.05)] relative z-10 rounded-lg">
          <div className="mb-10">
            <h2 className="font-headline text-3xl font-extrabold tracking-tight text-on-surface mb-2">Create your account</h2>
            <p className="text-on-surface-variant text-sm uppercase tracking-widest">Start your premium experience</p>
          </div>

          {/* Google Sign Up */}
          <button className="w-full flex items-center justify-center gap-3 py-3.5 px-4 bg-surface-container-lowest border border-outline-variant/30 rounded-lg text-on-surface font-medium hover:bg-surface-bright transition-all duration-300 active:scale-95 mb-8">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            <span>Sign up with Google</span>
          </button>

          <div className="relative flex items-center mb-8">
            <div className="flex-grow border-t border-outline-variant/20"></div>
            <span className="flex-shrink mx-4 text-xs uppercase tracking-widest text-on-surface-variant">OR</span>
            <div className="flex-grow border-t border-outline-variant/20"></div>
          </div>

          {/* Registration Form */}
          <form className="space-y-6" onSubmit={handleSignUp}>
            <div>
              <label className="block text-xs uppercase tracking-widest text-on-surface-variant mb-2 ml-1">Full Name</label>
              <input
                type="text"
                placeholder="Alexander Lumis"
                className="w-full px-4 py-3.5 bg-surface-container-low border-none rounded-lg focus:ring-1 focus:ring-secondary/50 focus:bg-surface-container-lowest transition-all duration-300 placeholder:text-on-surface-variant/40 text-on-surface"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-on-surface-variant mb-2 ml-1">Email</label>
              <input
                type="email"
                placeholder="alexander@lumina.tech"
                className="w-full px-4 py-3.5 bg-surface-container-low border-none rounded-lg focus:ring-1 focus:ring-secondary/50 focus:bg-surface-container-lowest transition-all duration-300 placeholder:text-on-surface-variant/40 text-on-surface"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-on-surface-variant mb-2 ml-1">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-3.5 bg-surface-container-low border-none rounded-lg focus:ring-1 focus:ring-secondary/50 focus:bg-surface-container-lowest transition-all duration-300 placeholder:text-on-surface-variant/40 text-on-surface"
              />
            </div>

            <div className="flex items-start gap-3 pt-2">
              <input type="checkbox" className="mt-1 rounded-sm border-outline-variant text-primary focus:ring-primary-container" />
              <p className="text-xs text-on-surface-variant leading-relaxed">
                I agree to the <a href="#" className="text-on-surface font-semibold hover:text-primary transition-colors underline underline-offset-4 decoration-primary-container/30">Terms of Service</a> and <a href="#" className="text-on-surface font-semibold hover:text-primary transition-colors underline underline-offset-4 decoration-primary-container/30">Privacy Policy</a>.
              </p>
            </div>

            <div className="pt-4">
              <button type="submit" className="w-full bg-primary-container text-on-primary-fixed font-headline font-bold py-4 rounded-lg shadow-sm hover:shadow-xl hover:brightness-105 active:scale-[0.98] transition-all duration-300 bg-gradient-to-br from-primary-container to-primary-fixed flex items-center justify-center gap-2">
                <span>Create Account</span>
                <span className="material-symbols-outlined text-xl">arrow_forward</span>
              </button>
            </div>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-on-surface-variant">
              Already have an account?
              <Link to="/login" className="text-on-surface font-bold hover:text-primary transition-colors ml-1">Login</Link>
            </p>
          </div>
        </div>

        {/* Footer Text (Subtle) */}
        <div className="absolute bottom-8 text-center w-full">
          <p className="text-[10px] uppercase tracking-[0.2em] text-on-surface-variant opacity-50">© 2024 Lumina Tech. Authority in Design.</p>
        </div>
      </section>
    </div>
  );
}
