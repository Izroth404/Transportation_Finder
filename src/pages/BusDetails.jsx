import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import AppHeader from "@/components/transport/AppHeader";
import BusPassForm from "@/components/transport/BusPassForm";

export default function BusDetails() {
  return (
    <main className="min-h-screen bg-slate-50">
      <AppHeader title="Bus pass details" />
      <div className="mx-auto max-w-lg px-5 py-7">
        <Link to="/" className="mb-7 inline-flex items-center gap-2 text-sm font-semibold text-slate-600"><ArrowLeft className="h-4 w-4" />Back to services</Link>
        <div className="mb-7"><span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">Step 1 of 2</span><h2 className="mt-4 text-3xl font-bold text-slate-950">Your travel details</h2><p className="mt-2 leading-6 text-slate-500">Enter the information that should appear on your digital pass.</p></div>
        <BusPassForm />
      </div>
    </main>
  );
}