import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { studentApi, classApi } from '@/services/api';
import { useCrud } from '@/hooks/useCrud';
import { Class } from '@/types';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const AdminStudents = () => {
  const { items: students, loading, create, update, remove } = useCrud(studentApi);
  const [classes, setClasses] = useState<Class[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', rollNumber: '', email: '', classId: '' });

  useEffect(() => { classApi.getAll().then(setClasses); }, []);

  const openCreate = () => { setEditing(null); setForm({ name: '', rollNumber: '', email: '', classId: '' }); setDialogOpen(true); };
  const openEdit = (s: any) => { setEditing(s._id); setForm({ name: s.name, rollNumber: s.rollNumber, email: s.email, classId: s.classId }); setDialogOpen(true); };

  const handleSubmit = async () => {
    if (!form.name.trim() || !form.rollNumber.trim() || !form.email.trim() || !form.classId) return;
    try {
      if (editing) await update(editing, form);
      else await create(form);
      setDialogOpen(false);
    } catch {}
  };

  if (loading) return <DashboardLayout><Skeleton className="h-64 w-full rounded-lg" /></DashboardLayout>;

  return (
    <DashboardLayout>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Students</CardTitle>
          <Button onClick={openCreate} size="sm" className="gradient-primary text-primary-foreground border-0 gap-1">
            <Plus className="h-4 w-4" /> Add
          </Button>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Roll No.</TableHead>
                <TableHead className="hidden md:table-cell">Email</TableHead>
                <TableHead className="hidden md:table-cell">Class</TableHead>
                <TableHead className="w-24">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map(s => (
                <TableRow key={s._id}>
                  <TableCell className="font-medium">{s.name}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{s.rollNumber}</TableCell>
                  <TableCell className="hidden md:table-cell text-sm text-muted-foreground">{s.email}</TableCell>
                  <TableCell className="hidden md:table-cell text-sm text-muted-foreground">{s.className}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" onClick={() => openEdit(s)}><Pencil className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="icon" onClick={() => remove(s._id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>{editing ? 'Edit' : 'Add'} Student</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <Input placeholder="Student name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} maxLength={100} />
            <Input placeholder="Roll number" value={form.rollNumber} onChange={e => setForm(f => ({ ...f, rollNumber: e.target.value }))} maxLength={20} />
            <Input type="email" placeholder="Email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} maxLength={255} />
            <Select value={form.classId} onValueChange={v => setForm(f => ({ ...f, classId: v }))}>
              <SelectTrigger><SelectValue placeholder="Select class" /></SelectTrigger>
              <SelectContent>{classes.map(c => <SelectItem key={c._id} value={c._id}>{c.name}</SelectItem>)}</SelectContent>
            </Select>
            <Button onClick={handleSubmit} className="w-full gradient-primary text-primary-foreground border-0">{editing ? 'Update' : 'Create'}</Button>
          </div>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default AdminStudents;
