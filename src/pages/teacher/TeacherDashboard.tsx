import { useEffect, useState } from 'react';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { classApi, studentApi } from '@/services/api';
import { Class, Student } from '@/types';
import { BookOpen, Users } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const TeacherDashboard = () => {
  const { user } = useAuth();
  const [classes, setClasses] = useState<Class[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    Promise.all([classApi.getByTeacher(user._id), studentApi.getAll()])
      .then(([c, s]) => { setClasses(c); setStudents(s); })
      .finally(() => setLoading(false));
  }, [user]);

  if (loading) return <DashboardLayout><div className="grid gap-4 md:grid-cols-2">{[1, 2].map(i => <Skeleton key={i} className="h-48 rounded-lg" />)}</div></DashboardLayout>;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-5 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center"><BookOpen className="h-5 w-5 text-primary" /></div>
              <div>
                <p className="text-2xl font-heading font-bold text-foreground">{classes.length}</p>
                <p className="text-xs text-muted-foreground">My Classes</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-5 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center"><Users className="h-5 w-5 text-accent" /></div>
              <div>
                <p className="text-2xl font-heading font-bold text-foreground">
                  {classes.reduce((sum, c) => sum + students.filter(s => s.classId === c._id).length, 0)}
                </p>
                <p className="text-xs text-muted-foreground">Total Students</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {classes.map(cls => {
            const classStudents = students.filter(s => s.classId === cls._id);
            return (
              <Card key={cls._id}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-primary" />
                    {cls.name}
                  </CardTitle>
                  <p className="text-xs text-muted-foreground">{cls.departmentName} · {classStudents.length} students</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1">
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
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TeacherDashboard;
