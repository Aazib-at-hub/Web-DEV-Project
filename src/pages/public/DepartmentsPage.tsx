import { useEffect, useState } from 'react';
import { PublicLayout } from '@/components/layouts/PublicLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { departmentApi, classApi, studentApi } from '@/services/api';
import { Department, Class, Student } from '@/types';
import { Building2, Users, BookOpen, ChevronDown, ChevronUp } from 'lucide-react';
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
        <div className="container mx-auto px-4 py-12 space-y-4">
          {[1, 2, 3].map(i => <Skeleton key={i} className="h-32 w-full rounded-lg" />)}
        </div>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-2">Our Departments</h1>
          <p className="text-muted-foreground">Explore our academic departments and their classes</p>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {departments.map(dept => {
            const deptClasses = classes.filter(c => c.departmentId === dept._id);
            const isExpanded = expandedDept === dept._id;

            return (
              <Card key={dept._id} className="overflow-hidden">
                <button
                  onClick={() => setExpandedDept(isExpanded ? null : dept._id)}
                  className="w-full text-left"
                >
                  <CardHeader className="flex flex-row items-center gap-4 pb-2">
                    <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center flex-shrink-0">
                      <Building2 className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg">{dept.name}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">{dept.description}</p>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <BookOpen className="h-4 w-4" /> {deptClasses.length} classes
                      {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </div>
                  </CardHeader>
                </button>

                {isExpanded && (
                  <CardContent className="pt-0 space-y-3 animate-fade-in">
                    {deptClasses.map(cls => {
                      const classStudents = students.filter(s => s.classId === cls._id);
                      const classExpanded = expandedClass === cls._id;

                      return (
                        <div key={cls._id} className="border border-border rounded-lg">
                          <button
                            onClick={() => setExpandedClass(classExpanded ? null : cls._id)}
                            className="w-full flex items-center justify-between p-3 text-left hover:bg-muted/50 rounded-lg"
                          >
                            <div className="flex items-center gap-2">
                              <BookOpen className="h-4 w-4 text-primary" />
                              <span className="font-medium text-sm">{cls.name}</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <Users className="h-3 w-3" /> {classStudents.length}/10
                              {classExpanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                            </div>
                          </button>
                          {classExpanded && (
                            <div className="px-3 pb-3 animate-fade-in">
                              <div className="bg-muted/50 rounded-lg p-3">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                  {classStudents.map(s => (
                                    <div key={s._id} className="flex items-center gap-2 text-sm py-1">
                                      <div className="w-6 h-6 rounded-full gradient-primary flex items-center justify-center text-[10px] text-primary-foreground font-medium">
                                        {s.name.charAt(0)}
                                      </div>
                                      <span className="text-foreground">{s.name}</span>
                                      <span className="text-muted-foreground text-xs ml-auto">{s.rollNumber}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
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
