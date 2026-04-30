import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { auth, ROLE_META } from "@/lib/auth";
import { api, UserProfile } from "@/lib/api";
import { Mail, Phone, Calendar, Shield, Stethoscope, User, Droplet, Award, Building2, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface Props {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}

export const ProfileDialog = ({ open, onOpenChange }: Props) => {
  const session = auth.get();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open || !session) return;
    let active = true;
    setLoading(true);
    setError(null);
    api
      .getProfile(session.role, session.email)
      .then((p) => active && setProfile(p))
      .catch((e) => {
        if (!active) return;
        setError(e.message || "Failed to load profile");
        // Fallback so the dialog is still useful when backend is offline.
        setProfile({
          role: session.role,
          name: session.name,
          email: session.email,
          phone: "—",
          joined_at: new Date().toISOString(),
          ...(session.role === "doctor" && {
            specialization: "General Medicine",
            license_no: "—",
            experience_years: 0,
            patients_today: 0,
            max_per_day: 10,
          }),
          ...(session.role === "patient" && {
            age: 0,
            gender: "—",
            blood_group: "—",
            allergies: [],
          }),
          ...(session.role === "admin" && { department: "Operations", access_level: "Full" }),
        });
      })
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, [open, session?.email, session?.role]);

  if (!session) return null;
  const meta = ROLE_META[session.role];
  const RoleIcon = session.role === "admin" ? Shield : session.role === "doctor" ? Stethoscope : User;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass max-w-md border-primary/30">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-display">
            <RoleIcon className="h-5 w-5 text-primary" /> {meta.label} Profile
          </DialogTitle>
          <DialogDescription>{meta.tagline}</DialogDescription>
        </DialogHeader>

        {loading && (
          <div className="flex items-center justify-center py-10 text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin mr-2" /> Loading from MongoDB…
          </div>
        )}

        {!loading && profile && (
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-gradient-primary flex items-center justify-center text-2xl font-bold text-primary-foreground shadow-glow">
                {profile.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <div className="text-lg font-semibold">{profile.name}</div>
                <Badge variant="outline" className="mt-1 border-primary/40 text-primary">
                  {meta.label}
                </Badge>
              </div>
            </div>

            <Separator />

            <div className="space-y-2 text-sm">
              <Row icon={Mail} label="Email" value={profile.email} />
              {profile.phone && <Row icon={Phone} label="Phone" value={profile.phone} />}
              {profile.joined_at && (
                <Row icon={Calendar} label="Joined" value={new Date(profile.joined_at).toLocaleDateString()} />
              )}

              {profile.role === "doctor" && (
                <>
                  <Row icon={Stethoscope} label="Specialization" value={profile.specialization || "—"} />
                  <Row icon={Award} label="License" value={profile.license_no || "—"} />
                  <Row icon={Award} label="Experience" value={`${profile.experience_years ?? 0} years`} />
                  <Row
                    icon={User}
                    label="Today's load"
                    value={`${profile.patients_today ?? 0} / ${profile.max_per_day ?? 10}`}
                  />
                </>
              )}

              {profile.role === "patient" && (
                <>
                  <Row icon={User} label="Age" value={String(profile.age ?? "—")} />
                  <Row icon={User} label="Gender" value={profile.gender || "—"} />
                  <Row icon={Droplet} label="Blood group" value={profile.blood_group || "—"} />
                  {profile.allergies && profile.allergies.length > 0 && (
                    <div className="flex items-start gap-2">
                      <Droplet className="h-4 w-4 mt-0.5 text-muted-foreground" />
                      <div>
                        <div className="text-xs text-muted-foreground">Allergies</div>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {profile.allergies.map((a) => (
                            <Badge key={a} variant="secondary" className="text-xs">
                              {a}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}

              {profile.role === "admin" && (
                <>
                  <Row icon={Building2} label="Department" value={profile.department || "—"} />
                  <Row icon={Shield} label="Access" value={profile.access_level || "—"} />
                </>
              )}
            </div>

            {error && (
              <div className="text-[11px] text-muted-foreground border-t border-border/40 pt-2">
                ⚠ Backend unavailable — showing fallback. <code className="text-primary">GET /users/profile</code>
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

const Row = ({ icon: Icon, label, value }: { icon: any; label: string; value: string }) => (
  <div className="flex items-center gap-2">
    <Icon className="h-4 w-4 text-muted-foreground" />
    <span className="text-xs text-muted-foreground w-28">{label}</span>
    <span className="font-medium">{value}</span>
  </div>
);
