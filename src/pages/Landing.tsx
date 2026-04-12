import { Link } from 'react-router-dom';

export default function Landing() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const features = [
    {
      icon: 'precision_manufacturing',
      title: 'Accurate OCR Recognition',
      description: 'Convert handwritten notes and receipts into digital text automatically.',
    },
    {
      icon: 'bolt',
      title: 'Smart Data Extraction',
      description: 'Extract date, item, quantity, and total from any document.',
    },
    {
      icon: 'verified_user',
      title: 'Production & Expense Tracking',
      description: 'Monitor egg production and finances through clear dashboards.',
    },
  ];

  const steps = [
    {
      icon: 'upload',
      title: '1. Upload',
      description: 'Upload handwritten notes or receipts.',
    },
    {
      icon: 'auto_awesome',
      title: '2. Process',
      description: 'OCR detects and extracts key information automatically.',
    },
    {
      icon: 'insights',
      title: '3. Analyze',
      description: 'View structured data and track production & expenses.',
    },
  ];

  return (
    <div className="bg-[#FDFBF7] text-[#1A2E22] font-['Inter',sans-serif] min-h-screen selection:bg-[#D1E8DA] selection:text-[#0B1A13]">
      
      <header className="fixed top-4 w-[calc(100%-2rem)] left-4 md:w-[calc(100%-4rem)] md:left-8 z-50 flex justify-between items-center px-6 py-3 bg-white/80 backdrop-blur-xl border border-slate-200/50 rounded-2xl shadow-sm">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollToSection('home')}>
          <div className="bg-emerald-600 text-white w-8 h-8 rounded-lg flex items-center justify-center shrink-0">
             <span className="material-symbols-outlined text-xl">spa</span>
          </div>
          <span className="font-bold text-xl tracking-tight font-['Manrope',sans-serif] text-slate-800">Lumina</span>
        </div>
        <nav className="hidden md:flex gap-8 items-center px-6 py-2 border-slate-200/50">
          <button onClick={() => scrollToSection('features')} className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors">Features</button>
          <button onClick={() => scrollToSection('how-it-works')} className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors">How It Works</button>
          <button onClick={() => scrollToSection('about')} className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors">About</button>
        </nav>
        <Link to="/signin" className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-all hover:shadow-lg hover:shadow-emerald-600/20 active:scale-95">
          Sign In
        </Link>
      </header>

      <main className="relative pt-24 overflow-hidden">
        
        <div className="absolute top-0 left-1/2 w-[600px] h-[600px] bg-[#E8F2EC] rounded-full mix-blend-multiply filter blur-[100px] opacity-70 -translate-x-1/2 -translate-y-1/4 -z-10 pointer-events-none"></div>
        <div className="absolute top-64 right-1/4 w-[400px] h-[400px] bg-[#F2EDE8] rounded-full mix-blend-multiply filter blur-[80px] opacity-60 translate-x-1/2 -z-10 pointer-events-none"></div>

        <section id="home" className="max-w-5xl mx-auto px-6 pt-32 pb-40 flex flex-col items-center text-center relative z-10 mt-8">
          
          <h1 className="font-['Manrope',sans-serif] text-6xl md:text-8xl lg:text-[6.5rem] font-extrabold tracking-tight text-[#0B1A13] leading-[1.05] mb-8">
            Automate your <br/>
            <span className="text-emerald-600 italic font-light">receipts.</span>
          </h1>
          <p className="text-xl md:text-2xl text-[#4A5D52] max-w-2xl font-light leading-relaxed mb-16">
            Capture every receipt. Turn it into clean, structured data instantly.
          </p>
          
          <div className="w-full flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8">
            
            <div className="bg-white p-6 rounded-2xl shadow-xl shadow-emerald-900/5 border border-slate-100 w-full max-w-[280px] transform md:-rotate-3 transition-transform hover:rotate-0">
              <div className="flex items-center justify-between mb-6 border-b border-dashed border-slate-200 pb-4">
                 <span className="material-symbols-outlined text-slate-400">receipt_long</span>
                 <div className="h-2 w-16 bg-slate-100 rounded-full"></div>
              </div>
              <div className="space-y-4">
                <div className="h-2.5 w-full bg-slate-100 rounded-full"></div>
                <div className="h-2.5 w-3/4 bg-slate-100 rounded-full"></div>
                <div className="h-2.5 w-5/6 bg-slate-100 rounded-full"></div>
                <div className="h-2.5 w-1/2 bg-slate-100 rounded-full"></div>
              </div>
            </div>

            <div className="flex-shrink-0 bg-[#E8F2EC] w-14 h-14 rounded-full flex items-center justify-center text-emerald-600 shadow-sm border border-white md:rotate-0 rotate-90 my-4 md:my-0">
               <span className="material-symbols-outlined text-2xl">arrow_forward</span>
            </div>

            <div className="bg-[#11241A] p-6 rounded-2xl shadow-2xl shadow-emerald-900/20 w-full max-w-[320px] transform md:rotate-2 transition-transform hover:rotate-0 text-left">
              <div className="flex items-center gap-2 mb-6">
                 <span className="material-symbols-outlined text-emerald-400 text-sm">check_circle</span>
                 <span className="text-emerald-50 text-xs font-mono tracking-wider">JSON_EXTRACTED</span>
              </div>
              <div className="space-y-4 font-mono text-sm">
                <div className="flex justify-between border-b border-emerald-800/50 pb-2">
                  <span className="text-emerald-400/70">date</span>
                  <span className="text-emerald-50">12 Apr 2026</span>
                </div>
                <div className="flex justify-between border-b border-emerald-800/50 pb-2">
                  <span className="text-emerald-400/70">item</span>
                  <span className="text-emerald-50">Duck Eggs</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-emerald-400/70">qty</span>
                  <span className="text-emerald-400 font-bold">50 Trays</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-20">
              <h2 className="font-['Manrope',sans-serif] text-4xl md:text-5xl font-bold tracking-tight text-[#0B1A13] mb-6 leading-tight">
                Designed for digitizing farm records
              </h2>
              <p className="text-[#4A5D52] text-lg font-light">
                Automatically capture and organize your receipts into structured data.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {features.map((feature, index) => (
                <div key={index} className="group flex flex-col items-center text-center px-6 py-8 rounded-3xl hover:bg-white hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 border border-transparent hover:border-[#E8F2EC]">
                  <div className="flex-shrink-0 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm border border-[#E8F2EC] group-hover:bg-[#E8F2EC] group-hover:border-transparent transition-all duration-300 mb-6">
                    <span className="material-symbols-outlined text-3xl text-emerald-600">
                      {feature.icon}
                    </span>
                  </div>
                  <h3 className="font-['Manrope',sans-serif] text-2xl font-bold text-[#0B1A13] mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-[#4A5D52] leading-relaxed text-lg font-light">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="how-it-works" className="py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-20">
              <h2 className="font-['Manrope',sans-serif] text-4xl md:text-5xl font-bold text-[#0B1A13] mb-6">How It Works</h2>
              <p className="text-[#4A5D52] text-lg font-light">Three simple steps to digitize your farm records.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 relative">
              <div className="hidden md:block absolute top-10 left-[20%] right-[20%] h-[1px] bg-gradient-to-r from-transparent via-[#C3D9CE] to-transparent z-0"></div>

              {steps.map((step, i) => (
                <div key={i} className="relative z-10 flex flex-col items-center text-center">
                  <div className="w-20 h-20 bg-[#FDFBF7] rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#E8F2EC]">
                    <span className="material-symbols-outlined text-3xl text-emerald-600">{step.icon}</span>
                  </div>
                  <h3 className="font-['Manrope',sans-serif] text-2xl font-bold text-[#0B1A13] mb-3">{step.title}</h3>
                  <p className="text-[#4A5D52] font-light leading-relaxed max-w-xs">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="py-32 px-6 relative">
          <div className="max-w-5xl mx-auto text-center relative z-10">
            <span className="material-symbols-outlined text-5xl text-emerald-200 mb-6 block">spa</span>
            <h2 className="font-['Manrope',sans-serif] text-4xl md:text-5xl font-bold text-[#0B1A13] mb-8">About Lumina</h2>
            <p className="text-[#4A5D52] text-xl md:text-2xl font-light max-w-3xl mx-auto leading-relaxed">
              Our OCR-based system converts handwritten notes into structured data, enabling better monitoring of production and financial activities.
            </p>
          </div>
        </section>

        <section id="contact" className="px-6 py-24 pb-32">
          <div className="max-w-6xl mx-auto rounded-[3rem] bg-[#11241A] p-16 md:p-24 relative overflow-hidden text-center shadow-2xl">
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-600/30 rounded-full blur-[80px] pointer-events-none"></div>
            
            <div className="relative z-10">
              <h2 className="font-['Manrope',sans-serif] text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-tight mb-6">
                Start digitizing your farm records
              </h2>
              <p className="text-emerald-100/70 text-xl md:text-2xl font-light max-w-2xl mx-auto mb-10">
                Transform handwritten notes into structured data and gain better insights.
              </p>
              <Link
                to="/signup"
                className="inline-block bg-emerald-500 text-[#0B1A13] px-10 py-4 rounded-full font-bold text-lg hover:bg-emerald-400 hover:scale-105 transition-all duration-300 shadow-[0_0_40px_-10px_rgba(16,185,129,0.5)]"
              >
                Get Started
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full flex flex-col md:flex-row justify-between items-center px-8 py-12 border-t border-[#E8F2EC] mt-auto">
        <div className="mb-6 md:mb-0">
          <p className="text-xs uppercase tracking-widest text-[#7D8F85] font-semibold">© 2026 Lumina Tech. All rights reserved.</p>
        </div>
        <div className="flex flex-wrap justify-center gap-8">
          <a href="#" className="text-xs uppercase tracking-widest text-[#7D8F85] hover:text-emerald-600 font-semibold transition">Privacy Policy</a>
          <a href="#" className="text-xs uppercase tracking-widest text-[#7D8F85] hover:text-emerald-600 font-semibold transition">Terms of Service</a>
          <a href="#" className="text-xs uppercase tracking-widest text-[#7D8F85] hover:text-emerald-600 font-semibold transition">Contact</a>
        </div>
      </footer>
      
    </div>
  );
}