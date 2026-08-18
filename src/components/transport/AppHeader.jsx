import { Bell, BusFront, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AppHeader({ title, onMenu }) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between bg-gradient-to-r from-violet-700 via-indigo-700 to-blue-700 px-4 text-white shadow-[0_10px_20px_rgba(71,56,145,0.15)]">
      <div className="flex items-center gap-3">
        {onMenu ? (
          <Button variant="ghost" size="icon" onClick={onMenu} className="h-9 w-9 rounded-xl text-white hover:bg-white/10 hover:text-white" aria-label="Open menu"><Menu className="h-5 w-5" /></Button>
        ) : (
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-white/15"><BusFront className="h-4 w-4" /></span>
        )}
        <h1 className="text-[1.1rem] font-semibold tracking-tight">{title}</h1>
      </div>

      <button className="grid h-8 w-8 place-items-center rounded-lg bg-white/10 text-white/90" aria-label="Notifications">
        <Bell className="h-4 w-4" />
      </button>
    </header>
  );
}