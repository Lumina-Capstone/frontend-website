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

  return (
    <div className="bg-background text-on-surface font-body selection:bg-primary-container selection:text-on-primary-container min-h-screen">
      <header className="fixed top-0 w-full z-50 flex justify-between items-center px-8 py-4 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="flex items-center gap-2">
          <img src="Logo.png" alt="Lumina Logo" className="h-10 w-auto" />
        </div>
        <nav className="hidden md:flex gap-8 items-center">
          <button onClick={() => scrollToSection('features')} className="text-sm font-medium text-gray-700 hover:text-green-600 transition">Features</button>
          <button onClick={() => scrollToSection('how-it-works')} className="text-sm font-medium text-gray-700 hover:text-green-600 transition">How It Works</button>
          <button onClick={() => scrollToSection('about')} className="text-sm font-medium text-gray-700 hover:text-green-600 transition">About</button>
        </nav>
        <Link to="/login" className="bg-green-600 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-green-700 transition shadow-sm">
          Login
        </Link>
      </header>

      <main className="relative pt-24 overflow-hidden">
        {/* Hero Section (home) */}
        <section id="home" className="max-w-7xl mx-auto px-8 pt-20 pb-32 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-7 space-y-8">
            <h1 className="font-headline text-6xl md:text-8xl font-extrabold tracking-tight text-gray-900 leading-[1.05]">
              Automate your <span className="text-green-600 italic font-light">receipts.</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-xl font-light leading-relaxed">
              Capture every receipt. Turn it into clean, structured data instantly.
            </p>
          </div>
          <div className="lg:col-span-5 relative">
            <div className="relative z-10 rounded-2xl overflow-hidden bg-white p-4 shadow-xl">
              <img
                src="https://img.freepik.com/free-photo/top-view-hands-holding-smartphone_23-2150171445.jpg?semt=ais_incoming&w=740&q=80"
                alt="Dashboard preview"
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="font-headline text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-4">
                Designed for digitizing farm records
              </h2>
              <p className="text-gray-600 text-lg">
                Automatically capture and organize your receipts into structured data.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
                >
                  <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center mb-6">
                    <span className="material-symbols-outlined text-2xl text-green-600">
                      {feature.icon}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="how-it-works" className="py-24 px-8 max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-headline text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-gray-600 text-lg">Three simple steps to digitize your farm records.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="material-symbols-outlined text-2xl text-green-600">upload</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">1. Upload</h3>
              <p className="text-gray-600">Upload handwritten notes or receipts.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="material-symbols-outlined text-2xl text-green-600">auto_awesome</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">2. Process</h3>
              <p className="text-gray-600">OCR detects and extracts key information automatically.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="material-symbols-outlined text-2xl text-green-600">insights</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">3. Analyze</h3>
              <p className="text-gray-600">View structured data and track production & expenses.</p>
            </div>
          </div>
        </section>

        <section id="about" className="py-24 px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="font-headline text-4xl font-bold text-gray-900 mb-6">About Lumina</h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Our OCR-based system converts handwritten notes into structured data, enabling better monitoring of production and financial activities.
            </p>
          </div>
        </section>

        {/* CTA Section */}
        <section id="contact" className="px-8 py-24">
          <div className="max-w-7xl mx-auto rounded-3xl bg-gray-900 p-16 md:p-24 relative overflow-hidden text-center">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-br from-green-500/20 to-green-700/10 blur-3xl"></div>
            <div className="relative z-10">
              <h2 className="font-headline text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-tight mb-6">
                Start digitizing your farm records
              </h2>
              <p className="text-white/70 text-xl md:text-2xl font-light max-w-2xl mx-auto mb-10">
                Transform handwritten notes into structured data and gain better insights.
              </p>
              <Link
                to="/signup"
                className="inline-block bg-green-500 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-green-600 transition shadow-lg"
              >
                Get Started
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full flex flex-col md:flex-row justify-between items-center px-8 py-12 bg-white border-t border-gray-100">
        <div className="mb-4 md:mb-0">
          <p className="text-xs uppercase tracking-widest text-gray-500">© 2026 Lumina Tech. All rights reserved.</p>
        </div>
        <div className="flex gap-8">
          <a href="#" className="text-xs uppercase tracking-widest text-gray-500 hover:text-green-600 transition">Privacy Policy</a>
          <a href="#" className="text-xs uppercase tracking-widest text-gray-500 hover:text-green-600 transition">Terms of Service</a>
          <a href="#" className="text-xs uppercase tracking-widest text-gray-500 hover:text-green-600 transition">Contact</a>
        </div>
      </footer>
    </div>
  );
}