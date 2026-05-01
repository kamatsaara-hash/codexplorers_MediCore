import { useEffect, useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { api } from "@/lib/api";

type Patient = {
  id: string;
  name: string;
  email: string;
  age?: number;
  gender?: string;
};

type DoctorGroup = {
  doctor_id: string;
  doctor_name: string;
  specialization: string;
  patients: Patient[];
};

const AdminPatients = () => {
  const [data, setData] = useState<DoctorGroup[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔥 Fetch from backend
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res: DoctorGroup[] = await api.getAdminPatients();
        setData(res);
      } catch (err) {
        console.error("Failed to load patients:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  if (loading) {
    return <div className="p-6">Loading patients...</div>;
  }

  return (
    <div>
      <PageHeader
        title="Patients"
        subtitle="Patients grouped under their assigned physician."
      />

      <div className="space-y-6">
        {data.map((doc) => {
          if (!doc.patients.length) return null;

          return (
            <div key={doc.doctor_id} className="glass rounded-2xl p-5">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="font-display text-lg font-semibold">
                    {doc.doctor_name}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {doc.specialization} · {doc.patients.length} patient(s)
                  </div>
                </div>

                <span className="rounded-full border border-primary/30 bg-primary/5 px-2.5 py-0.5 text-xs text-primary">
                  {doc.patients.length} today
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border/60 text-left text-xs uppercase tracking-wider text-muted-foreground">
                      <th className="py-2 pr-4">Patient</th>
                      <th className="py-2 pr-4">Email</th>
                      <th className="py-2 pr-4">Age</th>
                      <th className="py-2 pr-4">Gender</th>
                    </tr>
                  </thead>

                  <tbody>
                    {doc.patients.map((p) => (
                      <tr
                        key={p.id}
                        className="border-b border-border/20 last:border-0"
                      >
                        <td className="py-3 pr-4 font-medium">{p.name}</td>
                        <td className="py-3 pr-4 text-muted-foreground">
                          {p.email}
                        </td>
                        <td className="py-3 pr-4 text-muted-foreground">
                          {p.age || "-"}
                        </td>
                        <td className="py-3 pr-4 text-muted-foreground">
                          {p.gender || "-"}
                        </td>
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