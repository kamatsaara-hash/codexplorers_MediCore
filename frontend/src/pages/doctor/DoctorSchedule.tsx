import { useEffect, useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { AvailabilityBadge } from "@/components/StatusBadges";
import { api } from "@/lib/api";
import { auth } from "@/lib/auth";

const MAX_PER_DAY = 10;

const TIMES = [
  "09:00", "09:30", "10:00", "10:30",
  "11:00", "11:30", "13:00", "13:30",
  "14:00", "14:30"
];

type Doctor = {
  id: string;
  name: string;
  email: string;
  specialization: string;
  patients_today: number;
};

const DoctorSchedule = () => {
  const session = auth.get();
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const data: Doctor[] = await api.getDoctors();

        const current = data.find(
          (d) => d.email === session?.email
        );

        setDoctor(current || null);
      } catch (err) {
        console.error("Failed to fetch doctor:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctor();
  }, [session]);

  if (loading) {
    return <div className="p-6">Loading schedule...</div>;
  }

  if (!doctor) {
    return <div className="p-6">Doctor not found</div>;
  }

  const booked = doctor.patients_today || 0;
  const available = booked < MAX_PER_DAY;
  const remaining = Math.max(0, MAX_PER_DAY - booked);

  return (
    <div>
      <PageHeader
        title="Today's Schedule"
        subtitle="Up to 10 patients per day. Slots auto-lock when full."
        actions={
          <AvailabilityBadge
            available={available}
            count={booked}
            max={MAX_PER_DAY}
          />
        }
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="glass rounded-2xl p-6 lg:col-span-2">
          <h3 className="font-display text-lg font-semibold">Time slots</h3>

          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
            {TIMES.map((t, i) => {
              const isBooked = i < booked;

              return (
                <div
                  key={t}
                  className={`relative rounded-xl border p-3 text-center text-sm transition ${
                    isBooked
                      ? "border-destructive/40 bg-destructive/10 text-destructive"
                      : "border-success/40 bg-success/5 text-success hover:shadow-glow"
                  }`}
                >
                  <div className="font-mono">{t}</div>

                  <div className="mt-1 text-[10px] uppercase tracking-widest opacity-80">
                    {isBooked ? "Booked" : "Open"}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="glass rounded-2xl p-6">
          <h3 className="font-display text-lg font-semibold">Capacity</h3>

          <div className="mt-4">
            <div className="flex items-end justify-between">
              <div className="font-display text-4xl font-bold gradient-text">
                {booked}
              </div>

              <div className="text-sm text-muted-foreground">
                / {MAX_PER_DAY}
              </div>
            </div>

            <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full bg-gradient-primary transition-all"
                style={{ width: `${(booked / MAX_PER_DAY) * 100}%` }}
              />
            </div>

            <div className="mt-3 text-xs text-muted-foreground">
              {remaining > 0
                ? `${remaining} slot(s) remaining today`
                : "All slots booked. New requests will queue for tomorrow."}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorSchedule;