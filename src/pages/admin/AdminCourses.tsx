import { useState } from 'react';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { courseApi } from '@/services/api';
import { useCrud } from '@/hooks/useCrud';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const AdminCourses = () => {
  const { items: courses, loading, create, update, remove } = useCrud(courseApi);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', description: '' });

  const openCreate = () => { setEditing(null); setForm({ name: '', description: '' }); setDialogOpen(true); };
  const openEdit = (c: any) => { setEditing(c._id); setForm({ name: c.name, description: c.description }); setDialogOpen(true); };

  const handleSubmit = async () => {
    if (!form.name.trim()) return;
    if (editing) await update(editing, form);
    else await create(form);
    setDialogOpen(false);
  };

  if (loading) return <DashboardLayout><Skeleton className="h-64 w-full rounded-lg" /></DashboardLayout>;

  return (
    <DashboardLayout>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Courses</CardTitle>
          <Button onClick={openCreate} size="sm" className="gradient-primary text-primary-foreground border-0 gap-1">
            <Plus className="h-4 w-4" /> Add
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead className="hidden md:table-cell">Description</TableHead>
                <TableHead className="w-24">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {courses.map(c => (
                <TableRow key={c._id}>
                  <TableCell className="font-medium">{c.name}</TableCell>
                  <TableCell className="hidden md:table-cell text-sm text-muted-foreground truncate max-w-xs">{c.description}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" onClick={() => openEdit(c)}><Pencil className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="icon" onClick={() => remove(c._id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
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
          <DialogHeader><DialogTitle>{editing ? 'Edit' : 'Add'} Course</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <Input placeholder="Course name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} maxLength={100} />
            <Textarea placeholder="Description" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} maxLength={500} />
            <Button onClick={handleSubmit} className="w-full gradient-primary text-primary-foreground border-0">{editing ? 'Update' : 'Create'}</Button>
          </div>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default AdminCourses;
