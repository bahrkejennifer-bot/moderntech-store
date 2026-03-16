import { useNavigate, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { NavLink } from "@/components/NavLink";
import {
  Mail, Upload, Rocket, Play, Pin, Cpu,
  ShoppingBag, Newspaper, Mic, Package, Settings,
} from "lucide-react";

const boardroomItems = [
  { title: "Newsletter Queue", url: "/admin/command-center", icon: Newspaper, description: "Approve & blast emails" },
  { title: "Podcast Studio", url: "/admin/episodes", icon: Mic, description: "Manage episodes" },
  { title: "Product Queue", url: "/admin/scraper", icon: Package, description: "Review scraped products" },
];

const operationsItems = [
  { title: "Email Dashboard", url: "/admin/emails", icon: Mail },
  { title: "Command Center", url: "/admin/command-center", icon: Rocket },
  { title: "Episode Manager", url: "/admin/episodes", icon: Play },
  { title: "Pinterest", url: "/admin/pinterest", icon: Pin },
  { title: "Tech Spec", url: "/admin/tech-spec", icon: Cpu },
  { title: "PDF Upload", url: "/admin/upload", icon: Upload },
  { title: "Scraper", url: "/admin/scraper", icon: ShoppingBag },
];

function AdminSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();

  return (
    <Sidebar collapsible="icon" className="border-r border-border/50">
      <SidebarContent className="bg-card pt-4">
        {/* The Boardroom */}
        <SidebarGroup defaultOpen>
          <SidebarGroupLabel className="font-['Playfair_Display'] text-xs tracking-wider uppercase text-primary px-4">
            {!collapsed && "The Boardroom"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {boardroomItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end
                      className="hover:bg-muted/50 px-4 py-3"
                      activeClassName="bg-primary/10 text-primary font-medium border-r-2 border-primary"
                    >
                      <item.icon className="mr-3 h-4 w-4 shrink-0" />
                      {!collapsed && (
                        <div className="flex flex-col">
                          <span className="text-sm font-['Inter']">{item.title}</span>
                          <span className="text-[10px] text-muted-foreground font-['Inter']">{item.description}</span>
                        </div>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Operations */}
        <SidebarGroup defaultOpen>
          <SidebarGroupLabel className="font-['Inter'] text-[9px] tracking-[0.2em] uppercase text-muted-foreground px-4 mt-4">
            {!collapsed && "Operations"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {operationsItems.map((item) => (
                <SidebarMenuItem key={item.url + item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end
                      className="hover:bg-muted/50 px-4 py-2"
                      activeClassName="bg-muted text-primary font-medium"
                    >
                      <item.icon className="mr-3 h-4 w-4 shrink-0" />
                      {!collapsed && <span className="text-sm font-['Inter']">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AdminSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-12 flex items-center border-b border-border/50 bg-card/50 backdrop-blur-sm px-4 sticky top-0 z-40">
            <SidebarTrigger className="mr-3" />
            <span className="font-['Playfair_Display'] text-sm font-semibold text-muted-foreground">
              Modern Tech — Admin
            </span>
          </header>
          <main className="flex-1">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
