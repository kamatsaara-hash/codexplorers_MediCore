import { useEffect, useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { api } from "@/lib/api";
import { auth } from "@/lib/auth";

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
  doctor_email?: string;
  specialization: string;
  patients: Patient[];
};

const DoctorPatients = () => {
  const session = auth.get();
  const [doctorData, setDoctorData] = useState<DoctorGroup | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const data: DoctorGroup[] = await api.getAdminPatients();

        // 🔥 Find this doctor by email
        const match = data.find(
          (doc) => doc.doctor_email === session?.email
        );

        setDoctorData(match || null);
      } catch (err) {
        console.error("Failed to fetch doctor patients:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, [session]);

  if (loading) {
    return <div className="p-6">Loading patients...</div>;
  }

  if (!doctorData || doctorData.patients.length === 0) {
    return (
      <div>
        <PageHeader title="My Patients" subtitle="No patients assigned yet." />
        <div className="glass rounded-2xl p-10 text-center text-muted-foreground">
          No patients assigned yet.
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title="My Patients"
        subtitle={`${doctorData.doctor_name} · ${doctorData.specialization} — ${doctorData.patients.length} active case(s)`}
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {doctorData.patients.map((p) => (
          <div
            key={p.id}
            className="glass relative overflow-hidden rounded-2xl p-5 transition-all hover:-translate-y-1 hover:shadow-glow"
          >
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />

            <div className="flex items-start justify-between">
              <div>
                <div className="font-display text-lg font-semibold">
                  {p.name}
                </div>
                <div className="text-xs text-muted-foreground">
                  {p.age || "-"} yrs · {p.gender || "-"}
                </div>
              </div>
            </div>

            <div className="mt-4 text-sm text-muted-foreground">
              Email: {p.email}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorPatients;