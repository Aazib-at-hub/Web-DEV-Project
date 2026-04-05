import { PublicLayout } from '@/components/layouts/PublicLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { GraduationCap, BookOpen, Users, Award, ArrowRight } from 'lucide-react';

const stats = [
  { icon: Users, label: 'Students', value: '60+' },
  { icon: BookOpen, label: 'Courses', value: '6+' },
  { icon: GraduationCap, label: 'Departments', value: '4' },
  { icon: Award, label: 'Faculty', value: '3+' },
];

const HomePage = () => {
  return (
    <PublicLayout>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-10" />
        <div className="container mx-auto px-4 py-20 md:py-32 relative">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <GraduationCap className="h-4 w-4" />
              Excellence in Education Since 1985
            </div>
            <h1 className="text-4xl md:text-6xl font-heading font-bold text-foreground leading-tight mb-6">
              Welcome to <span className="text-primary">Apex College</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
              Empowering minds, shaping futures. Discover world-class education across diverse disciplines with hands-on learning and cutting-edge research.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link to="/departments">
                <Button size="lg" className="gradient-primary text-primary-foreground border-0 gap-2">
                  Explore Departments <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline">Contact Us</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border bg-card">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map(stat => (
              <div key={stat.label} className="text-center">
                <div className="w-12 h-12 rounded-xl gradient-primary mx-auto mb-3 flex items-center justify-center">
                  <stat.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <div className="text-2xl font-heading font-bold text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-heading font-bold text-foreground mb-4">About Our College</h2>
          <Card>
            <CardContent className="p-8">
              <p className="text-muted-foreground leading-relaxed">
                Apex College is a premier institution dedicated to academic excellence and holistic development.
                With state-of-the-art facilities, experienced faculty, and a vibrant campus life, we prepare
                students for successful careers and meaningful contributions to society. Our four departments
                offer diverse programs designed to meet the evolving needs of the modern world.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </PublicLayout>
  );
};

export default HomePage;
