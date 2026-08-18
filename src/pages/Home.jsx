import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppHeader from "@/components/transport/AppHeader";
import ServiceTabs from "@/components/transport/ServiceTabs";
import ServiceCard from "@/components/transport/ServiceCard";

export default function Home() {
  const [active, setActive] = useState("Bus service");
  const navigate = useNavigate();
  return (
    <main className="min-h-screen bg-slate-50">
      <AppHeader title="Employee transport" />
      <div className="mx-auto max-w-lg px-5 py-8">
        <p className="text-sm font-semibold uppercase tracking-[.2em] text-indigo-600">Travel made simple</p>
        <h2 className="mt-3 text-4xl font-bold tracking-tight text-slate-950">How are you moving today?</h2>
        <p className="mb-7 mt-3 leading-7 text-slate-500">Choose a service to start your employee journey.</p>
        <ServiceTabs active={active} onChange={setActive} />
        <ServiceCard service={active} onContinue={() => navigate("/bus-details")} />
      </div>
    </main>
  );
}