import { Home, LogOut, TicketCheck, X } from "lucide-react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";

export default function PassMenu({ open, onClose }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 bg-slate-950/45" onClick={onClose}>
      <aside className="h-full w-72 bg-white p-5 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="mb-10 flex items-center justify-between"><div><p className="text-xs font-semibold uppercase tracking-widest text-indigo-600">MoveIn</p><p className="text-xl font-bold text-slate-900">Menu</p></div><button onClick={onClose} aria-label="Close menu" className="rounded-xl p-2 hover:bg-slate-100"><X /></button></div>
        <nav className="space-y-2"><Link to="/" className="flex items-center gap-3 rounded-xl bg-indigo-50 p-3 font-medium text-indigo-800"><Home className="h-5 w-5" />Services</Link><span className="flex items-center gap-3 rounded-xl p-3 font-medium text-slate-600"><TicketCheck className="h-5 w-5" />Digital bus pass</span></nav>
        <button onClick={() => base44.auth.logout("/login")} className="absolute bottom-6 flex items-center gap-3 rounded-xl p-3 font-medium text-slate-600"><LogOut className="h-5 w-5" />Sign out</button>
      </aside>
    </div>
  );
}