import { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

const initial = { employee_name: "", employee_number: "", from_location: "", to_location: "", route_type: "Return" };
const fields = [["employee_name", "Full name", "text"], ["employee_number", "Employee number", "text"], ["from_location", "From location", "text"], ["to_location", "To location", "text"]];

export default function BusPassForm() {
  const [form, setForm] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const submit = async (event) => {
    event.preventDefault();
    setSaving(true);
    const pass = await base44.entities.BusPass.create(form);
    navigate(`/pass/${pass.id}`);
  };
  return (
    <form onSubmit={submit} className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">{fields.map(([name, label, type]) => <label key={name} className="text-sm font-medium text-slate-700">{label}<input required type={type} value={form[name]} onChange={(e) => setForm({ ...form, [name]: e.target.value })} className="mt-2 h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-base outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100" /></label>)}</div>
      <label className="block text-sm font-medium text-slate-700">Route type<select value={form.route_type} onChange={(e) => setForm({ ...form, route_type: e.target.value })} className="mt-2 h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-base outline-none focus:border-indigo-500"><option>Return</option><option>One way</option></select></label>
      {error && <p className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}
      <button disabled={saving} className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-indigo-700 font-semibold text-white shadow-lg shadow-indigo-200 transition active:scale-[.98] disabled:opacity-60">{saving && <Loader2 className="h-5 w-5 animate-spin" />}{saving ? "Creating pass" : "OK, create my pass"}</button>
    </form>
  );
}