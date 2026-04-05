import { useEffect, useState } from 'react';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { classApi, studentApi, attendanceApi } from '@/services/api';
import { Class, Student, AttendanceRecord } from '@/types';
import { Check, X, Clock, CheckCheck } from 'lucide-react';
import { toast } from 'sonner';
import { Skeleton } from '@/components/ui/skeleton';

const statusConfig = {
  present: { color: 'bg-success/10 text-success border-success/20', icon: Check },
  absent: { color: 'bg-destructive/10 text-destructive border-destructive/20', icon: X },
  late: { color: 'bg-warning/10 text-warning border-warning/20', icon: Clock },
};

const TeacherAttendance = () => {
  const { user } = useAuth();
  const [classes, setClasses] = useState<Class[]>([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [students, setStudents] = useState<Student[]>([]);
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user) return;
    classApi.getByTeacher(user._id).then(setClasses).finally(() => setLoading(false));
  }, [user]);

  useEffect(() => {
    if (!selectedClass) return;
    studentApi.getByClass(selectedClass).then(s => {
      setStudents(s);
      // Check if attendance exists for this date
      attendanceApi.getByClass(selectedClass).then(atts => {
        const existing = atts.find(a => a.date === date);
        if (existing) {
          setRecords(existing.records);
        } else {
          setRecords(s.map(st => ({ studentId: st._id, status: 'present' as const })));
        }
      });
    });
  }, [selectedClass, date]);

  const toggleStatus = (studentId: string) => {
    setRecords(prev => prev.map(r => {
      if (r.studentId !== studentId) return r;
      const order: ('present' | 'absent' | 'late')[] = ['present', 'absent', 'late'];
      const next = order[(order.indexOf(r.status) + 1) % 3];
      return { ...r, status: next };
    }));
  };

  const markAllPresent = () => {
    setRecords(prev => prev.map(r => ({ ...r, status: 'present' as const })));
  };

  const saveAttendance = async () => {
    if (!selectedClass || !date) return;
    setSaving(true);
    try {
      await attendanceApi.save({ classId: selectedClass, date, records });
      toast.success('Attendance saved!');
    } catch {
      toast.error('Failed to save attendance');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <DashboardLayout><Skeleton className="h-64 w-full rounded-lg" /></DashboardLayout>;

  return (
    <DashboardLayout>
      <Card>
        <CardHeader>
          <CardTitle>Take Attendance</CardTitle>
          <div className="flex flex-wrap gap-3 mt-2">
            <Select value={selectedClass} onValueChange={setSelectedClass}>
              <SelectTrigger className="w-64"><SelectValue placeholder="Select class" /></SelectTrigger>
              <SelectContent>{classes.map(c => <SelectItem key={c._id} value={c._id}>{c.name}</SelectItem>)}</SelectContent>
            </Select>
            <input
              type="date"
              value={date}
              onChange={e => setDate(e.target.value)}
              className="px-3 py-2 border border-input rounded-lg text-sm bg-card"
            />
          </div>
        </CardHeader>
        <CardContent>
          {!selectedClass ? (
            <p className="text-sm text-muted-foreground">Select a class to take attendance</p>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <p className="text-sm text-muted-foreground">{students.length} students</p>
                <Button variant="outline" size="sm" onClick={markAllPresent} className="gap-1">
                  <CheckCheck className="h-4 w-4" /> Mark All Present
                </Button>
              </div>

              <div className="space-y-2">
                {students.map(s => {
                  const record = records.find(r => r.studentId === s._id);
                  const status = record?.status || 'present';
                  const config = statusConfig[status];
                  const Icon = config.icon;

                  return (
                    <div key={s._id} className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-xs text-primary-foreground font-medium">
                          {s.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">{s.name}</p>
                          <p className="text-xs text-muted-foreground">{s.rollNumber}</p>
                        </div>
                      </div>
                      <button onClick={() => toggleStatus(s._id)}>
                        <Badge variant="outline" className={`${config.color} gap-1 cursor-pointer`}>
                          <Icon className="h-3 w-3" />
                          {status}
                        </Badge>
                      </button>
                    </div>
                  );
                })}
              </div>

              <Button onClick={saveAttendance} disabled={saving} className="w-full gradient-primary text-primary-foreground border-0">
                {saving ? 'Saving...' : 'Save Attendance'}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default TeacherAttendance;
