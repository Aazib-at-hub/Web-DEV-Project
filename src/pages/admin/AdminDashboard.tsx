import { useEffect, useState } from 'react';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { statsApi } from '@/services/api';
import { Users, BookOpen, Building2, GraduationCap, ClipboardList, TrendingUp } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const AdminDashboard = () => {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    statsApi.getDashboardStats().then(setStats).finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map(i => <Skeleton key={i} className="h-28 rounded-lg" />)}
        </div>
      </DashboardLayout>
    );
  }

  const cards = [
    { label: 'Total Students', value: stats?.totalStudents, icon: Users, color: 'bg-primary/10 text-primary' },
    { label: 'Total Classes', value: stats?.totalClasses, icon: BookOpen, color: 'bg-accent/10 text-accent' },
    { label: 'Departments', value: stats?.totalDepartments, icon: Building2, color: 'bg-success/10 text-success' },
    { label: 'Courses', value: stats?.totalCourses, icon: GraduationCap, color: 'bg-warning/10 text-warning' },
    { label: 'Attendance Records', value: stats?.totalAttendance, icon: ClipboardList, color: 'bg-destructive/10 text-destructive' },
    { label: 'Attendance %', value: `${stats?.attendancePercentage}%`, icon: TrendingUp, color: 'bg-primary/10 text-primary' },
  ];

  return (
    <DashboardLayout>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map(card => (
          <Card key={card.label} className="hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${card.color}`}>
                  <card.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-2xl font-heading font-bold text-foreground">{card.value}</p>
                  <p className="text-xs text-muted-foreground">{card.label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
