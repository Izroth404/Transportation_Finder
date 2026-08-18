import { ArrowRight, BusFront, CarFront, Shapes } from "lucide-react";

const icons = { "Bus service": BusFront, "Cab service": CarFront, Others: Shapes };

export default function ServiceCard({ service, onContinue }) {
  const Icon = icons[service];
  const isBus = service === "Bus service";
  return (
    <section className="mt-6 overflow-hidden rounded-3xl bg-indigo-950 p-6 text-white shadow-xl shadow-indigo-200/70">
      <div className="mb-14 flex items-start justify-between"><span className="grid h-14 w-14 place-items-center rounded-2xl bg-white/10"><Icon className="h-7 w-7" /></span><span className="rounded-full bg-white/10 px-3 py-1 text-xs">Employee travel</span></div>
      <p className="text-sm text-indigo-200">{isBus ? "Daily commute pass" : "More options soon"}</p>
      <h2 className="mt-1 text-3xl font-semibold">{service}</h2>
      <p className="mt-3 max-w-sm text-sm leading-6 text-indigo-100">{isBus ? "Create your digital pass for a comfortable ride between your selected stops." : "This service is not available yet. Choose Bus service to create a pass."}</p>
      <button disabled={!isBus} onClick={onContinue} className="mt-6 flex w-full items-center justify-between rounded-2xl bg-white px-5 py-4 font-semibold text-indigo-950 transition active:scale-[.98] disabled:cursor-not-allowed disabled:opacity-50">{isBus ? "Create bus pass" : "Coming soon"}<ArrowRight className="h-5 w-5" /></button>
    </section>
  );
}