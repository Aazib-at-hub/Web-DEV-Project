import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import {
  LayoutDashboard, Building2, Users, BookOpen, GraduationCap,
  ClipboardList, Mail, LogOut, Menu, X, ChevronRight,
} from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface NavItem {
  to: string;
  label: string;
  icon: React.ElementType;
}

const adminNav: NavItem[] = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/departments', label: 'Departments', icon: Building2 },
  { to: '/admin/classes', label: 'Classes', icon: BookOpen },
  { to: '/admin/students', label: 'Students', icon: Users },
  { to: '/admin/courses', label: 'Courses', icon: GraduationCap },
  { to: '/admin/attendance', label: 'Attendance', icon: ClipboardList },
  { to: '/admin/contacts', label: 'Contact Messages', icon: Mail },
];

const teacherNav: NavItem[] = [
  { to: '/teacher', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/teacher/attendance', label: 'Take Attendance', icon: ClipboardList },
  { to: '/teacher/history', label: 'Attendance History', icon: BookOpen },
];

export const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { user, logout, isAdmin } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const navItems = isAdmin ? adminNav : teacherNav;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Enhanced Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex flex-col transition-all duration-500 ease-in-out shadow-2xl ${
          sidebarOpen ? 'w-64' : 'w-0 md:w-20'
        } bg-sidebar-background text-sidebar-foreground border-r border-sidebar-border overflow-hidden`}
      >
        <div className="flex items-center gap-3 px-5 h-20 border-b border-sidebar-border">
          <div className="w-10 h-10 rounded-xl gradient-accent flex items-center justify-center flex-shrink-0 shadow-lg">
            <GraduationCap className="h-5 w-5 text-accent-foreground" />
          </div>
          {sidebarOpen && (
            <div className="flex flex-col animate-fade-in">
              <span className="font-heading font-extrabold text-sm tracking-tight truncate leading-none">Campus Connect</span>
              <span className="text-[10px] font-bold tracking-widest uppercase text-accent mt-1">Admin Portal</span>
            </div>
          )}
        </div>

        <nav className="flex-1 py-6 space-y-2 px-3 overflow-y-auto">
          {navItems.map(item => {
            const active = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`group flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all duration-300 ${
                  active
                    ? 'bg-accent text-accent-foreground shadow-lg shadow-accent/20 scale-105'
                    : 'text-sidebar-foreground hover:text-white hover:bg-white/10 hover:translate-x-1'
                }`}
                title={item.label}
              >
                <item.icon className={`h-5 w-5 flex-shrink-0 ${active ? 'text-accent-foreground' : 'text-accent group-hover:scale-110 transition-transform'}`} />
                {sidebarOpen && <span className="animate-fade-in">{item.label}</span>}
                {active && sidebarOpen && <ChevronRight className="h-4 w-4 ml-auto opacity-70" />}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-sidebar-border bg-black/10 backdrop-blur-sm">
          {sidebarOpen && (
            <div className="flex items-center gap-3 mb-4 px-3 p-3 rounded-2xl bg-sidebar-accent/5 ring-1 ring-white/5 animate-fade-in">
              <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-xs font-bold shadow-md">
                {user?.name.charAt(0)}
              </div>
              <div className="flex flex-col truncate">
                <span className="text-xs font-bold text-white tracking-tight">{user?.name}</span>
                <span className="text-[10px] font-bold text-accent uppercase tracking-wider">Logged in as {user?.role}</span>
              </div>
            </div>
          )}
          <button
            onClick={handleLogout}
            className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold text-red-400 hover:text-red-300 hover:bg-red-950/20 w-full transition-all duration-300 ${sidebarOpen ? '' : 'justify-center'}`}
          >
            <LogOut className="h-5 w-5 flex-shrink-0" />
            {sidebarOpen && <span>Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className={`flex-1 flex flex-col transition-all duration-500 ease-in-out ${sidebarOpen ? 'ml-64' : 'ml-0 md:ml-20'}`}>
        <header className="sticky top-0 z-30 h-16 flex items-center gap-4 px-6 border-b border-border bg-card/80 backdrop-blur-xl shadow-sm">
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)} 
            className="p-2.5 rounded-2xl bg-muted/30 hover:bg-muted transition-colors active:scale-95 group shadow-sm shadow-black/5"
          >
            {sidebarOpen ? <X className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" /> : <Menu className="h-5 w-5 text-muted-foreground" />}
          </button>
          <div className="h-6 w-px bg-border mx-2" />
          <h1 className="font-heading font-extrabold text-xl text-foreground tracking-tight">
            {navItems.find(n => n.to === location.pathname)?.label || 'Overview'}
          </h1>
          <div className="ml-auto hidden sm:flex items-center gap-3">
             <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground bg-muted/20 px-4 py-2 rounded-full ring-1 ring-border shadow-sm">
               <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
               <span className="opacity-70">Live Status: System Online</span>
             </div>
          </div>
        </header>

        <main className="flex-1 p-6 md:p-8 relative overflow-y-auto min-h-[calc(100vh-64px)] animate-fade-in scrollbar-thin">
          <div className="max-w-7xl mx-auto space-y-8 pb-12">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Backdrop Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-sidebar-background/60 backdrop-blur-md z-30 md:hidden animate-fade-in" 
          onClick={() => setSidebarOpen(false)} 
        />
      )}
    </div>
  );
};
