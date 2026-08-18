import { useEffect, useRef, useState } from "react";
import { ArrowLeftRight, CalendarDays, MapPin, UserRound } from "lucide-react";
import QrPass from "./QrPass";

/**
 * @param {string} value
 */
const prettyDate = (value) => new Date(`${value}T00:00:00`).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

const formatDateForInput = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

/**
 * @param {{ pass: { from_location: string, to_location: string, route_type?: string, employee_name: string, employee_number: string, start_date: string, end_date: string } }} props
 */
export default function PassCard({ pass }) {
  const routeLabel = pass?.route_type === "Return" ? "Both" : "One way";
  const scrollRef = useRef(null);
  const [active, setActive] = useState(0);
  const today = new Date();
  const currentMonthStart = formatDateForInput(new Date(today.getFullYear(), today.getMonth(), 1));
  const currentMonthEnd = formatDateForInput(new Date(today.getFullYear(), today.getMonth() + 1, 0));
  const startDateValue = currentMonthStart;
  const endDateValue = currentMonthEnd;

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      const index = Math.round(el.scrollLeft / el.clientWidth);
      setActive(index);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const goTo = (i) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ left: i * el.clientWidth, behavior: "smooth" });
  };

  return (
    <div className="w-full">
      <div className="space-y-4">
        {/* Fixed header (always visible) */}
        <article className="overflow-hidden rounded-[22px] bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-700 px-4 pb-4 pt-3 text-white shadow-[0_8px_20px_rgba(53,47,118,0.08)]">
          <div className="mt-4 flex flex-col items-center justify-center gap-2 text-center">
            <p className="text-2xl font-bold leading-none">{pass.from_location}</p>

            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/25 bg-white/10 text-lg">
              <ArrowLeftRight className="h-4 w-4" />
            </div>

            <p className="text-2xl font-bold leading-none">{pass.to_location}</p>
          </div>

          <div className="mt-4 flex items-center justify-between gap-4 text-sm font-medium text-blue-100">
            <span className="min-w-0">Office In · 09:30</span>
            <span className="min-w-0 text-right">Office Out · 18:30</span>
          </div>
        </article>

        {/* Swipeable area: only the body and QR panels */}
        <div className="-mx-4 px-4">
          {/* dot indicators */}
          <div className="flex justify-center gap-2 mb-2">
            {[0, 1].map((i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to panel ${i + 1}`}
                onClick={() => goTo(i)}
                className={`h-3 w-3 rounded-full transition-colors ${active === i ? "bg-indigo-600" : "bg-slate-200"}`}
              />
            ))}
          </div>

          <div ref={scrollRef} className="flex gap-4 overflow-x-auto snap-x snap-mandatory py-2 hide-scrollbar">
            <div className="snap-center flex-shrink-0 w-full sm:w-[420px] h-[320px] sm:h-[360px]">
              <article className="overflow-hidden rounded-[22px] bg-white shadow-[0_8px_20px_rgba(53,47,118,0.08)] h-full">
                <div className="p-4 pb-3 h-full">
                  <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-3">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">Name</p>
                      <p className="mt-1 text-base font-semibold text-slate-800">{pass.employee_name}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">Employee ID</p>
                      <p className="mt-1 text-base font-semibold text-slate-800">{pass.employee_number}</p>
                    </div>
                  </div>

                  <div className="mt-3 grid grid-cols-2 gap-3">
                    <div className="rounded-2xl bg-slate-100 p-3">
                      <div className="mb-2 flex items-center gap-2 text-indigo-600">
                        <MapPin className="h-4 w-4" />
                        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">Bus stop</span>
                      </div>
                      <p className="text-sm font-semibold text-slate-800">{pass.from_location}</p>
                    </div>

                    <div className="rounded-2xl bg-slate-100 p-3">
                      <div className="mb-2 flex items-center gap-2 text-violet-600">
                        <UserRound className="h-4 w-4" />
                        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">Route type</span>
                      </div>
                      <p className="text-sm font-semibold text-slate-800">{routeLabel}</p>
                    </div>
                  </div>

                  <div className="mt-3 grid grid-cols-2 gap-3">
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                      <div className="mb-2 flex items-center gap-2 text-indigo-600">
                        <CalendarDays className="h-4 w-4" />
                        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">Start date</span>
                      </div>
                      <p className="text-sm font-semibold text-slate-800">{prettyDate(startDateValue)}</p>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                      <div className="mb-2 flex items-center gap-2 text-violet-600">
                        <CalendarDays className="h-4 w-4" />
                        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">End date</span>
                      </div>
                      <p className="text-sm font-semibold text-slate-800">{prettyDate(endDateValue)}</p>
                    </div>
                  </div>

                  <div className="mt-3 border-t border-dashed border-slate-200 pt-3 text-center text-sm text-slate-500">
                    Route: {pass.from_location} to {pass.to_location} And Return <br /> Via-{pass.from_location}
                  </div>
                </div>
              </article>
            </div>

            <div className="snap-center flex-shrink-0 w-full sm:w-[420px] h-[320px] sm:h-[360px]">
              <article className="overflow-hidden rounded-[22px] bg-white shadow-[0_8px_20px_rgba(53,47,118,0.08)] p-4 flex items-center justify-center h-full">
                <QrPass pass={pass} />
              </article>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}