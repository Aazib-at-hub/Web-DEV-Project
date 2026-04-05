import { useEffect, useState } from 'react';
import { PublicLayout } from '@/components/layouts/PublicLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { courseApi } from '@/services/api';
import { Course } from '@/types';
import { BookOpen, GraduationCap, Sparkles, Target } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const CoursesPage = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    courseApi.getAll().then(setCourses).finally(() => setLoading(false));
  }, []);

  return (
    <PublicLayout>
      <div className="container mx-auto px-6 py-20 relative">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] opacity-20 pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center mb-16 animate-fade-in">
           <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-black uppercase tracking-[0.2em] mb-6">
            <GraduationCap className="h-4 w-4" /> Academic Portfolio
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-black text-foreground mb-4 tracking-tight uppercase italic">Curricular Excellence</h1>
          <p className="text-lg text-muted-foreground font-medium opacity-80 max-w-2xl mx-auto italic">Explore our diverse academic paths designed for professional growth and lifelong learning.</p>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
            {[1, 2, 3, 4, 5, 6].map(i => <Skeleton key={i} className="h-48 rounded-[2.5rem] shadow-sm" />)}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
            {courses.map((course, i) => (
              <Card 
                key={course._id} 
                className="group relative border-0 shadow-premium rounded-[2.5rem] overflow-hidden hover:scale-[1.02] transition-all duration-500 animate-fade-in" 
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="absolute inset-0 gradient-primary opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500" />
                <CardHeader className="p-8 pb-4">
                  <div className="w-12 h-12 rounded-2xl bg-muted group-hover:gradient-accent flex items-center justify-center mb-6 shadow-sm transition-all duration-500 group-hover:shadow-lg group-hover:shadow-accent/20">
                    <BookOpen className="h-6 w-6 text-primary group-hover:text-accent-foreground transition-colors duration-500" />
                  </div>
                  <CardTitle className="text-xl font-black text-foreground tracking-tight leading-tight group-hover:text-primary transition-colors">{course.name}</CardTitle>
                </CardHeader>
                <CardContent className="p-8 pt-2">
                  <p className="text-sm text-muted-foreground font-medium leading-relaxed opacity-80 mb-6">{course.description}</p>
                  <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-accent opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                    <Target className="h-3 w-3" /> Professional Path
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </PublicLayout>
  );
};

export default CoursesPage;
