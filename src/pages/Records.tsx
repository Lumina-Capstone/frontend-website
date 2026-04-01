import { Link } from 'react-router-dom';

export default function Records() {
  return (
    <div className="p-10 relative min-h-screen flex-1">
      <div className="prism-node top-10 right-10"></div>
      <div className="prism-node bottom-20 left-40"></div>

      <header className="mb-12">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="font-headline text-4xl font-extrabold tracking-tight text-on-surface">Income/Expense Records</h2>
            <p className="text-on-surface-variant mt-2 max-w-lg">A comprehensive ledger of all financial movements. High-precision auditing for the fiscal year 2024.</p>
          </div>
          <div className="flex gap-4 items-center">
            <div className="relative group">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm">search</span>
              <input
                type="text"
                placeholder="Search records..."
                className="bg-surface-container-low border-none rounded-md py-2 pl-10 pr-4 text-sm w-64 focus:ring-1 focus:ring-secondary/30 focus:bg-surface-container-lowest transition-all outline-none"
              />
            </div>
            <div className="flex items-center bg-surface-container-low rounded-md px-3 py-2 cursor-pointer hover:bg-surface-container-high transition-colors">
              <span className="material-symbols-outlined text-sm mr-2">filter_list</span>
              <span className="text-sm font-medium">Filter</span>
            </div>
            <Link to="/upload" className="bg-primary-container text-on-primary-fixed px-6 py-2 rounded-md font-bold text-sm shadow-sm hover:opacity-90 transition-opacity">
              Add Record
            </Link>
          </div>
        </div>
      </header>

      <section className="bg-surface-container-lowest rounded-xl shadow-[0_32px_64px_-12px_rgba(25,28,30,0.04)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-on-surface text-surface text-[11px] uppercase tracking-[0.15em] font-bold">
                <th className="py-5 px-8">Date</th>
                <th className="py-5 px-4">Receipt</th>
                <th className="py-5 px-6">Item Name</th>
                <th className="py-5 px-6">Category</th>
                <th className="py-5 px-8 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container-high">
              <tr className="group hover:bg-surface-bright transition-colors">
                <td className="py-6 px-8 text-sm font-medium text-on-surface-variant">Oct 24, 2024</td>
                <td className="py-6 px-4">
                  <div className="w-10 h-12 bg-surface-container rounded overflow-hidden shadow-sm border border-outline-variant/10">
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuA3TzScweVZHZWXMrhNL4E2AIUrMoIOC2SHkNJi7a_1YLaBLgY-tQmMM2PvYMqFEwtZJokiHhUSxWptpawE-Xr7EX20AjBmYzeiNJ4C803RSxMZj0JZfBcOCZU7xXFzNSBiffE_7yyu8NU2JDTY0-t_Cs3wmB1a9gO2d1lg--U_1e8dWT8e_jGw4dhiFb5p_rWliP87co5Qp2G1MIiBT-NCfXI4COsNeXP3EBHSfKe7X1Oe4FC_XtpZ-b2g2HgUrRVfyQliLMkHY1A"
                      alt="Receipt"
                      data-alt="close up of a modern digital receipt with clean typography and blue accents on a white paper background"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </td>
                <td className="py-6 px-6">
                  <p className="font-bold text-on-surface text-sm">Server Infrastructure (Q4)</p>
                  <p className="text-[10px] text-on-surface-variant/70 uppercase tracking-wider">AWS - Cloud Services</p>
                </td>
                <td className="py-6 px-6">
                  <span className="px-3 py-1 bg-surface-container-low text-on-surface-variant rounded-full text-[10px] font-bold uppercase tracking-widest">Fixed Cost</span>
                </td>
                <td className="py-6 px-8 text-right font-headline font-extrabold text-error">-$12,450.00</td>
              </tr>
              <tr className="group hover:bg-surface-bright transition-colors">
                <td className="py-6 px-8 text-sm font-medium text-on-surface-variant">Oct 22, 2024</td>
                <td className="py-6 px-4">
                  <div className="w-10 h-12 bg-surface-container rounded overflow-hidden shadow-sm border border-outline-variant/10">
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBZXcp4S-tZQN6s4zRfl6dTZiJRS_aLslIzdOG83arFEfTYUQoYB7o94LZv_O7QsvrRylMpPyYqYoVNIVaO62mfQcyl5n_PFondFtTOSkL_7ojvQvDrYn6Kjab8J9kIXO4wBuvyJSLLIgcMOvoLhBCQh59AEy_v38em0qV3h8IipmrWsEOXdZC8W-K-a6z92X81aWHqrCPzfRVTSKWD1H3zN7CqntaLT41EHurHb3aIc_yZ6bTaiItUd79xtjO8oIBsVLebdmmz3qE"
                      alt="Receipt"
                      data-alt="minimalist graphic representation of an invoice with geometric shapes and soft shadows"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </td>
                <td className="py-6 px-6">
                  <p className="font-bold text-on-surface text-sm">Venture Capital Deposit</p>
                  <p className="text-[10px] text-on-surface-variant/70 uppercase tracking-wider">Series A Funding</p>
                </td>
                <td className="py-6 px-6">
                  <span className="px-3 py-1 bg-secondary-container text-on-secondary-container rounded-full text-[10px] font-bold uppercase tracking-widest">Revenue</span>
                </td>
                <td className="py-6 px-8 text-right font-headline font-extrabold text-secondary">+$250,000.00</td>
              </tr>
              <tr className="group hover:bg-surface-bright transition-colors">
                <td className="py-6 px-8 text-sm font-medium text-on-surface-variant">Oct 19, 2024</td>
                <td className="py-6 px-4">
                  <div className="w-10 h-12 bg-surface-container rounded overflow-hidden shadow-sm border border-outline-variant/10">
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuC9iMyK7M7AtN4Q7W9tDmLZVNR1tmBqswGUcYiWhj4eCFJKVOKs9vnagCc04AAbUbdoO69jXMYiS4iqB5Mp81IdMxa-k45Z9reshM4yye_R7hpgcNsA1eZvMQ2o41TfnFQplILr6vKeEF1ErDrJ75kNjjWwON69f0fWiXMqFbD8dwQPRtNlkVak5MlG5qVOggMVU_8ST3jcIikklyzgZ7UwQP1uX8TabE80OYGroIAGyF0DvgG5qQqWBzado0PVV4OflcQ-RjuH1A8"
                      alt="Receipt"
                      data-alt="neatly organized stationery and a printed receipt on a light gray designer workspace"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </td>
                <td className="py-6 px-6">
                  <p className="font-bold text-on-surface text-sm">Office Workspace Lease</p>
                  <p className="text-[10px] text-on-surface-variant/70 uppercase tracking-wider">Downtown Creative Hub</p>
                </td>
                <td className="py-6 px-6">
                  <span className="px-3 py-1 bg-surface-container-low text-on-surface-variant rounded-full text-[10px] font-bold uppercase tracking-widest">Operations</span>
                </td>
                <td className="py-6 px-8 text-right font-headline font-extrabold text-error">-$8,200.00</td>
              </tr>
              <tr className="group hover:bg-surface-bright transition-colors">
                <td className="py-6 px-8 text-sm font-medium text-on-surface-variant">Oct 15, 2024</td>
                <td className="py-6 px-4">
                  <div className="w-10 h-12 bg-surface-container rounded overflow-hidden shadow-sm border border-outline-variant/10">
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJa88tRbztO2CmLvNe-O6ypkvUorCyQhRJ4f6XPIfM1X3WkbOfMIdTpbrykG5jarFKbv5FXoeQUuMU6Agw9LL2H_An6-hs4PTP8PN0Stobiu829RoXimDuMW-hu9e4aQnuEItgjmevwA85GgQSSS5ktbcgbw1_x7XdzzmFcrP7b_DvS5CeC1sygnfbjyhu7jWMpzIBU0k9sgxDEtcx_SynnFnVIg7jrB7k3MzaYxOve_euob0TTwlbH46leHNYOa0OdblWebAZGrs"
                      alt="Receipt"
                      data-alt="macro photo of a credit card receipt showing blurry numbers and high end transaction details"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </td>
                <td className="py-6 px-6">
                  <p className="font-bold text-on-surface text-sm">Strategic Consulting Fee</p>
                  <p className="text-[10px] text-on-surface-variant/70 uppercase tracking-wider">Bain &amp; Co.</p>
                </td>
                <td className="py-6 px-6">
                  <span className="px-3 py-1 bg-surface-container-low text-on-surface-variant rounded-full text-[10px] font-bold uppercase tracking-widest">Professional Services</span>
                </td>
                <td className="py-6 px-8 text-right font-headline font-extrabold text-error">-$15,000.00</td>
              </tr>
              <tr className="group hover:bg-surface-bright transition-colors">
                <td className="py-6 px-8 text-sm font-medium text-on-surface-variant">Oct 12, 2024</td>
                <td className="py-6 px-4">
                  <div className="w-10 h-12 bg-surface-container rounded overflow-hidden shadow-sm border border-outline-variant/10">
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCV3spPjg4LkhHVr4DWMD7CsKWzUFFCE6shdnP9Tfea2UX0YCVPt_Uh_EGmabCoABTM75VQiMa7ITKpH7MB7BE1VICvv5dwwMYT7cCoC1plBsL5i4hDxqwD_k_WW_7hT3ebXtzkYMraxXnMArjoOb6ZdOPFsolV7D_e7H7kqyuoUedNDKOs8A9raJHKTzAD5MKKoaeSW_5eiZjQ6rgiVQxI5fGXI1dun-UHi675CEzWqUBG_fAdENa9FasabwaH7_w2UW5klYkyuZ0"
                      alt="Receipt"
                      data-alt="top down view of sleek modern business tools and a white invoice on a bright surface"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </td>
                <td className="py-6 px-6">
                  <p className="font-bold text-on-surface text-sm">Lumina AI SaaS Subscriptions</p>
                  <p className="text-[10px] text-on-surface-variant/70 uppercase tracking-wider">Monthly Recurring Revenue</p>
                </td>
                <td className="py-6 px-6">
                  <span className="px-3 py-1 bg-secondary-container text-on-secondary-container rounded-full text-[10px] font-bold uppercase tracking-widest">Revenue</span>
                </td>
                <td className="py-6 px-8 text-right font-headline font-extrabold text-secondary">+$42,120.00</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="bg-surface-container-low py-4 px-8 flex justify-between items-center text-xs font-medium text-on-surface-variant">
          <span>Showing 5 of 128 records</span>
          <div className="flex gap-2">
            <button className="w-8 h-8 flex items-center justify-center rounded bg-surface-container-lowest shadow-sm hover:bg-surface-bright transition-colors">
              <span className="material-symbols-outlined text-base">chevron_left</span>
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded bg-on-surface text-surface shadow-sm">1</button>
            <button className="w-8 h-8 flex items-center justify-center rounded bg-surface-container-lowest shadow-sm hover:bg-surface-bright transition-colors">2</button>
            <button className="w-8 h-8 flex items-center justify-center rounded bg-surface-container-lowest shadow-sm hover:bg-surface-bright transition-colors">3</button>
            <button className="w-8 h-8 flex items-center justify-center rounded bg-surface-container-lowest shadow-sm hover:bg-surface-bright transition-colors">
              <span className="material-symbols-outlined text-base">chevron_right</span>
            </button>
          </div>
        </div>
      </section>

      <footer className="mt-16 w-full flex flex-col md:flex-row justify-between items-center py-12 border-t border-slate-200/15">
        <div className="flex flex-col items-center md:items-start mb-6 md:mb-0">
          <p className="text-xs uppercase tracking-widest text-slate-500">© 2024 Lumina Tech. All rights reserved.</p>
        </div>
        <div className="flex gap-8">
          <a href="#" className="text-xs uppercase tracking-widest text-slate-500 hover:text-lime-500 transition-colors">Privacy Policy</a>
          <a href="#" className="text-xs uppercase tracking-widest text-slate-500 hover:text-lime-500 transition-colors">Terms of Service</a>
          <a href="#" className="text-xs uppercase tracking-widest text-slate-500 hover:text-lime-500 transition-colors">Contact</a>
        </div>
      </footer>
    </div>
  );
}
