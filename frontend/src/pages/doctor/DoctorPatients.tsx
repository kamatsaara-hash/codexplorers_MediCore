import { PageHeader } from "@/components/PageHeader";
import { SeverityBadge } from "@/components/StatusBadges";
import { MOCK_DOCTORS, MOCK_PATIENTS } from "@/lib/mock";
import { auth } from "@/lib/auth";

const DoctorPatients = () => {
  const session = auth.get();
  // Demo: pick first doctor or by email match
  const doctor = MOCK_DOCTORS.find((d) => d.email === session?.email) ?? MOCK_DOCTORS[0];
  const patients = MOCK_PATIENTS.filter((p) => p.doctorId === doctor.id);

  return (
    <div>
      <PageHeader
        title="My Patients"
        subtitle={`${doctor.name} · ${doctor.specialization} — ${patients.length} active case(s)`}
      />

      {patients.length === 0 ? (
        <div className="glass rounded-2xl p-10 text-center text-muted-foreground">No patients assigned yet.</div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {patients.map((p) => (
            <div key={p.id} className="glass relative overflow-hidden rounded-2xl p-5 transition-all hover:-translate-y-1 hover:shadow-glow">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-display text-lg font-semibold">{p.name}</div>
                  <div className="text-xs text-muted-foreground">{p.age} yrs · {p.gender}</div>
                </div>
                <SeverityBadge level={p.severity} />
              </div>
              <div className="mt-4 space-y-2 text-sm">
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Symptoms</div>
                  <div className="text-foreground/90">{p.symptoms}</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Predicted disease</div>
                  <div className="text-primary font-medium">{p.disease}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DoctorPatients;
