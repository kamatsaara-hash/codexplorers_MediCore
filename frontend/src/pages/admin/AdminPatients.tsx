import { PageHeader } from "@/components/PageHeader";
import { SeverityBadge } from "@/components/StatusBadges";
import { MOCK_DOCTORS, MOCK_PATIENTS } from "@/lib/mock";

const AdminPatients = () => {
  return (
    <div>
      <PageHeader title="Patients" subtitle="Patients grouped under their assigned physician." />

      <div className="space-y-6">
        {MOCK_DOCTORS.map((doc) => {
          const patients = MOCK_PATIENTS.filter((p) => p.doctorId === doc.id);
          if (!patients.length) return null;
          return (
            <div key={doc.id} className="glass rounded-2xl p-5">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="font-display text-lg font-semibold">{doc.name}</div>
                  <div className="text-xs text-muted-foreground">{doc.specialization} · {patients.length} patient(s)</div>
                </div>
                <span className="rounded-full border border-primary/30 bg-primary/5 px-2.5 py-0.5 text-xs text-primary">
                  {doc.patientsToday}/10 today
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border/60 text-left text-xs uppercase tracking-wider text-muted-foreground">
                      <th className="py-2 pr-4">Patient</th>
                      <th className="py-2 pr-4">Age</th>
                      <th className="py-2 pr-4">Disease</th>
                      <th className="py-2 pr-4">Severity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {patients.map((p) => (
                      <tr key={p.id} className="border-b border-border/20 last:border-0">
                        <td className="py-3 pr-4 font-medium">{p.name}</td>
                        <td className="py-3 pr-4 text-muted-foreground">{p.age}</td>
                        <td className="py-3 pr-4">{p.disease}</td>
                        <td className="py-3 pr-4"><SeverityBadge level={p.severity} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminPatients;
