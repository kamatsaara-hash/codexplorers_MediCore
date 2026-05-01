import { useEffect, useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { api } from "@/lib/api";

const Pharmacy = ({ readOnlyNote }: { readOnlyNote?: string }) => {
  const [pharmacy, setPharmacy] = useState<any[]>([]);

  useEffect(() => {
    api.getPharmacy().then((data: any) => setPharmacy(data)).catch(console.error);
  }, []);
  return (
    <div>
      <PageHeader title="Pharmacy Inventory" subtitle={readOnlyNote ?? "Live medicine stock across hospital pharmacy."} />

      <div className="glass overflow-hidden rounded-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/60 bg-muted/30 text-left text-xs uppercase tracking-wider text-muted-foreground">
                <th className="px-5 py-3">Medicine</th>
                <th className="px-5 py-3">Category</th>
                <th className="px-5 py-3 text-right">Quantity</th>
                <th className="px-5 py-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody>
              {pharmacy.map((m: any) => {
                const qty = parseInt(m.quantity) || 0;
                const low = qty < 50;
                return (
                  <tr key={m.id} className="border-b border-border/30 last:border-0 hover:bg-primary/5">
                    <td className="px-5 py-3 font-medium">{m.medicine_name}</td>
                    <td className="px-5 py-3 text-muted-foreground">{m.category || "General"}</td>
                    <td className="px-5 py-3 text-right font-mono text-primary">{qty}</td>
                    <td className="px-5 py-3 text-right">
                      <span className={`rounded-full border px-2.5 py-0.5 text-xs ${low ? "border-destructive/40 bg-destructive/10 text-destructive" : "border-success/40 bg-success/10 text-success"}`}>
                        {low ? "Low stock" : "In stock"}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Pharmacy;
