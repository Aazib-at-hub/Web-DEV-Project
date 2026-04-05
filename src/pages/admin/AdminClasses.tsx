import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { classApi, departmentApi, getTeachers } from '@/services/api';
import { useCrud } from '@/hooks/useCrud';
import { Department, User } from '@/types';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const AdminClasses = () => {
  const { items: classes, loading, create, update, remove } = useCrud(classApi);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [teachers] = useState<Omit<User, 'token'>[]>(getTeachers());
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', departmentId: '', teacherId: '' });

  useEffect(() => { departmentApi.getAll().then(setDepartments); }, []);

  const openCreate = () => { setEditing(null); setForm({ name: '', departmentId: '', teacherId: '' }); setDialogOpen(true); };
  const openEdit = (cls: any) => { setEditing(cls._id); setForm({ name: cls.name, departmentId: cls.departmentId, teacherId: cls.teacherId }); setDialogOpen(true); };

  const handleSubmit = async () => {
    if (!form.name.trim() || !form.departmentId || !form.teacherId) return;
    if (editing) await update(editing, form);
    else await create(form);
    setDialogOpen(false);
  };

  if (loading) return <DashboardLayout><Skeleton className="h-64 w-full rounded-lg" /></DashboardLayout>;

  return (
    <DashboardLayout>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Classes</CardTitle>
          <Button onClick={openCreate} size="sm" className="gradient-primary text-primary-foreground border-0 gap-1">
            <Plus className="h-4 w-4" /> Add
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead className="hidden md:table-cell">Department</TableHead>
                <TableHead className="hidden md:table-cell">Teacher</TableHead>
                <TableHead className="w-24">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {classes.map(cls => (
                <TableRow key={cls._id}>
                  <TableCell className="font-medium">{cls.name}</TableCell>
                  <TableCell className="hidden md:table-cell text-sm text-muted-foreground">{cls.departmentName}</TableCell>
                  <TableCell className="hidden md:table-cell text-sm text-muted-foreground">{cls.teacherName}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" onClick={() => openEdit(cls)}><Pencil className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="icon" onClick={() => remove(cls._id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
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
          <DialogHeader><DialogTitle>{editing ? 'Edit' : 'Add'} Class</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <Input placeholder="Class name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} maxLength={100} />
            <Select value={form.departmentId} onValueChange={v => setForm(f => ({ ...f, departmentId: v }))}>
              <SelectTrigger><SelectValue placeholder="Select department" /></SelectTrigger>
              <SelectContent>{departments.map(d => <SelectItem key={d._id} value={d._id}>{d.name}</SelectItem>)}</SelectContent>
            </Select>
            <Select value={form.teacherId} onValueChange={v => setForm(f => ({ ...f, teacherId: v }))}>
              <SelectTrigger><SelectValue placeholder="Select teacher" /></SelectTrigger>
              <SelectContent>{teachers.map(t => <SelectItem key={t._id} value={t._id}>{t.name}</SelectItem>)}</SelectContent>
            </Select>
            <Button onClick={handleSubmit} className="w-full gradient-primary text-primary-foreground border-0">{editing ? 'Update' : 'Create'}</Button>
          </div>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default AdminClasses;
