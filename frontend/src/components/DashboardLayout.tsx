import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { AmbientBackground } from "@/components/AmbientBackground";
import { ProfileDialog } from "@/components/ProfileDialog";
import { auth, Role, ROLE_META } from "@/lib/auth";
import { Bell } from "lucide-react";

export const DashboardLayout = ({ role }: { role: Role }) => {
  const session = auth.get();
  const location = useLocation();
  const [profileOpen, setProfileOpen] = useState(false);

  if (!session || session.role !== role) {
    return <Navigate to="/" replace state={{ from: location.pathname }} />;
  }

  return (
    <SidebarProvider>
      <AmbientBackground />
      <div className="flex min-h-screen w-full">
        <AppSidebar role={role} />

        <div className="flex flex-1 flex-col">
          <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-border/60 bg-background/60 px-4 backdrop-blur-xl">
            <SidebarTrigger className="text-foreground/80 hover:text-primary" />
            <div className="hidden md:block">
              <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                {ROLE_META[role].label}
              </div>
              <div className="text-sm font-medium text-foreground -mt-0.5">{session.name}</div>
            </div>
            <div className="ml-auto flex items-center gap-3">
              <button className="relative rounded-lg border border-border/60 bg-card/40 p-2 text-foreground/70 transition hover:text-primary hover:border-primary/50">
                <Bell className="h-4 w-4" />
                <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-destructive animate-pulse" />
              </button>
              <button
                onClick={() => setProfileOpen(true)}
                className="flex items-center gap-2 rounded-lg border border-border/60 bg-card/40 px-3 py-1.5 transition hover:border-primary/50 hover:shadow-[0_0_20px_-6px_hsl(var(--primary)/0.6)]"
                aria-label="Open profile"
              >
                <div className="h-7 w-7 rounded-full bg-gradient-primary flex items-center justify-center text-xs font-bold text-primary-foreground">
                  {session.name.charAt(0).toUpperCase()}
                </div>
                <div className="hidden sm:block leading-tight text-left">
                  <div className="text-xs font-medium">{session.name}</div>
                  <div className="text-[10px] text-muted-foreground">{session.email}</div>
                </div>
              </button>
            </div>
          </header>

          <main className="flex-1 p-4 md:p-6 lg:p-8 animate-fade-in">
            <Outlet />
          </main>
        </div>
      </div>
      <ProfileDialog open={profileOpen} onOpenChange={setProfileOpen} />
    </SidebarProvider>
  );
};
