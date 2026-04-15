import React, { useState, useEffect, useRef } from 'react';
import { getAuth, updateProfile, onAuthStateChanged } from 'firebase/auth';

export default function Settings() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [language, setLanguage] = useState("English (International)");
  
  const [profileImage, setProfileImage] = useState("https://api.dicebear.com/7.x/initials/svg?seed=User");
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setEmail(user.email || "");
        
        if (user.displayName) {
          const nameParts = user.displayName.split(" ");
          setFirstName(nameParts[0] || "");
          setLastName(nameParts.slice(1).join(" ") || "");
        } else {
          setFirstName(user.email?.split('@')[0] || "");
          setLastName("");
        }

        if (user.photoURL) {
          setProfileImage(user.photoURL);
        } else {
          setProfileImage(`https://api.dicebear.com/7.x/initials/svg?seed=${user.email}`);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("File is too large. Maximum size is 5MB.");
        return;
      }
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    const auth = getAuth();
    
    try {
      if (auth.currentUser) {
        const fullName = `${firstName} ${lastName}`.trim();
        
        await updateProfile(auth.currentUser, {
          displayName: fullName
        });
        
        alert("Profile updated successfully!");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="p-12 lg:p-24 relative overflow-hidden flex-1">
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-500/10 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[5%] left-[5%] w-1 h-1 bg-emerald-600 rounded-full"></div>

      <header className="relative z-10 mb-16">
        <span className="text-emerald-600 text-[10px] font-bold uppercase tracking-[0.3em] mb-4 block">Account Hub</span>
        <h1 className="text-5xl font-extrabold tracking-tighter text-[#0B1A13] mb-4 font-headline">Settings & Profile</h1>
        <p className="text-[#4A5D52] max-w-xl text-sm md:text-base leading-relaxed">Configure your digital workspace and personal preferences. All changes are encrypted and synchronized across your secure Lumina node.</p>
      </header>

      <section className="relative z-10 max-w-4xl">
        <div className="bg-white rounded-xl shadow-[0_40px_80px_-20px_rgba(25,28,30,0.06)] overflow-hidden border border-[#E8F2EC]">

          <div className="p-10 lg:p-14 border-b border-[#E8F2EC]">
            <div className="flex items-center gap-3 mb-10">
              <div className="w-1 h-6 bg-emerald-500 rounded-full"></div>
              <h2 className="text-xl font-bold tracking-tight font-headline text-[#0B1A13]">Personal Information</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
              <div className="md:col-span-4 flex flex-col items-center gap-6">
                <div className="relative group">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#FDFBF7] shadow-sm">
                    <img
                      src={profileImage}
                      alt="User Profile"
                      className="w-full h-full object-cover bg-slate-50"
                    />
                  </div>
                  
                  <input 
                    type="file" 
                    accept="image/png, image/jpeg, image/jpg"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    className="hidden" 
                  />
                  
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute bottom-0 right-0 bg-emerald-500 text-white p-2 rounded-full shadow-lg hover:scale-105 hover:bg-emerald-600 transition-all flex items-center justify-center"
                  >
                    <span className="material-symbols-outlined text-sm">edit</span>
                  </button>
                </div>
                <div className="text-center">
                  <p className="text-[10px] uppercase tracking-widest text-[#7D8F85] font-bold">Profile Media</p>
                  <p className="text-xs text-[#7D8F85] mt-1">PNG or JPG, max 5MB</p>
                </div>
              </div>

              <div className="md:col-span-8 space-y-8">
                <div className="grid grid-cols-2 gap-6">
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#7D8F85] mb-2">First Name</label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full bg-[#FDFBF7] border border-[#E8F2EC] focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 rounded-md px-4 py-3 text-sm transition-all outline-none text-[#0B1A13]"
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#7D8F85] mb-2">Last Name</label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full bg-[#FDFBF7] border border-[#E8F2EC] focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 rounded-md px-4 py-3 text-sm transition-all outline-none text-[#0B1A13]"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#7D8F85] mb-2">Email Address</label>
                    <input
                      type="email"
                      value={email}
                      disabled 
                      className="w-full bg-slate-50 border border-[#E8F2EC] text-[#7D8F85] cursor-not-allowed rounded-md px-4 py-3 text-sm outline-none"
                    />
                    <p className="text-[10px] text-[#7D8F85] mt-2 italic">Emails cannot be changed directly for security reasons.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-10 lg:p-14 bg-slate-50/50">
            <div className="flex items-center gap-3 mb-10">
              <div className="w-1 h-6 bg-emerald-500/50 rounded-full"></div>
              <h2 className="text-xl font-bold tracking-tight font-headline text-[#0B1A13]">System Preferences</h2>
            </div>
            <div className="space-y-10">
              
              <div className="flex items-center justify-between group">
                <div className="max-w-md">
                  <h3 className="text-sm font-bold text-[#0B1A13] group-hover:text-emerald-600 transition-colors font-headline">Analytical Intelligence</h3>
                  <p className="text-xs text-[#7D8F85] mt-1">Enable Lumina's predictive AI to curate your morning analytics reports automatically.</p>
                </div>
                <div className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                </div>
              </div>

              <div className="flex items-center justify-between group">
                <div className="max-w-md">
                  <h3 className="text-sm font-bold text-[#0B1A13] group-hover:text-emerald-600 transition-colors font-headline">Privacy Shield</h3>
                  <p className="text-xs text-[#7D8F85] mt-1">Anonymize tracking data during high-security sessions. Recommended for tech startups.</p>
                </div>
                <div className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                </div>
              </div>

              <div className="max-w-xs">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-[#7D8F85] mb-2">Interface Language</label>
                <div className="relative">
                  <select 
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full appearance-none bg-[#FDFBF7] border border-[#E8F2EC] focus:border-emerald-500 focus:bg-white rounded-md px-4 py-3 text-sm transition-all outline-none cursor-pointer text-[#0B1A13]"
                  >
                    <option>English (International)</option>
                    <option>Bahasa Indonesia</option>
                    <option>Deutsch</option>
                    <option>Français</option>
                    <option>日本語</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#7D8F85]">unfold_more</span>
                </div>
              </div>
            </div>
          </div>

          <div className="px-10 py-8 bg-[#FDFBF7] flex justify-end items-center gap-4 border-t border-[#E8F2EC]">
            <button className="px-6 py-3 text-xs font-bold uppercase tracking-widest text-[#7D8F85] hover:text-[#0B1A13] transition-colors">Cancel</button>
            <button 
              onClick={handleSave}
              disabled={isSaving}
              className="bg-emerald-600 hover:bg-emerald-500 active:scale-95 transition-all text-white px-10 py-3 rounded-lg text-xs font-bold uppercase tracking-widest shadow-lg shadow-emerald-600/20 disabled:opacity-50"
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap gap-4 items-center justify-center">
          <div className="flex items-center gap-2 text-[#7D8F85] text-[10px] uppercase tracking-widest">
            <span className="material-symbols-outlined text-[14px]">lock</span>
            Secure Data Center: US-EAST-1
          </div>
          <div className="h-4 w-px bg-[#E8F2EC] hidden sm:block"></div>
          <div className="flex items-center gap-2 text-[#7D8F85] text-[10px] uppercase tracking-widest">
            <span className="material-symbols-outlined text-[14px]">verified_user</span>
            Encryption Level: AES-256
          </div>
        </div>
      </section>

      <footer className="max-w-4xl w-full flex flex-col md:flex-row justify-between items-center py-12 text-xs uppercase tracking-widest border-t border-[#E8F2EC] mt-16">
        <div className="text-[#7D8F85] font-bold mb-4 md:mb-0">
          © 2026 Lumina Tech. All rights reserved.
        </div>
        <div className="flex gap-8 font-bold">
          <a href="#" className="text-[#7D8F85] hover:text-emerald-600 transition-colors">Privacy Policy</a>
          <a href="#" className="text-[#7D8F85] hover:text-emerald-600 transition-colors">Terms of Service</a>
          <a href="#" className="text-[#7D8F85] hover:text-emerald-600 transition-colors">Contact</a>
        </div>
      </footer>
    </div>
  );
}