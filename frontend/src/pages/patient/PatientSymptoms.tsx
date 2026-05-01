import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Brain, Sparkles, ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { SeverityBadge, AvailabilityBadge } from "@/components/StatusBadges";
import { api, PredictionResult } from "@/lib/api";

import { auth } from "@/lib/auth";
import { toast } from "sonner";

const PatientSymptoms = () => {
  const [symptoms, setSymptoms] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const navigate = useNavigate();


  const onPredict = async () => {
    if (!symptoms.trim()) {
      return toast.error("Describe your symptoms first");
    }

    setLoading(true);
    setResult(null);

    try {
      const r = await api.predict(symptoms);
      setResult(r);
    } catch (err) {
      console.error(err);
      toast.error("AI prediction failed");
    } finally {
      setLoading(false);
    }
  };

  const goBook = (doctorId: string) => {
    sessionStorage.setItem("medicore.lastReport", JSON.stringify({
      patient: auth.get()?.name ?? "Guest",
      symptoms,
      result,
      generatedAt: new Date().toISOString(),
    }));
    navigate(`/patient/book?doctor=${doctorId}`);
  };

  return (
    <div>
      <PageHeader
        title="AI Symptom Analysis"
        subtitle="Describe what you're feeling — the AI engine will surface likely conditions and route you to the right specialist."
      />

      <div className="grid gap-6 lg:grid-cols-5">
        <div className="glass scanline relative overflow-hidden rounded-2xl p-6 lg:col-span-3">
          <div className="flex items-center gap-2 text-primary">
            <Brain className="h-5 w-5" />
            <h3 className="font-display text-lg font-semibold">Describe your symptoms</h3>
          </div>
          <Textarea
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            placeholder="e.g. Persistent dry cough for 5 days, mild fever in the evenings, occasional shortness of breath when climbing stairs."
            className="mt-4 min-h-[180px] resize-none bg-input/40 border-border/60 focus-visible:ring-primary"
          />
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <div className="text-xs text-muted-foreground">
              Your data stays private. AI suggestions are not a medical diagnosis.
            </div>
            <Button onClick={onPredict} disabled={loading} className="group bg-gradient-primary text-primary-foreground shadow-glow">
              {loading ? (
                <>
                  <Sparkles className="mr-1.5 h-4 w-4 animate-spin-slow" />
                  Analyzing…
                </>
              ) : (
                <>
                  <Sparkles className="mr-1.5 h-4 w-4" />
                  Predict disease
                </>
              )}
              <ArrowRight className="ml-1.5 h-4 w-4 transition group-hover:translate-x-0.5" />
            </Button>
          </div>

          {loading && <ThinkingPulse />}
        </div>

        <div className="glass relative overflow-hidden rounded-2xl p-6 lg:col-span-2">
          <h3 className="font-display text-lg font-semibold">Diagnostic Result</h3>
          {!result && !loading && (
            <div className="mt-6 rounded-xl border border-dashed border-border/60 p-6 text-center text-sm text-muted-foreground">
              Awaiting symptom input…
            </div>
          )}
          {loading && (
            <div className="mt-6 space-y-2">
              <div className="h-3 w-3/4 animate-pulse rounded bg-muted" />
              <div className="h-3 w-1/2 animate-pulse rounded bg-muted" />
              <div className="h-3 w-2/3 animate-pulse rounded bg-muted" />
            </div>
          )}
          {result && (
            <div className="mt-4 animate-fade-in space-y-4">
              <div>
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Likely condition</div>
                <div className="mt-1 font-display text-2xl font-bold gradient-text">{result.disease}</div>
                <div className="mt-1 text-xs text-muted-foreground">
                  Confidence {(result.confidence * 100).toFixed(0)}% · {result.recommended_specialization}
                </div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Severity</div>
                <div className="mt-1.5"><SeverityBadge level={result.severity} /></div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2">Recommended doctors</div>
                <div className="space-y-2">
                  {result.recommended_doctors.length === 0 && (
                    <div className="text-sm text-muted-foreground">No matching specialists currently available.</div>
                  )}
                  {result.recommended_doctors.map((d) => (
                    <div key={d.id} className="flex items-center justify-between gap-2 rounded-xl border border-border/60 bg-card/40 px-3 py-2">
                      <div className="min-w-0">
                        <div className="truncate text-sm font-medium">{d.name}</div>
                        <div className="text-xs text-muted-foreground">{d.specialization}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <AvailabilityBadge available={d.available} count={d.patients_today} max={d.max_per_day} />
                        <Button size="sm" disabled={!d.available} onClick={() => goBook(d.id)} variant="secondary">
                          Book
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <Button
                variant="outline"
                className="w-full border-primary/40 text-primary hover:bg-primary/10"
                onClick={() => {
                  sessionStorage.setItem("medicore.lastReport", JSON.stringify({
                    patient: auth.get()?.name ?? "Guest",
                    symptoms, result, generatedAt: new Date().toISOString(),
                  }));
                  navigate("/patient/reports");
                }}
              >
                View full report
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ThinkingPulse = () => (
  <div className="mt-5 flex items-center gap-3 text-xs text-primary">
    <div className="relative h-6 w-6">
      <span className="absolute inset-0 rounded-full border border-primary/40" />
      <span className="absolute inset-0 rounded-full border border-primary animate-ping" />
      <span className="absolute inset-1 rounded-full bg-primary/30" />
    </div>
    <span className="bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] bg-clip-text text-transparent animate-shimmer">
      Neural diagnostic core analyzing symptoms…
    </span>
  </div>
);

export default PatientSymptoms;
