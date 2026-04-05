import { Link, useLocation } from 'react-router-dom';
import { GraduationCap, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/departments', label: 'Departments' },
  { to: '/courses', label: 'Courses' },
  { to: '/contact', label: 'Contact' },
];

export const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="sticky top-0 z-50 glass shadow-premium">
        <div className="container mx-auto flex items-center justify-between h-20 px-6">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-2xl gradient-primary flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
              <GraduationCap className="h-6 w-6 text-primary-foreground" />
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-extrabold text-xl tracking-tight text-foreground leading-none">Campus Connect</span>
              <span className="text-[10px] font-bold tracking-widest uppercase text-accent leading-none mt-1">Academic Hub</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-2">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  location.pathname === link.to
                    ? 'bg-primary text-primary-foreground shadow-md scale-105'
                    : 'text-muted-foreground hover:text-primary hover:bg-primary/5'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="h-6 w-px bg-border mx-3" />
            <Link to="/login">
              <Button size="lg" className="gradient-accent text-accent-foreground border-0 font-bold px-8 rounded-xl hover:shadow-xl transition-all active:scale-95">
                Login
              </Button>
            </Link>
          </nav>

          <button className="md:hidden p-2 rounded-xl bg-muted/50" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {mobileOpen && (
          <nav className="md:hidden border-t border-border bg-card/95 backdrop-blur-xl px-4 py-6 space-y-2 animate-fade-in">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={`block px-5 py-4 rounded-xl text-md font-bold ${
                  location.pathname === link.to ? 'bg-primary text-primary-foreground shadow-lg' : 'text-muted-foreground hover:bg-muted'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link to="/login" onClick={() => setMobileOpen(false)} className="block pt-4">
              <Button size="lg" className="w-full gradient-accent text-accent-foreground border-0 font-bold rounded-xl space-x-2">
                <span>Login</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </nav>
        )}
      </header>

      <main className="flex-1 relative overflow-hidden">{children}</main>

      <footer className="border-t border-border bg-sidebar-background pt-16 pb-8 text-sidebar-foreground">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 border-b border-sidebar-border pb-12 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                <GraduationCap className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-heading font-extrabold text-lg">Campus Connect</span>
            </div>
            <div className="flex gap-8 text-sm font-medium">
              <Link to="/" className="hover:text-accent transition-colors">Home</Link>
              <Link to="/departments" className="hover:text-accent transition-colors">Departments</Link>
              <Link to="/courses" className="hover:text-accent transition-colors">Courses</Link>
              <Link to="/contact" className="hover:text-accent transition-colors">Contact</Link>
            </div>
          </div>
          <p className="text-center text-xs text-sidebar-foreground/50 tracking-wider font-semibold uppercase">
            © 2026 Campus Connect Hub. All rights reserved. Professional Academic Portal.
          </p>
        </div>
      </footer>
    </div>
  );
};

// ChevronRight was shared from DashboardLayout, adding here for completeness if needed or use Lucide
import { ChevronRight } from 'lucide-react';
