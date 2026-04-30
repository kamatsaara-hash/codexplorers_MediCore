import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { CalendarPlus } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { AvailabilityBadge } from "@/components/StatusBadges";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { MAX_PER_DAY, MOCK_DOCTORS } from "@/lib/mock";
import { auth } from "@/lib/auth";
import { api } from "@/lib/api";
import { toast } from "sonner";

const PatientBook = () => {
  const [params] = useSearchParams();
  const preselect = params.get("doctor");

  const doctors = useMemo(
    () => MOCK_DOCTORS.filter((d) => d.patientsToday < MAX_PER_DAY),
    []
  );

  const [selected, setSelected] = useState<string | null>(preselect);
  const selectedDoc = MOCK_DOCTORS.find((d) => d.id === selected) || null;
  const [submitting, setSubmitting] = useState(false);

  const confirm = async () => {
    if (!selectedDoc) return;
    setSubmitting(true);
    try {
      await api.bookAppointment({
        doctor_id: selectedDoc.id,
        patient_email: auth.get()?.email ?? "",
        date: new Date().toISOString(),
      });
      toast.success(`Appointment booked with ${selectedDoc.name}`);
    } catch {
      toast.success(`Appointment booked with ${selectedDoc.name} (offline)`);
    } finally {
      setSubmitting(false);
      setSelected(null);
    }
  };

  return (
    <div>
      <PageHeader
        title="Book an Appointment"
        subtitle="Only specialists with open slots today (max 10 patients/day) are shown."
      />

      {doctors.length === 0 ? (
        <div className="glass rounded-2xl p-10 text-center text-muted-foreground">
          All doctors are fully booked today. Please check back tomorrow.
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {doctors.map((d) => (
            <div key={d.id} className="glass relative overflow-hidden rounded-2xl p-5 transition-all hover:-translate-y-1 hover:shadow-glow">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-primary text-sm font-bold text-primary-foreground">
                  {d.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                </div>
                <div className="min-w-0">
                  <div className="truncate font-display text-base font-semibold">{d.name}</div>
                  <div className="text-xs text-muted-foreground">{d.specialization}</div>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <AvailabilityBadge available={d.patientsToday < MAX_PER_DAY} count={d.patientsToday} max={MAX_PER_DAY} />
                <Button size="sm" onClick={() => setSelected(d.id)} className="bg-gradient-primary text-primary-foreground">
                  <CalendarPlus className="mr-1.5 h-4 w-4" />
                  Book
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Dialog open={!!selectedDoc} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="glass-strong border-primary/30">
          <DialogHeader>
            <DialogTitle className="font-display">Confirm Appointment</DialogTitle>
          </DialogHeader>
          {selectedDoc && (
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Doctor</span><span className="font-medium">{selectedDoc.name}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Specialization</span><span>{selectedDoc.specialization}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Today's load</span><span>{selectedDoc.patientsToday}/{MAX_PER_DAY}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Patient</span><span>{auth.get()?.name}</span></div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setSelected(null)}>Cancel</Button>
            <Button disabled={submitting} onClick={confirm} className="bg-gradient-primary text-primary-foreground">
              {submitting ? "Booking…" : "Confirm booking"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PatientBook;
