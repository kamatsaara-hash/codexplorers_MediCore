import { NavLink, useLocation } from "react-router-dom";
import { LogOut } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";
import { BrandLogo } from "@/components/BrandLogo";
import { Role, auth } from "@/lib/auth";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard, Users, Stethoscope, Pill, CalendarDays, Brain, FileText, CalendarPlus,
} from "lucide-react";

const NAV: Record<Role, Array<{ title: string; url: string; icon: any }>> = {
  admin: [
    { title: "Overview", url: "/admin", icon: LayoutDashboard },
    { title: "Doctors", url: "/admin/doctors", icon: Stethoscope },
    { title: "Patients", url: "/admin/patients", icon: Users },
    { title: "Pharmacy", url: "/admin/pharmacy", icon: Pill },
  ],
  doctor: [
    { title: "My Patients", url: "/doctor", icon: Users },
    { title: "Schedule", url: "/doctor/schedule", icon: CalendarDays },
    { title: "Pharmacy", url: "/doctor/pharmacy", icon: Pill },
  ],
  patient: [
    { title: "AI Symptoms", url: "/patient", icon: Brain },
    { title: "My Reports", url: "/patient/reports", icon: FileText },
    { title: "Book Appointment", url: "/patient/book", icon: CalendarPlus },
  ],
};

export const AppSidebar = ({ role }: { role: Role }) => {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const items = NAV[role];

  const isActive = (url: string) =>
    url === `/${role}` ? pathname === url : pathname.startsWith(url);

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      <SidebarHeader className="border-b border-sidebar-border px-3 py-4">
        <BrandLogo showText={!collapsed} />
      </SidebarHeader>

      <SidebarContent className="px-2 py-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            {role}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const active = isActive(item.url);
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={active}>
                      <NavLink
                        to={item.url}
                        end={item.url === `/${role}`}
                        className={cn(
                          "group relative flex items-center gap-3 rounded-lg px-2.5 py-2 text-sm transition-all",
                          active
                            ? "bg-primary/10 text-primary shadow-[0_0_20px_-6px_hsl(var(--primary)/0.6)]"
                            : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-primary"
                        )}
                      >
                        {active && <span className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-r bg-primary shadow-neon" />}
                        <item.icon className="h-4 w-4 shrink-0" />
                        {!collapsed && <span className="truncate">{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => {
                auth.logout();
                navigate("/");
              }}
              className="text-sidebar-foreground/80 hover:text-destructive"
            >
              <LogOut className="h-4 w-4" />
              {!collapsed && <span>Sign out</span>}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};
