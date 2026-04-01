export default function Settings() {
  return (
    <div className="p-12 lg:p-24 relative overflow-hidden flex-1">
      {/* Abstract Prismatic Node Background */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary-container/20 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[5%] left-[5%] w-1 h-1 bg-secondary rounded-full"></div>

      <header className="relative z-10 mb-16">
        <span className="text-secondary text-[10px] font-bold uppercase tracking-[0.3em] mb-4 block">Account Hub</span>
        <h1 className="text-5xl font-extrabold tracking-tighter text-on-surface mb-4 font-headline">Settings & Profile</h1>
        <p className="text-on-surface-variant max-w-xl text-sm md:text-base leading-relaxed">Configure your digital workspace and personal preferences. All changes are encrypted and synchronized across your secure Lumina node.</p>
      </header>

      {/* The "Snow White" Editorial Card */}
      <section className="relative z-10 max-w-4xl">
        <div className="bg-surface-container-lowest rounded-xl shadow-[0_40px_80px_-20px_rgba(25,28,30,0.06)] overflow-hidden border border-outline-variant/10">

          {/* Section 1: Personal Information */}
          <div className="p-10 lg:p-14 border-b border-surface-container-low">
            <div className="flex items-center gap-3 mb-10">
              <div className="w-1 h-6 bg-primary-container rounded-full"></div>
              <h2 className="text-xl font-bold tracking-tight font-headline">Personal Information</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
              {/* Avatar Column */}
              <div className="md:col-span-4 flex flex-col items-center gap-6">
                <div className="relative group">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-surface-container-low">
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCsaR8DIzfv0J8laAk1nLnjYzivQIRjSBTfqZmA-gBr3NS_3sI3yaRoA3miCXERxmjp84qbI2vhg7cr5sAXb4pOCVOssdhvgnS9uD5swTrcKixQVx1Y0urLeUOgf3NrIHyriLNqwZbry4mBwgehSrJdFPSZl1YYEf_0iOUYGTjya-XcY3x8Y9gyxgR67v7xiEeY5NzfswntRmzfs1NS1Us2ThekQPyVf2rBDbuXEH-KKFGvlXPunUaxFIP84yYionRLjB3XyX8IhKw"
                      alt="User Profile"
                      data-alt="high-end professional portrait of a person in a minimalist studio setting with soft directional lighting"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button className="absolute bottom-0 right-0 bg-primary-container text-on-primary-container p-2 rounded-full shadow-lg hover:scale-105 transition-transform flex items-center justify-center">
                    <span className="material-symbols-outlined text-sm">edit</span>
                  </button>
                </div>
                <div className="text-center">
                  <p className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">Profile Media</p>
                  <p className="text-xs text-on-surface-variant/60 mt-1">PNG or JPG, max 5MB</p>
                </div>
              </div>

              {/* Form Column */}
              <div className="md:col-span-8 space-y-8">
                <div className="grid grid-cols-2 gap-6">
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-2">First Name</label>
                    <input
                      type="text"
                      defaultValue="Adrian"
                      className="w-full bg-surface-container-low border border-transparent focus:border-secondary/20 focus:bg-surface-container-lowest focus:ring-0 rounded-md px-4 py-3 text-sm transition-all outline-none text-on-surface"
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-2">Last Name</label>
                    <input
                      type="text"
                      defaultValue="Thorne"
                      className="w-full bg-surface-container-low border border-transparent focus:border-secondary/20 focus:bg-surface-container-lowest focus:ring-0 rounded-md px-4 py-3 text-sm transition-all outline-none text-on-surface"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-2">Email Address</label>
                    <input
                      type="email"
                      defaultValue="adrian.t@lumina.io"
                      className="w-full bg-surface-container-low border border-transparent focus:border-secondary/20 focus:bg-surface-container-lowest focus:ring-0 rounded-md px-4 py-3 text-sm transition-all outline-none text-on-surface"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Preferences */}
          <div className="p-10 lg:p-14 bg-surface-bright/50">
            <div className="flex items-center gap-3 mb-10">
              <div className="w-1 h-6 bg-secondary-container rounded-full"></div>
              <h2 className="text-xl font-bold tracking-tight font-headline">System Preferences</h2>
            </div>
            <div className="space-y-10">
              {/* Preference Row */}
              <div className="flex items-center justify-between group">
                <div className="max-w-md">
                  <h3 className="text-sm font-bold text-on-surface group-hover:text-secondary transition-colors font-headline">Analytical Intelligence</h3>
                  <p className="text-xs text-on-surface-variant mt-1">Enable Lumina's predictive AI to curate your morning analytics reports automatically.</p>
                </div>
                <div className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-surface-container-high rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary"></div>
                </div>
              </div>

              {/* Preference Row */}
              <div className="flex items-center justify-between group">
                <div className="max-w-md">
                  <h3 className="text-sm font-bold text-on-surface group-hover:text-secondary transition-colors font-headline">Privacy Shield</h3>
                  <p className="text-xs text-on-surface-variant mt-1">Anonymize tracking data during high-security sessions. Recommended for tech startups.</p>
                </div>
                <div className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-surface-container-high rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary"></div>
                </div>
              </div>

              {/* Language Selector */}
              <div className="max-w-xs">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-2">Interface Language</label>
                <div className="relative">
                  <select className="w-full appearance-none bg-surface-container-low border border-transparent focus:border-secondary/20 focus:bg-surface-container-lowest rounded-md px-4 py-3 text-sm transition-all outline-none cursor-pointer">
                    <option>English (International)</option>
                    <option>Deutsch</option>
                    <option>Français</option>
                    <option>日本語</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant/40">unfold_more</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="px-10 py-8 bg-surface-container-low flex justify-end items-center gap-4">
            <button className="px-6 py-3 text-xs font-bold uppercase tracking-widest text-on-surface-variant hover:text-on-surface transition-colors">Cancel</button>
            <button className="bg-primary-container hover:brightness-105 active:scale-95 transition-all text-on-primary-fixed px-10 py-3 rounded-lg text-xs font-bold uppercase tracking-widest shadow-lg shadow-primary-container/10 border border-primary/10">
              Save Changes
            </button>
          </div>
        </div>

        {/* Secondary Actions */}
        <div className="mt-12 flex flex-wrap gap-4 items-center justify-center">
          <div className="flex items-center gap-2 text-on-surface-variant/60 text-[10px] uppercase tracking-widest">
            <span className="material-symbols-outlined text-[14px]" style={{fontVariationSettings: "'FILL' 1"}}>lock</span>
            Secure Data Center: US-EAST-1
          </div>
          <div className="h-4 w-px bg-outline-variant/30 hidden sm:block"></div>
          <div className="flex items-center gap-2 text-on-surface-variant/60 text-[10px] uppercase tracking-widest">
            <span className="material-symbols-outlined text-[14px]" style={{fontVariationSettings: "'FILL' 1"}}>verified_user</span>
            Encryption Level: AES-256
          </div>
        </div>
      </section>

      {/* Global Footer Shell (inline variant to match screen design if no global sticky footer) */}
      <footer className="w-full flex flex-col md:flex-row justify-between items-center py-12 text-xs uppercase tracking-widest border-t border-slate-200/15 mt-16">
        <div className="text-slate-500 mb-4 md:mb-0">
          © 2024 Lumina Tech. All rights reserved.
        </div>
        <div className="flex gap-8">
          <a href="#" className="text-slate-500 hover:text-lime-500 transition-colors">Privacy Policy</a>
          <a href="#" className="text-slate-500 hover:text-lime-500 transition-colors">Terms of Service</a>
          <a href="#" className="text-slate-500 hover:text-lime-500 transition-colors">Contact</a>
        </div>
      </footer>
    </div>
  );
}
