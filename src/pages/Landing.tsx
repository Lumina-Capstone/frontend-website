import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <div className="bg-background text-on-surface font-body selection:bg-primary-container selection:text-on-primary-container min-h-screen">
      {/* TopNavBar */}
      <header className="fixed top-0 w-full z-50 flex justify-between items-center px-8 py-4 max-w-full bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-xl">
        <div className="font-headline text-2xl font-bold tracking-tighter text-slate-900 dark:text-slate-50">
          Lumina
        </div>
        <div className="flex items-center gap-8">
          <nav className="hidden md:flex gap-6 items-center">
            <a className="font-headline tracking-tight text-slate-600 dark:text-slate-400 hover:text-lime-500 transition-colors duration-300" href="#">Product</a>
            <a className="font-headline tracking-tight text-slate-600 dark:text-slate-400 hover:text-lime-500 transition-colors duration-300" href="#">Features</a>
            <a className="font-headline tracking-tight text-slate-600 dark:text-slate-400 hover:text-lime-500 transition-colors duration-300" href="#">Pricing</a>
          </nav>
          <div className="flex items-center gap-4">
            <Link to="/login" className="font-headline tracking-tight text-slate-600 dark:text-slate-400 hover:text-lime-500 transition-colors duration-300 scale-95 active:opacity-80">
              Login
            </Link>
            <Link to="/signup" className="bg-primary-container text-on-primary-fixed px-6 py-2.5 rounded-full font-headline font-bold tracking-tight scale-95 active:opacity-80 transition-all shadow-sm hover:shadow-md">
              Sign Up
            </Link>
          </div>
        </div>
      </header>

      <main className="relative pt-24 overflow-hidden">
        {/* Abstract Background Prisms/Nodes */}
        <div className="absolute top-40 -left-12 w-96 h-96 bg-secondary-container/10 rounded-full blur-3xl -z-10"></div>
        <div className="absolute top-[20%] right-0 w-[500px] h-[500px] bg-primary-container/5 rounded-full blur-[120px] -z-10"></div>
        <div className="prismatic-node top-32 left-1/4"></div>
        <div className="prismatic-node top-64 right-1/3"></div>
        <div className="prismatic-node bottom-20 left-1/2"></div>
        <div className="prismatic-node top-[80%] right-[10%]"></div>

        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-8 pt-20 pb-32 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-7 space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface-container-low rounded-full border border-outline-variant/15">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
              <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-on-surface-variant">Intelligent OCR Tracking</span>
            </div>
            <h1 className="font-headline text-6xl md:text-8xl font-extrabold tracking-tight text-on-surface leading-[1.05]">
              Automate your <span className="text-secondary italic font-light">receipts</span> with total clarity.
            </h1>
            <p className="text-xl md:text-2xl text-on-surface-variant max-w-xl font-light leading-relaxed">
              Lumina captures every detail with surgical precision. Transform messy paper trails into structured financial intelligence instantly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link to="/signup" className="bg-primary-container text-on-primary-fixed px-10 py-5 rounded-full font-headline font-extrabold text-lg tracking-tight hover:brightness-105 transition-all editorial-shadow flex items-center justify-center gap-3">
                Get Started
                <span className="material-symbols-outlined text-xl">arrow_forward</span>
              </Link>
              <button className="px-10 py-5 rounded-full font-headline font-bold text-lg tracking-tight text-on-surface hover:bg-surface-container-high transition-all flex items-center justify-center">
                View Demo
              </button>
            </div>
          </div>
          <div className="lg:col-span-5 relative">
            <div className="relative z-10 editorial-shadow rounded-2xl overflow-hidden bg-surface-container-lowest p-4">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAjaY8ccb5O_61OgJtAoODFomJUuRBimcVcqTNfEmePHpVJijNq0rYHN-vXZpPcHJzDkwP4KecmCzCyrvN3CB4nWcc63s31ulDcHSLbftUU0oEX3HpfpMvRRwxlbTafoDzBn0TRT-xDnHURkrghxS4qQdCytsWDfxiB3H_djo9mLelboHiweIdOFvXv6gOw0aPIC1LrX2oopjWKZrFbyb_Y9AbQKcKpvbeqasA1PtdCTovaY3TbW8U393sbFEpQ8JWnDBa7KxAdnrI"
                alt="Financial Dashboard"
                data-alt="Modern minimalist financial dashboard on a tablet showing clean charts and scanned receipt data with lime green accents"
                className="w-full h-auto rounded-xl grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
              />
            </div>
            {/* Floating Decorative Card */}
            <div className="absolute -bottom-10 -left-10 z-20 bg-surface-container-lowest p-6 rounded-2xl editorial-shadow hidden md:block max-w-[240px]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center">
                  <span className="material-symbols-outlined text-on-secondary-container" data-weight="fill" style={{fontVariationSettings: "'FILL' 1"}}>receipt</span>
                </div>
                <div>
                  <p className="text-xs font-bold text-on-surface">Receipt Scanned</p>
                  <p className="text-[10px] text-on-surface-variant">Just now</p>
                </div>
              </div>
              <div className="h-2 w-full bg-surface-container-low rounded-full overflow-hidden">
                <div className="h-full bg-secondary w-3/4"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Bento Grid Feature Section */}
        <section className="bg-surface-container-low py-32 px-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-20 max-w-2xl">
              <h2 className="font-headline text-4xl md:text-5xl font-bold tracking-tight text-on-surface mb-6">Built for the modern meticulous professional.</h2>
              <p className="text-on-surface-variant text-lg">We've removed the friction from expense management using high-fidelity OCR technology.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 h-auto">
              {/* Large Feature Card */}
              <div className="md:col-span-8 bg-surface-container-lowest p-10 rounded-3xl group hover:bg-surface-bright transition-colors editorial-shadow border border-outline-variant/5">
                <div className="h-full flex flex-col justify-between">
                  <div className="max-w-md">
                    <span className="material-symbols-outlined text-4xl text-secondary mb-6" data-weight="fill" style={{fontVariationSettings: "'FILL' 1"}}>precision_manufacturing</span>
                    <h3 className="text-3xl font-headline font-bold mb-4">99.9% Extraction Accuracy</h3>
                    <p className="text-on-surface-variant leading-relaxed">Our proprietary neural networks understand complex invoices, handwritten notes, and faded receipts better than a human ever could.</p>
                  </div>
                  <div className="mt-12 overflow-hidden rounded-xl h-64 relative bg-surface-container-low">
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBNn3UQ1ZeL65M82TKgoECwBqmr8pn2WnyvcH_mvQs7LkMztbLmCfsF-oQkT_elehM9TAXOqrID0WCtyzUZMai1NdV2CWeLMOa65ryU_dqd7gMap2XHvLPxuPYo5m-1Q7p4cf1DK4oPoR-5ydRi_wBdLJGSJmegV8NCqRRdGcZIXvYV5wHza4nS-vXroQN4rpHJlrOuygRSumSLblgnoaENJsU55WKEdPjJ1D1PFNj4fYnxBL7JP3P3McTvrOjbqIQrTicqB_Qprxg"
                      alt="Tech Abstract"
                      data-alt="Close up of a high-tech circuit board with glowing cyan pathways and subtle depth of field"
                      className="w-full h-full object-cover opacity-60 mix-blend-multiply grayscale"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-surface-container-lowest/90 backdrop-blur-md px-8 py-4 rounded-full font-headline font-bold text-secondary">
                        Processing... Verified.
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Small Feature Card 1 */}
              <div className="md:col-span-4 bg-surface-container-lowest p-10 rounded-3xl group hover:bg-surface-bright transition-colors editorial-shadow border border-outline-variant/5">
                <span className="material-symbols-outlined text-4xl text-secondary mb-6">bolt</span>
                <h3 className="text-2xl font-headline font-bold mb-4">Real-time Sync</h3>
                <p className="text-on-surface-variant">Instantly sync your expenses with QuickBooks, Xero, and more than 40 other enterprise platforms.</p>
              </div>

              {/* Small Feature Card 2 */}
              <div className="md:col-span-4 bg-surface-container-lowest p-10 rounded-3xl group hover:bg-surface-bright transition-colors editorial-shadow border border-outline-variant/5">
                <span className="material-symbols-outlined text-4xl text-secondary mb-6">verified_user</span>
                <h3 className="text-2xl font-headline font-bold mb-4">Bank-grade Security</h3>
                <p className="text-on-surface-variant">Your financial data is encrypted at rest and in transit with AES-256 protocols.</p>
              </div>

              {/* Medium Feature Card */}
              <div className="md:col-span-8 bg-surface-container-lowest p-10 rounded-3xl group hover:bg-surface-bright transition-colors editorial-shadow border border-outline-variant/5 relative overflow-hidden">
                <div className="relative z-10 flex flex-col h-full justify-center">
                  <h3 className="text-3xl font-headline font-bold mb-4">The Editorial Experience</h3>
                  <p className="text-on-surface-variant max-w-sm">Finance doesn't have to be ugly. Lumina provides a quiet, focused interface designed for clarity.</p>
                </div>
                <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-secondary-container/20 to-transparent"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Proof Section */}
        <section className="py-32 px-8 max-w-7xl mx-auto flex flex-col items-center text-center">
          <h2 className="font-headline text-3xl font-bold mb-16 opacity-40">TRUSTED BY TEAMS AT</h2>
          <div className="flex flex-wrap justify-center gap-16 grayscale opacity-50 contrast-125">
            <span className="text-3xl font-headline font-black tracking-tighter">PRISM</span>
            <span className="text-3xl font-headline font-black tracking-tighter">VELOCITY</span>
            <span className="text-3xl font-headline font-black tracking-tighter">ORBIT</span>
            <span className="text-3xl font-headline font-black tracking-tighter">ZENITH</span>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-8 pb-32">
          <div className="max-w-7xl mx-auto rounded-[3rem] bg-on-surface p-16 md:p-24 relative overflow-hidden text-center md:text-left">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-br from-secondary/20 to-primary/10 blur-3xl"></div>
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="max-w-2xl">
                <h2 className="font-headline text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-tight mb-8">Ready to clear the paper clutter?</h2>
                <p className="text-white/60 text-xl md:text-2xl font-light">Join 15,000+ businesses automating their finance operations today.</p>
              </div>
              <Link to="/signup" className="shrink-0 bg-primary-container text-on-primary-fixed px-12 py-6 rounded-full font-headline font-extrabold text-xl tracking-tight hover:scale-105 active:scale-95 transition-all shadow-2xl">
                Start Free Trial
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full flex flex-col md:flex-row justify-between items-center px-8 py-12 bg-slate-50 dark:bg-slate-950 border-t border-slate-200/15 dark:border-slate-800/15">
        <div className="mb-6 md:mb-0">
          <p className="font-body text-xs uppercase tracking-widest text-slate-500">© 2024 Lumina Tech. All rights reserved.</p>
        </div>
        <nav className="flex gap-10">
          <a className="font-body text-xs uppercase tracking-widest text-slate-500 hover:text-lime-500 transition-colors" href="#">Privacy Policy</a>
          <a className="font-body text-xs uppercase tracking-widest text-slate-500 hover:text-lime-500 transition-colors" href="#">Terms of Service</a>
          <a className="font-body text-xs uppercase tracking-widest text-slate-500 hover:text-lime-500 transition-colors" href="#">Contact</a>
        </nav>
      </footer>
    </div>
  );
}
