import { Image } from "@/components/ui/image";
import { ShieldCheck } from "lucide-react";

/**
 * @param {{ pass: { from_location: string, to_location: string, route_type?: string, employee_name: string, employee_number: string, start_date: string, end_date: string } }} props
 */
export default function QrPass({ pass }) {
  const today = new Date();
  const currentMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
  const currentMonthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  const formatDateForInput = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const endDateValue = formatDateForInput(currentMonthEnd);
  const value = encodeURIComponent(`MOVEIN|${pass.employee_number}|${pass.from_location}|${pass.to_location}|${endDateValue}`);
  // prefer an explicit QR image URL passed on the pass object (e.g. pass.qr_url or pass.qr_image)
  const qrSrc = pass?.qr_url || pass?.qr_image || `https://quickchart.io/qr?text=${value}&size=260&margin=1`;

  return (
    <article className="flex min-w-full snap-center flex-col items-center justify-center rounded-3xl bg-white-950 ">
      {/* <span className="mb-5 grid h-12 w-12 place-items-center rounded-full bg-emerald-400/15 text-emerald-300"><ShieldCheck /></span>
      <p className="text-sm font-medium text-indigo-200">Scan to verify</p>
      <h2 className="mt-1 text-2xl font-semibold">Digital Bus Pass</h2> */}
      <div className="my-7 rounded-3xl bg-white p-4">
        <Image src={qrSrc} alt={`QR pass for ${pass.employee_name}`} className="h-52 w-52" fittingType="fit" />
      </div>
      {/* <p className="font-semibold">{pass.employee_name}</p>
      <p className="mt-1 text-sm text-indigo-200">Employee ID · {pass.employee_number}</p> */}
    </article>
  );
}