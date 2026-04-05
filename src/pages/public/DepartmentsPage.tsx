import { useEffect, useState } from 'react';
import { PublicLayout } from '@/components/layouts/PublicLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { departmentApi, classApi, studentApi } from '@/services/api';
import { Department, Class, Student } from '@/types';
import { Building2, Users, BookOpen, ChevronDown, ChevronUp, GraduationCap } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const DepartmentsPage = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [classes, setClasses] = useState<Class[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedDept, setExpandedDept] = useState<string | null>(null);
  const [expandedClass, setExpandedClass] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([departmentApi.getAll(), classApi.getAll(), studentApi.getAll()])
      .then(([d, c, s]) => { setDepartments(d); setClasses(c); setStudents(s); })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <PublicLayout>
        <div className="container mx-auto px-6 py-16 space-y-6">
          {[1, 2, 3].map(i => <Skeleton key={i} className="h-40 w-full rounded-[2.5rem]" />)}
        </div>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>
      <div className="container mx-auto px-6 py-20 bg-[radial-gradient(circle_at_top_right,hsl(var(--accent)/0.05),transparent)]">
        <div className="max-w-5xl mx-auto text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 text-accent text-xs font-black uppercase tracking-widest mb-6">
            <Building2 className="h-4 w-4" /> Academic Structure
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-black text-foreground mb-4 tracking-tight uppercase">Organizational Hierarchy</h1>
          <p className="text-lg text-muted-foreground font-medium opacity-80 max-w-2xl mx-auto italic">Explore our world-class departments and their meticulously structured curricula.</p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {departments.map((dept, idx) => {
            const deptClasses = classes.filter(c => c.departmentId === dept._id);
            const isExpanded = expandedDept === dept._id;

            return (
              <Card key={dept._id} className={`group overflow-hidden rounded-[2.5rem] border-0 shadow-premium transition-all duration-500 ${isExpanded ? 'ring-2 ring-accent shadow-2xl' : 'hover:scale-[1.01] hover:shadow-xl'}`}>
                <button
                  onClick={() => setExpandedDept(isExpanded ? null : dept._id)}
                  className="w-full text-left"
                >
                  <CardHeader className="flex flex-row items-center gap-6 p-8">
                    <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                      <Building2 className="h-7 w-7 text-primary-foreground" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-2xl font-black text-foreground tracking-tight">{dept.name}</CardTitle>
                      <p className="text-sm text-muted-foreground font-medium mt-2 leading-relaxed line-clamp-2">{dept.description}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2 text-xs font-bold text-muted-foreground">
                      <div className="flex items-center gap-2 bg-muted/50 px-3 py-1.5 rounded-full ring-1 ring-border">
                         <BookOpen className="h-4 w-4 text-accent" /> {deptClasses.length} Units
                      </div>
                      {isExpanded ? <ChevronUp className="h-5 w-5 text-accent" /> : <ChevronDown className="h-5 w-5" />}
                    </div>
                  </CardHeader>
                </button>

                {isExpanded && (
                  <CardContent className="px-8 pb-8 space-y-4 animate-fade-in bg-gradient-to-down from-transparent to-muted/10">
                    <div className="h-px bg-border mb-4 opacity-50" />
                    {deptClasses.map(cls => {
                      const classStudents = students.filter(s => s.classId === cls._id);
                      const classExpanded = expandedClass === cls._id;

                      return (
                        <div key={cls._id} className={`border border-border/50 rounded-[2rem] overflow-hidden transition-all duration-300 ${classExpanded ? 'bg-card shadow-lg ring-1 ring-accent/20' : 'bg-muted/20 hover:bg-muted/40'}`}>
                          <button
                            onClick={(e) => { e.stopPropagation(); setExpandedClass(classExpanded ? null : cls._id); }}
                            className="w-full flex items-center justify-between p-5 text-left transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${classExpanded ? 'gradient-accent shadow-md' : 'bg-muted shadow-sm'}`}>
                                <BookOpen className={`h-4 w-4 ${classExpanded ? 'text-accent-foreground' : 'text-primary'}`} />
                              </div>
                              <span className="font-bold text-md text-foreground">{cls.name}</span>
                            </div>
                            <div className="flex items-center gap-3 text-xs font-black">
                              <span className={`px-3 py-1.5 rounded-full ${classStudents.length >= 10 ? 'bg-red-500/10 text-red-500' : 'bg-success/10 text-success'}`}>
                                <Users className="inline h-3 w-3 mr-1" /> {classStudents.length} / 10 Active
                              </span>
                              {classExpanded ? <ChevronUp className="h-4 w-4 opacity-50" /> : <ChevronDown className="h-4 w-4 opacity-50" />}
                            </div>
                          </button>
                          {classExpanded && (
                            <div className="px-6 pb-6 animate-fade-in">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 bg-muted/30 rounded-[1.5rem] border border-border/50">
                                  {classStudents.map(s => (
                                    <div key={s._id} className="flex items-center gap-3 text-sm p-3 rounded-2xl bg-card border border-border/20 shadow-sm hover:ring-1 hover:ring-accent/30 transition-all">
                                      <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-[10px] text-primary-foreground font-black shadow-inner">
                                        {s.name.charAt(0)}
                                      </div>
                                      <div className="flex flex-col">
                                        <span className="text-foreground font-bold leading-none">{s.name}</span>
                                        <span className="text-[10px] text-muted-foreground font-black uppercase mt-1 tracking-widest">{s.rollNumber}</span>
                                      </div>
                                    </div>
                                  ))}
                                  {classStudents.length === 0 && <p className="col-span-2 text-center text-xs text-muted-foreground italic py-4">No scholars enrolled in this unit yet.</p>}
                                </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                    {deptClasses.length === 0 && <p className="text-center text-sm text-muted-foreground italic py-8">No active classes found for this department.</p>}
                  </CardContent>
                )}
              </Card>
            );
          })}
        </div>
      </div>
    </PublicLayout>
  );
};

export default DepartmentsPage;
