import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { MOCK_DOCTORS, MOCK_PATIENTS } from "@/lib/mock";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const AdminDoctors = () => {
  const [q, setQ] = useState("");
  const rows = MOCK_DOCTORS.filter((d) => `${d.name} ${d.specialization}`.toLowerCase().includes(q.toLowerCase()));

  return (
    <div>
      <PageHeader
        title="Doctors"
        subtitle="All practicing physicians on the MediCore network."
        actions={
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search…" className="w-56 pl-8" />
          </div>
        }
      />

      <div className="glass overflow-hidden rounded-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/60 bg-muted/30 text-left text-xs uppercase tracking-wider text-muted-foreground">
                <th className="px-5 py-3">Doctor</th>
                <th className="px-5 py-3">Email</th>
                <th className="px-5 py-3">Phone</th>
                <th className="px-5 py-3">Specialization</th>
                <th className="px-5 py-3 text-right">Patients</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((d) => {
                const patientCount = MOCK_PATIENTS.filter((p) => p.doctorId === d.id).length;
                return (
                  <tr key={d.id} className="border-b border-border/30 last:border-0 hover:bg-primary/5 transition">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-primary text-xs font-bold text-primary-foreground">
                          {d.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                        </div>
                        <div className="font-medium">{d.name}</div>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-muted-foreground">{d.email}</td>
                    <td className="px-5 py-3 text-muted-foreground">{d.phone}</td>
                    <td className="px-5 py-3">
                      <span className="rounded-full border border-secondary/40 bg-secondary/10 px-2.5 py-0.5 text-xs text-secondary">
                        {d.specialization}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-right font-mono text-primary">{patientCount}</td>
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

export default AdminDoctors;
