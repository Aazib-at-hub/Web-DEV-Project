import { useEffect, useState } from 'react';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { attendanceApi, classApi } from '@/services/api';
import { Attendance, Class } from '@/types';
import { Skeleton } from '@/components/ui/skeleton';

const statusColor = (s: string) => s === 'present' ? 'bg-success/10 text-success' : s === 'late' ? 'bg-warning/10 text-warning' : 'bg-destructive/10 text-destructive';

const AdminAttendance = () => {
  const [classes, setClasses] = useState<Class[]>([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [records, setRecords] = useState<Attendance[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { classApi.getAll().then(setClasses).finally(() => setLoading(false)); }, []);

  useEffect(() => {
    if (selectedClass) {
      setLoading(true);
      attendanceApi.getByClass(selectedClass).then(setRecords).finally(() => setLoading(false));
    }
  }, [selectedClass]);

  return (
    <DashboardLayout>
      <Card>
        <CardHeader>
          <CardTitle>Attendance Records</CardTitle>
          <Select value={selectedClass} onValueChange={setSelectedClass}>
            <SelectTrigger className="w-64 mt-2"><SelectValue placeholder="Select a class" /></SelectTrigger>
            <SelectContent>{classes.map(c => <SelectItem key={c._id} value={c._id}>{c.name}</SelectItem>)}</SelectContent>
          </Select>
        </CardHeader>
        <CardContent>
          {loading ? <Skeleton className="h-32 w-full" /> : !selectedClass ? (
            <p className="text-sm text-muted-foreground">Select a class to view attendance</p>
          ) : records.length === 0 ? (
            <p className="text-sm text-muted-foreground">No attendance records found</p>
          ) : (
            <div className="space-y-4">
              {records.sort((a, b) => b.date.localeCompare(a.date)).map(att => (
                <div key={att._id} className="border border-border rounded-lg p-4">
                  <h4 className="font-medium text-sm mb-2">{new Date(att.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</h4>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Student</TableHead>
                        <TableHead>Roll No.</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {att.records.map(r => (
                        <TableRow key={r.studentId}>
                          <TableCell className="text-sm">{r.studentName}</TableCell>
                          <TableCell className="text-sm text-muted-foreground">{r.rollNumber}</TableCell>
                          <TableCell><Badge variant="secondary" className={statusColor(r.status)}>{r.status}</Badge></TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default AdminAttendance;
