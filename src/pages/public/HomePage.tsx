import { PublicLayout } from '@/components/layouts/PublicLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { GraduationCap, BookOpen, Users, Award, ArrowRight, Sparkles, Building2, Target } from 'lucide-react';

const stats = [
  { icon: Users, label: 'Enrolled Students', value: '1,200+' },
  { icon: BookOpen, label: 'Active Courses', value: '85+' },
  { icon: Building2, label: 'Departments', value: '8' },
  { icon: Award, label: 'Gold Medals', value: '150+' },
];

const HomePage = () => {
  return (
    <PublicLayout>
      {/* Premium Hero Section */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,hsl(var(--primary)/0.15),transparent)]" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
        
        <div className="container mx-auto px-6 py-20 relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="max-w-2xl animate-fade-in text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-accent/10 border border-accent/20 text-accent text-xs font-bold uppercase tracking-widest mb-8 shadow-sm">
                <Sparkles className="h-4 w-4" />
                Redefining Academic Excellence
              </div>
              <h1 className="text-5xl md:text-7xl font-heading font-extrabold text-foreground leading-[1.1] mb-8 tracking-tighter">
                Elevate Your <span className="text-accent">Future</span> at <span className="relative">Campus Connect<div className="absolute -bottom-2 left-0 w-1/2 h-2 bg-accent/40 rounded-full" /></span>
              </h1>
              <p className="text-xl text-muted-foreground mb-10 leading-relaxed font-medium opacity-80">
                Empowering the next generation of leaders with innovative learning, world-class faculty, and a vibrant community. Join us in shaping a smarter tomorrow.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/departments">
                  <Button size="lg" className="gradient-primary text-primary-foreground border-0 gap-3 px-8 h-14 rounded-2xl font-bold shadow-xl shadow-primary/20 hover:scale-105 transition-transform">
                    Explore Programs <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button size="lg" variant="outline" className="px-8 h-14 rounded-2xl font-bold border-2 hover:bg-muted/50">
                    Contact Admissions
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative hidden lg:block animate-fade-in group">
               <div className="absolute inset-0 gradient-primary rounded-[3rem] rotate-3 scale-95 opacity-10 group-hover:rotate-6 transition-transform duration-700" />
               <div className="relative bg-card border-border border-2 rounded-[3.5rem] p-12 shadow-premium backdrop-blur-xl group-hover:-translate-y-2 transition-transform duration-500 overflow-hidden">
                 <div className="absolute top-0 right-0 w-32 h-32 gradient-accent opacity-20 blur-3xl" />
                 <div className="space-y-8">
                   <div className="flex items-center gap-6">
                     <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center shadow-lg"><Target className="h-7 w-7 text-primary-foreground" /></div>
                     <div>
                       <h3 className="font-heading font-bold text-lg">Mission Focused</h3>
                       <p className="text-sm text-muted-foreground font-medium">To provide globally competitive education.</p>
                     </div>
                   </div>
                   <div className="flex items-center gap-6">
                     <div className="w-14 h-14 rounded-2xl gradient-accent flex items-center justify-center shadow-lg"><Award className="h-7 w-7 text-accent-foreground" /></div>
                     <div>
                       <h3 className="font-heading font-bold text-lg">Accredited Excellence</h3>
                       <p className="text-sm text-muted-foreground font-medium">Ranked #1 in Regional Academic Progress.</p>
                     </div>
                   </div>
                   <div className="pt-4 border-t border-border">
                     <p className="text-sm italic text-muted-foreground opacity-60">"Campus Connect has transformed my perspective on engineering and innovation."</p>
                     <p className="mt-2 text-xs font-bold text-foreground">— Sarah K., Alumni '24</p>
                   </div>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 -mt-10 px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-8 bg-card/50 backdrop-blur-2xl rounded-[3rem] border border-white/10 shadow-2xl">
            {stats.map(stat => (
              <div key={stat.label} className="text-center group">
                <div className="w-14 h-14 rounded-2xl bg-primary/5 mx-auto mb-4 flex items-center justify-center ring-1 ring-primary/10 group-hover:scale-110 transition-transform">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="text-3xl font-heading font-black text-foreground mb-1 tracking-tight">{stat.value}</div>
                <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section with modern card design */}
      <section className="container mx-auto px-6 py-32">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
             <h2 className="text-3xl font-heading font-extrabold text-foreground mb-4 tracking-tight">Our Identity & Heritage</h2>
             <div className="w-20 h-1.5 gradient-primary mx-auto rounded-full" />
          </div>
          <Card className="rounded-[3rem] border-0 shadow-premium overflow-hidden group">
            <CardContent className="p-12 md:p-16 relative bg-gradient-to-br from-card to-muted/20">
              <p className="text-xl text-muted-foreground leading-relaxed font-medium relative z-10 text-center">
                Campus Connect Hub is a premier academic institution dedicated to pioneering excellence and holistic innovation. 
                With advanced laboratory facilities, a globally recognized faculty, and a sprawling modern campus, 
                we empower students to transcend traditional boundaries through transformative learning environments and hands-on research engagement.
              </p>
              <div className="absolute bottom-0 right-0 opacity-5 pointer-events-none -translate-x-4 -translate-y-4">
                <GraduationCap size={240} className="text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </PublicLayout>
  );
};

export default HomePage;
