const services = ["Bus service", "Cab service", "Others"];

export default function ServiceTabs({ active, onChange }) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2" role="tablist" aria-label="Transport services">
      {services.map((service) => (
        <button key={service} role="tab" aria-selected={active === service} onClick={() => onChange(service)} className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold transition ${active === service ? "bg-indigo-700 text-white shadow-md shadow-indigo-200" : "border border-slate-200 bg-white text-slate-600"}`}>
          {service}
        </button>
      ))}
    </div>
  );
}