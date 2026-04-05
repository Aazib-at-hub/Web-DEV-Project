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
  { to: '/admin/contacts', label: 'Contact Msgs', icon: Mail },
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
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex flex-col transition-all duration-300 ${
          sidebarOpen ? 'w-64' : 'w-0 md:w-16'
        } bg-sidebar-bg text-sidebar-fg overflow-hidden`}
      >
        <div className="flex items-center gap-2 px-4 h-16 border-b border-sidebar-border-custom">
          <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center flex-shrink-0">
            <GraduationCap className="h-4 w-4 text-primary-foreground" />
          </div>
          {sidebarOpen && <span className="font-heading font-bold text-sm truncate">Apex College</span>}
        </div>

        <nav className="flex-1 py-4 space-y-1 px-2 overflow-y-auto">
          {navItems.map(item => {
            const active = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  active
                    ? 'bg-sidebar-accent-custom/20 text-sidebar-fg'
                    : 'text-sidebar-muted hover:text-sidebar-fg hover:bg-sidebar-border-custom/50'
                }`}
                title={item.label}
              >
                <item.icon className="h-4 w-4 flex-shrink-0" />
                {sidebarOpen && <span>{item.label}</span>}
                {active && sidebarOpen && <ChevronRight className="h-3 w-3 ml-auto" />}
              </Link>
            );
          })}
        </nav>

        <div className="p-2 border-t border-sidebar-border-custom">
          {sidebarOpen && (
            <div className="px-3 py-2 text-xs text-sidebar-muted truncate">
              {user?.name} ({user?.role})
            </div>
          )}
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-sidebar-muted hover:text-sidebar-fg hover:bg-sidebar-border-custom/50 w-full"
          >
            <LogOut className="h-4 w-4 flex-shrink-0" />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0 md:ml-16'}`}>
        <header className="sticky top-0 z-30 h-14 flex items-center gap-4 px-4 border-b border-border bg-card">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-1.5 rounded-lg hover:bg-muted">
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          <h1 className="font-heading font-semibold text-lg">
            {navItems.find(n => n.to === location.pathname)?.label || 'Dashboard'}
          </h1>
        </header>

        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-foreground/20 z-30 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}
    </div>
  );
};
