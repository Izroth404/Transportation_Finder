import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import AppHeader from "@/components/transport/AppHeader";
import PassMenu from "@/components/transport/PassMenu";
import PassCard from "@/components/transport/PassCard";

export default function BusPass() {
  const { id } = useParams();
  const [pass, setPass] = useState(null);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    base44.entities.BusPass.get(id).then(setPass);
  }, [id]);

  if (!pass) {
    return <div className="grid min-h-screen place-items-center bg-slate-50"><div className="h-9 w-9 animate-spin rounded-full border-4 border-indigo-100 border-t-indigo-700" /></div>;
  }

  return (
    <main className="min-h-screen bg-[#eef1f5] px-0 py-0">
      <div className="mx-auto flex min-h-screen max-w-[430px] flex-col bg-[#f3f4f6] shadow-[0_0_0_1px_rgba(15,23,42,0.04)]">
        <AppHeader title="Digital Bus Pass" onMenu={() => setMenu(true)} />
        <PassMenu open={menu} onClose={() => setMenu(false)} />

        <div className="flex flex-1 flex-col px-4 pb-4 pt-5">
          {/* Heading removed as requested */}

          <PassCard pass={pass} />

          <div className="mt-auto pb-2 pt-4">
            <img
              src="/tata-logo.svg"
              alt="TATA Consultancy Services"
              className="mx-auto h-20 w-auto object-contain"
            />
          </div>
        </div>
      </div>
    </main>
  );
}