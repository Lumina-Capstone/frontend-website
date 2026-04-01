import { Link } from 'react-router-dom';

export default function Upload() {
  return (
    <div className="flex-1 w-full pt-12 min-h-screen px-12 pb-20 relative">
      {/* Top Navigation (Mobile/Header Cluster) */}
      <header className="mb-12 flex justify-between items-center">
        <div>
          <h2 className="font-headline font-extrabold text-2xl tracking-tighter text-on-surface">OCR Upload</h2>
          <p className="text-xs text-on-surface-variant mt-1 font-medium">Digitalize your physical records instantly.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="h-1 w-1 bg-secondary rounded-full"></div>
          <span className="text-[10px] uppercase tracking-widest font-bold text-secondary">System Active</span>
        </div>
      </header>

      <div className="max-w-4xl mx-auto">
        {/* Instructional Bento Cluster */}
        <div className="grid grid-cols-12 gap-6 mb-12">
          <div className="col-span-8 p-8 bg-surface-container-low rounded-xl relative overflow-hidden">
            <div className="relative z-10">
              <span className="text-[10px] font-bold uppercase tracking-widest text-secondary mb-4 block">Precision Processing</span>
              <h3 className="font-headline text-3xl font-bold text-on-surface mb-4 leading-tight">
                Fast, Accurate <br/>Record Extraction.
              </h3>
              <p className="text-on-surface-variant text-sm max-w-sm leading-relaxed">
                Our advanced neural engine identifies line items, taxes, and vendor details with 99.4% accuracy in under two seconds.
              </p>
            </div>
            {/* Prismatic Node Decor */}
            <div className="absolute top-8 right-8 w-1 h-1 bg-secondary-container rounded-full"></div>
            <div className="absolute bottom-8 left-8 w-1 h-1 bg-secondary-container rounded-full"></div>
          </div>
          <div className="col-span-4 p-8 bg-primary-container rounded-xl flex flex-col justify-between">
            <span className="material-symbols-outlined text-on-primary-fixed text-4xl">bolt</span>
            <div>
              <div className="text-2xl font-headline font-bold text-on-primary-fixed tracking-tight">Real-time</div>
              <div className="text-xs text-on-primary-fixed-variant font-medium">Auto-sync to cloud</div>
            </div>
          </div>
        </div>

        {/* Main Upload Zone */}
        <section className="relative">
          <div className="bg-surface-container-lowest rounded-2xl p-4 shadow-sm">
            <div className="custom-dashed rounded-xl p-20 flex flex-col items-center justify-center text-center transition-all hover:bg-surface-container-low/50 group cursor-pointer">
              <div className="relative mb-8">
                <div className="absolute -inset-4 bg-secondary-container/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="w-20 h-20 bg-surface-container-low rounded-full flex items-center justify-center relative">
                  <span className="material-symbols-outlined text-4xl text-on-surface-variant group-hover:scale-110 transition-transform">document_scanner</span>
                </div>
              </div>
              <h4 className="font-headline text-xl font-bold text-on-surface mb-2">Drag and drop your receipt here</h4>
              <p className="text-on-surface-variant text-sm mb-10 max-w-xs mx-auto">Supports JPG, PNG, and PDF files up to 10MB. For best results, ensure the text is clearly visible.</p>
              <button className="bg-primary-container text-on-primary-fixed px-8 py-3 rounded-full font-headline font-bold text-sm flex items-center gap-2 hover:shadow-lg active:scale-95 transition-all bg-gradient-to-br from-primary-container to-primary-fixed">
                <span className="material-symbols-outlined text-lg">upload_file</span>
                Browse Files
              </button>

              <div className="mt-12 flex items-center gap-8 opacity-40">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">verified</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest">Encrypted</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">history</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest">Auto-Archived</span>
                </div>
              </div>
            </div>
          </div>
          {/* Prismatic Bleed Decor */}
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-secondary-container/10 blur-3xl -z-10 rounded-full"></div>
        </section>

        {/* Recent History (Minimalist List) */}
        <div className="mt-20">
          <div className="flex justify-between items-end mb-8">
            <h5 className="font-headline font-bold text-lg text-on-surface">Recent Scans</h5>
            <Link to="/records" className="text-xs font-bold text-secondary uppercase tracking-widest hover:underline decoration-2 underline-offset-4">
              View All Archive
            </Link>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-5 bg-surface-container-low rounded-xl group hover:bg-surface-bright transition-all">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-lg overflow-hidden bg-surface-container-highest flex-shrink-0">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBemUfQBA7SNkzNdSujhrItGtWJBwP9DdZ-GeR7n5aQlZ7OVgrC5CRMX1SQ01ZPGUk3r3XjJm9sxOh5hrt1PMJjXsq8Ce_ukeascv7FpsmY89PdC_eWXrZlOiXY_GnE_POb32RBvCbUg5NE5iC_epmj5fzWEkGeSsYZOkA4MtNMqD5IXFX0hqASHVeF_-oaxEwZTiA96xrO1VKg-T69rBl2OQKa5-9lFHdWV61smcyNQs8PmtazgW_jyqK00OSbE8wiXvL5HXci10U"
                    alt="Receipt"
                    data-alt="close-up scan of a paper grocery receipt with black text and clear itemized prices"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="text-sm font-bold text-on-surface">Whole Foods Market #1024</div>
                  <div className="text-[10px] text-on-surface-variant font-medium">May 14, 2024 • 2:34 PM</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-on-surface">$142.50</div>
                <div className="text-[10px] text-secondary font-bold uppercase tracking-tighter">Processed</div>
              </div>
            </div>

            <div className="flex items-center justify-between p-5 bg-surface-container-low rounded-xl group hover:bg-surface-bright transition-all">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-lg overflow-hidden bg-surface-container-highest flex-shrink-0">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuC6natDQz4QPGEfszrsbnl1rTxhHY6_05PfpYnQhOqVWLt574eQ1kGto8HYZcVYASjynQauo85jqvTgyj0kU8NyYIxXen36i3tFdRPhBWtTl9MMFuxm_JbvnfZ-arW6rAW7eSM-bbD5R5WtaWVuKW7yJL7xDeqIS73K__V9I37-Q3mq8ZngdCe1-bIaGix8MG5L3Pw8vBkYnOQmH7kDF_qc0IJNyWnTDpLAdPe1YD-CybrmzXwIhkBaflzwtdAANh4XfyrgjjhfsNk"
                    alt="Receipt"
                    data-alt="top view of a coffee shop receipt lying on a light wooden table surface"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="text-sm font-bold text-on-surface">Blue Bottle Coffee</div>
                  <div className="text-[10px] text-on-surface-variant font-medium">May 13, 2024 • 9:15 AM</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-on-surface">$8.75</div>
                <div className="text-[10px] text-secondary font-bold uppercase tracking-tighter">Processed</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="mt-16 w-full flex flex-col md:flex-row justify-between items-center py-12 border-t border-slate-200/15">
        <div className="mb-4 md:mb-0">
          <p className="text-[10px] uppercase tracking-widest text-slate-500">© 2024 Lumina Tech. All rights reserved.</p>
        </div>
        <div className="flex gap-8">
          <a href="#" className="text-[10px] uppercase tracking-widest text-slate-500 hover:text-lime-500 transition-colors">Privacy Policy</a>
          <a href="#" className="text-[10px] uppercase tracking-widest text-slate-500 hover:text-lime-500 transition-colors">Terms of Service</a>
          <a href="#" className="text-[10px] uppercase tracking-widest text-slate-500 hover:text-lime-500 transition-colors">Contact</a>
        </div>
      </footer>
    </div>
  );
}
