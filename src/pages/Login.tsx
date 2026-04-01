import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="bg-background font-body text-on-background overflow-hidden h-screen flex">
      {/* Left Side: Editorial Authority / Brand Side */}
      <section className="hidden md:flex flex-col justify-between w-1/2 bg-on-surface p-24 relative overflow-hidden">
        {/* Background Prism Aesthetic */}
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-secondary rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-primary-container rounded-full opacity-5 blur-3xl"></div>
        <div className="z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-container flex items-center justify-center rounded-lg">
              <span className="material-symbols-outlined text-on-primary-fixed">lightbulb</span>
            </div>
            <span className="font-headline text-3xl font-extrabold tracking-tighter text-white">Lumina</span>
          </div>
        </div>
        <div className="z-10 max-w-lg">
          <h1 className="font-headline text-display-lg text-6xl font-extrabold text-white leading-tight tracking-tighter">
            Illuminating the <span className="text-primary-container">Next Generation</span> of Digital Strategy.
          </h1>
          <p className="mt-8 text-surface-variant text-lg font-light leading-relaxed max-w-sm">
            Access our premium tech ecosystem designed for architectural precision and atmospheric warmth.
          </p>
        </div>
        <div className="z-10 flex gap-4">
          <div className="w-1 h-1 rounded-full bg-secondary"></div>
          <div className="w-1 h-1 rounded-full bg-secondary-container opacity-50"></div>
          <div className="w-1 h-1 rounded-full bg-primary-container opacity-25"></div>
        </div>
      </section>

      {/* Right Side: Interaction / Login Side */}
      <section className="w-full md:w-1/2 flex items-center justify-center p-8 bg-surface prism-bg relative">
        <div className="w-full max-w-md bg-surface-container-lowest rounded-xl shadow-[0_32px_64px_-15px_rgba(25,28,30,0.06)] p-12 border border-outline-variant/10">
          <header className="mb-10 text-center md:text-left">
            <h2 className="font-headline text-3xl font-extrabold text-on-surface tracking-tight mb-2">Welcome Back</h2>
            <p className="text-on-surface-variant text-sm">Enter your credentials to access the Atheneum.</p>
          </header>

          <div className="space-y-6">
            {/* Social Login */}
            <button className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-outline-variant/30 rounded-lg bg-surface-container-low hover:bg-surface-container-high transition-all duration-300 font-medium text-on-surface-variant">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB0yjUiDzORa78p41DJwHn3hja3CsMLsFlNdg68PjSWEddFkHDR4WD50B7kCRM2vrWjArAFqgma2ChfRFYW5_0uVWdz99B-dfSrXm1eXQ4u4WVnRMiSIvIIpjR7nHnXatjvpm6vkRTo3xpBKsg0X2n9FZp5zi9YA-MrosUzcK6f8ELMat8KsoRLko9b4qwt2gycMyphBOx4vPTQ5DXtxlUCJMk7wOi9sarhU1_lIw8W8ASzUYMLqehlFog9UpIJOfwbcVOMD3kwXBE"
                alt="Google"
                data-alt="clean minimal google logo icon on white background"
                className="w-5 h-5"
              />
              <span>Sign in with Google</span>
            </button>

            <div className="relative flex items-center justify-center py-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-outline-variant/20"></div>
              </div>
              <span className="relative px-4 bg-surface-container-lowest text-xs uppercase tracking-widest text-on-surface-variant/60 font-medium">Or continue with email</span>
            </div>

            <form className="space-y-5" onSubmit={handleLogin}>
              <div className="space-y-2">
                <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-widest text-on-surface-variant">Email Address</label>
                <input
                  type="email"
                  id="email"
                  placeholder="name@lumina.tech"
                  className="w-full px-4 py-3 bg-surface-container-low border-none rounded-lg focus:ring-1 focus:ring-secondary/50 focus:bg-surface-container-lowest transition-all duration-200 outline-none text-on-surface placeholder:text-on-surface-variant/40"
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label htmlFor="password" className="block text-xs font-semibold uppercase tracking-widest text-on-surface-variant">Password</label>
                  <a href="#" className="text-xs font-medium text-secondary hover:text-secondary-fixed-dim transition-colors">Forgot?</a>
                </div>
                <input
                  type="password"
                  id="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-3 bg-surface-container-low border-none rounded-lg focus:ring-1 focus:ring-secondary/50 focus:bg-surface-container-lowest transition-all duration-200 outline-none text-on-surface placeholder:text-on-surface-variant/40"
                />
              </div>
              <button type="submit" className="w-full bg-primary-container text-on-primary-fixed py-4 rounded-lg font-bold text-sm tracking-tight hover:brightness-105 active:scale-[0.98] transition-all shadow-[0_8px_20px_-4px_rgba(197,216,45,0.4)]">
                Sign In to Lumina
              </button>
            </form>

            <footer className="text-center pt-4">
              <p className="text-on-surface-variant text-sm">
                Don't have an account?
                <Link to="/signup" className="font-bold text-on-surface hover:text-primary transition-colors ml-1">Create Account</Link>
              </p>
            </footer>
          </div>
        </div>

        {/* Signature Component: Prismatic Node */}
        <div className="absolute bottom-12 right-12 flex gap-2">
          <div className="w-1.5 h-1.5 bg-secondary-container rounded-full"></div>
          <div className="w-1.5 h-1.5 bg-primary-container rounded-full opacity-30"></div>
        </div>
      </section>

      {/* Global Footer */}
      <footer className="fixed bottom-0 left-0 w-full z-40 bg-transparent flex flex-col md:flex-row justify-between items-center px-8 py-6 opacity-60 hover:opacity-100 transition-opacity">
        <span className="text-xs uppercase tracking-widest text-on-surface-variant">© 2024 Lumina Tech. All rights reserved.</span>
        <div className="flex gap-8 mt-4 md:mt-0">
          <a href="#" className="text-xs uppercase tracking-widest text-on-surface-variant hover:text-secondary transition-colors">Privacy Policy</a>
          <a href="#" className="text-xs uppercase tracking-widest text-on-surface-variant hover:text-secondary transition-colors">Terms of Service</a>
          <a href="#" className="text-xs uppercase tracking-widest text-on-surface-variant hover:text-secondary transition-colors">Contact</a>
        </div>
      </footer>
    </div>
  );
}
